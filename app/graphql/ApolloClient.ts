import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
    uri: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clg5f02p205gj01tfcmg0dyo4/master",
    cache: new InMemoryCache(),
});
