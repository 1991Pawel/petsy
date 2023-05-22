import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { gql } from "@apollo/client";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { apolloClient } from "@/app/graphql/ApolloClient";

const GET_ACCOUNT_BY_EMAIL = gql`
    query GetAccountByEmail($email: String!) {
        account(where: { email: $email }, stage: DRAFT) {
            id
            email
            password
        }
    }
`;

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    return null;
                }

                const userByEmail = await apolloClient.query({
                    query: GET_ACCOUNT_BY_EMAIL,
                    variables: {
                        email: credentials.email,
                    },
                });

                if (!userByEmail.data.account?.password) {
                    return null;
                }

                const arePasswordEqual = bcrypt.compare(
                    credentials.password,
                    userByEmail.data.account.password
                );

                if (!arePasswordEqual) {
                    return null;
                }

                return userByEmail.data.account;
            },
        }),
    ],
    pages: {
        signIn: "/",
    },
});

export { handler as GET, handler as POST };
