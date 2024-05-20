import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client"

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
})

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([link]),
  credentials: "include",
})
