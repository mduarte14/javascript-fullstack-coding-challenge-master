import { ApolloServer } from "apollo-server-express"
import { importSchema } from "graphql-import";
import { Resolvers } from './schemaTypes'
import { GQLContext } from './GQLContext'
import { TasksAPI } from './dataSources/tasks/tasksAPI'
import { taskResolver, tasksQueryResolvers, tasksMutationResolvers } from './resolvers/taskResolver'

import cors from 'cors'
import express from 'express'

const typeDefs = importSchema("./src/schema.graphql")

const resolvers: Resolvers = {
  Task: taskResolver,
  Query: {
    ...tasksQueryResolvers
  },
  Mutation: {
    ...tasksMutationResolvers
  }
}

const app = express()

app.use(cors({credentials: true}))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: (): GQLContext["dataSources"] => ({
    tasksAPI: new TasksAPI(),
  }),
  introspection: true,
})

server.start().then( _response => {
  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 GraphQL Server ready at http://localhost:4000${server.graphqlPath}`
    )
  )
})
