import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://tarantino-apollo-music-share.herokuapp.com/v1/graphql',
  cache: new InMemoryCache()
});

export default client;
