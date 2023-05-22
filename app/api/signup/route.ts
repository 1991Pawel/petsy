import * as bcrypt from "bcrypt";
import { apolloClient } from "../../graphql/ApolloClient";
import { gql } from "@apollo/client";

const CREATE_ACCOUNT = gql`
    mutation CreateAccount($email: String!, $password: String!) {
        createAccount(data: { email: $email, password: $password }) {
            id
        }
    }
`;

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password } = body.data;
    const passwordHasz = await bcrypt.hash(password, 12);
    console.log(email, passwordHasz);

    try {
        const user = await apolloClient.mutate({
            variables: {
                email: email,
                password: passwordHasz,
            },
            mutation: CREATE_ACCOUNT,
        });
    } catch (error) {
        throw new Error("error");
    }

    // console.log(user);
    return new Response("ok");
}
