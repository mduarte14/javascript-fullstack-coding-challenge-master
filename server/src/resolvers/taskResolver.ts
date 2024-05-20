import { MutationResolvers, QueryResolvers, Resolvers } from '../schemaTypes'

export const taskResolver: Resolvers["Task"] = {}

export const tasksQueryResolvers: QueryResolvers = {
  tasks: async (_parent, _args, context) => context.dataSources.tasksAPI.getTasks()
}

export const tasksMutationResolvers: MutationResolvers = {
  toggleTask: async (_parent, { toggleTaskInput }, context) =>
    context.dataSources.tasksAPI.toggleTask(toggleTaskInput)
}
