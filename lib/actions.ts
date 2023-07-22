import { GraphQLClient } from "graphql-request";

import {
  createProjectMutation,
  createUserMutation,
  getUserQuery,
} from "@/graphql";
import { ProjectForm } from "@/common.types";
//npx grafbase@0.24 dev
const isProduction = process.env.NODE_ENV === "production"; // Verifica se o ambiente é produção.
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql"; // Define a URL da API do Grafbase com base no ambiente de produção ou desenvolvimento
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein"; // Define a chave de API do Grafbase com base no ambiente de produção ou desenvolvimento
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000"; // Define o URL do servidor.

const client = new GraphQLClient(apiUrl); // Cria uma nova instância do GraphQLClient.

//Função de fetch do token de segurança
export const fetchToken = async () => {
  try {
    //Maneira de pegar o token usando Next Auth
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();

  } catch (err) {
    throw err;
  }
};

// Uma função para fazer uma solicitação GraphQL.
const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    throw error;
  }
};

// Função para obter um usuário com base no email
export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

// Função para criar um novo usuário

export const createUser = (name: string, email: string, avatarUrl: string) => {
  // Define as variáveis para a mutação de criação de usuário
  client.setHeader("x-api-key", apiKey);

  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl,
    },
  };

  return makeGraphQLRequest(createUserMutation, variables);
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  //Função que chama a api da cloudinary
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    //verificação de segurança se é mesmo o usuário a publicar
    client.setHeader("Authorization", `Bearer ${token}`);

    //Cria novas variáveis com a imagem publicada no cloudinary
    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};
