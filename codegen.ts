import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    overwrite: true,
    schema: "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clg5f02p205gj01tfcmg0dyo4/master",
    documents: "./app/graphql/*.graphql",
    generates: {
        "./app/generated/": {
            preset: "client",
            plugins: [],
        },
        "./app/graphql.schema.json": {
            plugins: ["introspection"],
        },
    },
};

export default config;
