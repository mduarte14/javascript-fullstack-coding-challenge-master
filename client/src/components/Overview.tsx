import { Group, Task } from "../scenes/home";

interface OverviewScreenProps {
  onSelectGroup: (group: Group) => void;
  groups: Group[];
}

const GroupItem = (props: { header: string; subheader: string }) => {
  return (
    <div className="container">
      <img src="../src/assets/img/group.svg" />
      <div className="container-column">
        <p className="container-item subheader">{props.header}</p>
        <p className="container-item description">{props.subheader}</p>
        <span />
        <span />
      </div>
      <span></span>
    </div>
  );
};

const getTasksSubheader = (group: Group) => {
  const completed = group.tasks.filter((task: Task) => task.completedAt).length;
  return `${completed} of ${group.tasks.length} TASKS COMPLETED`;
};

function Overview({ onSelectGroup, groups }: OverviewScreenProps) {
  return (
    <div className="card">
      <p className="header">Things To Do</p>
      <span className="container"></span>
      {groups.map((group, index) => (
        <div key={index} onClick={() => onSelectGroup(group)}>
          <GroupItem header={group.name} subheader={getTasksSubheader(group)} />
        </div>
      ))}
    </div>
  );
}

export default Overview;
