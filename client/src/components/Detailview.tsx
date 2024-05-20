import { gql, useMutation } from "@apollo/client";
import { Group, Task } from "../scenes/home";

const TOGGLE_TASK_COMPLETION = gql`
  mutation Mutation($toggleTaskInput: ToggleTaskInput!) {
    toggleTask(toggleTaskInput: $toggleTaskInput)
  }
`;

interface DetailviewProps {
  group: Group;
  onClose: () => void;
  refetchTasks: () => void;
}

function Detailview({ group, onClose, refetchTasks }: DetailviewProps) {
  const [toggleTaskCompletionMutation] = useMutation(TOGGLE_TASK_COMPLETION);

  const getIcon = (completed: boolean, unlocked: boolean) => {
    if (!unlocked) return <img src="../src/assets/img/locked.svg" />;
    else if (unlocked && completed) {
      return <img src="../src/assets/img/completed.svg" />;
    } else {
      return <img src="../src/assets/img/incomplete.svg" />;
    }
  };

  const isTaskUnlocked = (task: Task, tasks: Task[]) => {
    if (task.dependencyIds.length === 0) return true;

    for (const dependencyId of task.dependencyIds) {
      const dependency = tasks.find((t) => t.id === dependencyId);
      if (!dependency || !dependency.completedAt) {
        return false;
      }
    }
    return true;
  };

  const toggleTaskCompletion = async (task: Task, tasks: Task[]) => {
    if (isTaskUnlocked(task, tasks)) {
      const completed = Date().toLocaleString();
      try {
        await toggleTaskCompletionMutation({
          variables: {
            toggleTaskInput: {
              taskId: task.id,
              completedAt: completed,
            },
          },
        }).then(({ data }) => {
          if (data.toggleTask) {
            refetchTasks();
          }
        });
      } catch (error) {
        console.error("Toggle task completion error:", error);
      }
    }
  };

  return (
    <div className="card">
      <div className="row">
        <p className="header">{group.name}</p>
        <p className="group-button" onClick={onClose}>
          ALL GROUPS
        </p>
      </div>
      <span className="container"></span>
      <div>
        {group.tasks.map((task) => (
          <div
            className="container"
            key={task.id}
            onClick={() => toggleTaskCompletion(task, group.tasks)}
            style={{
              textDecoration: task.completedAt ? "line-through" : "none",
              color: isTaskUnlocked(task, group.tasks) ? "inherit" : "gray",
            }}
          >
            <div className="container">
              <div className="container-item">
                {getIcon(
                  task.completedAt !== null,
                  isTaskUnlocked(task, group.tasks)
                )}
              </div>

              <div className="container-column">
                <h3 className="container-item">{task.name}</h3>
              </div>
              <span></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Detailview;
