export interface TaskModel {
  id: number;
  group: string;
  task: string;
  dependencyIds: number[];
  completedAt: string | null; 
}
