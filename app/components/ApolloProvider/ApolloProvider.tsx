"use client";
import { ApolloProvider as Provider } from "@apollo/client";
import { apolloClient } from "../../graphql/ApolloClient";
import { ReactNode } from "react";

interface ApolloProviderProps {
    children: React.ReactNode;
}

export const ApolloProvider = ({ children }: ApolloProviderProps) => {
    return <Provider client={apolloClient}>{children}</Provider>;
};
