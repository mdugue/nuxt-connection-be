import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  documents: ["**/*.vue"],
  generates: {
    "./gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
        avoidOptionals: true,
        nonOptionalTypename: true,
      },
    },
  },
};
export default config;
