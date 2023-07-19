import { createUserMutation, getUserQuery } from "@/graphql";
import { GraphQLClient } from "graphql-request";
//npx grafbase@0.24 dev
const isProduction = process.env.NODE_ENV === 'production'; // Verifica se o ambiente é produção.
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql' // Define a URL da API do Grafbase com base no ambiente de produção ou desenvolvimento
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'anything' // Define a chave de API do Grafbase com base no ambiente de produção ou desenvolvimento
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000' // Define o URL do servidor.

const client = new GraphQLClient(apiUrl) // Cria uma nova instância do GraphQLClient.

// Uma função para fazer uma solicitação GraphQL.
const makeGraphQLRequest = async (query: string, variables = {}) => {
    try {
        return await client.request(query, variables)
    } catch (error) {
        throw error;
    }
}

// Função para obter um usuário com base no email
export const getUser = (email:string) => {
    client.setHeader('x-api-key',apiKey)
    return makeGraphQLRequest(getUserQuery, {email})
}


// Função para criar um novo usuário

export const createUser = (name: string, email: string, avatarUrl: string) => {
    // Define as variáveis para a mutação de criação de usuário
    client.setHeader("x-api-key", apiKey);
  
    const variables = {
      input: {
        name: name,
        email: email,
        avatarUrl: avatarUrl
      },
    };
    
    return makeGraphQLRequest(createUserMutation, variables);
  };