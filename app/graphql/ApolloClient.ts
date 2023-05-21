import { ApolloClient, InMemoryCache } from "@apollo/client";

console.log("process", process.env);
export const apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
    cache: new InMemoryCache(),
});
