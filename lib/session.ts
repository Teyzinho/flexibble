import { getServerSession } from "next-auth";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

import jsonwebtoken from "jsonwebtoken";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./actions";

// Configuração das opções do NextAuth
export const authOptions: NextAuthOptions = {
  // Provedores de autenticação
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Especifica as configurações para JSON Web Tokens (JWTs).
  jwt: {
    // Função para codificar (criar) o token
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "grafbase",
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );

      return encodedToken;
    },
    // Função para decodificar (verificar) o token
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  // Configurações de tema (opcional)
  theme: {
    colorScheme: "light",
    logo: "/logo.png",
  },
  // Callbacks (funções de retorno) para manipular a sessão e o login
  callbacks: {
    // Callback de sessão (após o usuário fazer login)
    async session({ session }) {
      const email = session?.user?.email as string;

      try {
        // Obtém os dados do usuário a partir do email (usando a função getUser)
        const data = (await getUser(email)) as { user?: UserProfile };

        // Cria uma nova sessão com os dados adicionais do usuário
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };

        return newSession;
      } catch (error) {
        console.log("Error pegando data de Usuário", error);
        return session;
      }
    },
    // Callback de login (após o usuário fazer login)
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        // Verifica se o usuário já existe no banco de dados (usando a função getUser)
        const userExists = (await getUser(user?.email as string)) as {
          user?: UserProfile;
        };

        // Se o usuário não existir, cria um novo usuário no banco de dados (usando a função createUser)
        if (!userExists.user) {
          await createUser(
            user.name as string,
            user.email as string,
            user.image as string
          );
        }

        return true; // Retorna verdadeiro para indicar que o login foi bem-sucedido
      } catch (error) {
        console.log("callbacks login error :", error);
        return false; // Retorna falso para indicar que o login falhou
      }
    },
  },
};

// Função assíncrona para obter o usuário atualmente autenticado
export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
}
