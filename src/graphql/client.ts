import {
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink
} from "@apollo/client";
import {getMainDefinition} from '@apollo/client/utilities';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';

const httpsLink = new HttpLink({
  uri: 'https://tarantino-apollo-music-share.herokuapp.com/v1/graphql',
});

const wssLink = new GraphQLWsLink(createClient({
  url: 'wss://tarantino-apollo-music-share.herokuapp.com/v1/graphql',
}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wssLink,
  httpsLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

export default client;
