import { TaskModel } from "../../models/TaskModel";
import { TasksData } from "./tasksData";
import { DataSource } from "apollo-datasource";
import { ToggleTaskInput } from "../../schemaTypes";

/*
  - I M P O R T A N T:

    - NOTES: We're explicitly told in the prompt that we should not introduce
      new dependancies. I have implemented a postGresSql DB locally; however,
      due to not being able to install 'pg' or 'knex' I will treat the provided
      mock data as if it was the sql server data.
      I will provide two versions of this code: 
        - One manipulating the mock data
        - One commented out code on how to handle if we had access to SQL libraries
          that would allow me to connect to a SQL DB like PostGres

    - Additional NOTES: 
      - Under normal working conditions I would not leave commented out code
        say for a PR. 
      - I am only doing this to showcase the SQL calls needed  
*/

export class TasksAPI extends DataSource {
  taskData: TasksData;

  constructor() {
    super();
    this.taskData = new TasksData();
  }

  getTasks(): Promise<TaskModel[]> {
    return this.taskData.getTasks();
  }

  toggleTask(_toggleTaskInput: ToggleTaskInput): Promise<boolean> {
    const { taskId } = _toggleTaskInput;

    const task = this.taskData.tasks.find((t) => t.id === taskId);
    if (!task) {
      return Promise.resolve(false);
    }

    task.completedAt = task.completedAt ? null : new Date().toISOString();

    this.taskData.tasks.forEach((t) => {
      if (t.dependencyIds.includes(taskId)) {
        t.dependencyIds = t.dependencyIds.filter((id) => id !== taskId);
      }
    });
    return Promise.resolve(true);
  }

  /*
  getTasksSQL = async () : Promise<TaskModel[]> => {
    const res = await pool.query("SELECT * FROM tasks");
    return res.rows;
  };

  toggleTaskSQL(_toggleTaskInput: ToggleTaskInput): Promise<TaskModel[]> {
    const res = await pool.query(
      `UPDATE tasks
     SET completedAt = CASE
       WHEN completedAt IS NULL THEN NOW()
       ELSE NULL
     END
     WHERE id = $1
     RETURNING *`,
      [_toggleTaskInput.taskId]
    );
    const updatedTask = res.rows[0] as TaskModel;

    const dependencyRes = await pool.query(
      `SELECT * FROM tasks WHERE $1 = ANY(dependencyIds)`,
      [_toggleTaskInput.taskId]
    );

    const dependentTasks = dependencyRes.rows as TaskModel[];
    const updatedTasks: TaskModel[] = [updatedTask];

    for (const task of dependentTasks) {
      const newDependencyIds = task.dependencyIds.filter(
        (id) => id !== _toggleTaskInput.taskId
      );

      const updatedDependencyRes = await pool.query(
        `UPDATE tasks
       SET dependencyIds = $1
       WHERE id = $2
       RETURNING *`,
        [newDependencyIds, task.id]
      );

      const updatedDependencyTask = updatedDependencyRes.rows[0] as TaskModel;
      updatedTasks.push(updatedDependencyTask);
    }

    const allTasksRes = this.getTasksSQL();
    return Promise.resolve(allTasksRes.rows as TaskModel[]);
  }
*/
}
