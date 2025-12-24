import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:42069/graphql", //  ponder server
  }),
  cache: new InMemoryCache(),
});
