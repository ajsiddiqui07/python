
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

// Countries GraphQL API
export const restaurantClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://countries.trevorblades.com/",
  }),
  cache: new InMemoryCache(),
});

// Movie GraphQL API
export const movieClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://movies.neo4j-graphql.com",
  }),
  cache: new InMemoryCache(),
});

// Product GraphQL API
export const productClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.testingapis.com/graphql",
  }),
  cache: new InMemoryCache(),
});
