import { TasksAPI } from './dataSources/tasks/tasksAPI'

export interface GQLContext {
  dataSources: {
    tasksAPI: TasksAPI
  }
}
