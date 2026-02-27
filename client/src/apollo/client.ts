import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_PONDER_URL, //  ponder server
  }),
  cache: new InMemoryCache({
    typePolicies: {
      position: {
        keyFields: ["id", "asset"],
      },
    },
  }),
});
