import { cacheExchange, Client, fetchExchange } from "@urql/vue";

export default defineNuxtPlugin((nuxtApp) => {
  const client = new Client({
    url: "./api/graphql",
    exchanges: [cacheExchange, fetchExchange],
  });

  nuxtApp.provide("urql", client);
  nuxtApp.vueApp.provide("$urql", ref(client));
});
