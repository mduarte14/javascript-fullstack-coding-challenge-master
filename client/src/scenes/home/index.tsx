import { useEffect, useState } from "react";
import Detailview from "../../components/Detailview";
import Overview from "../../components/Overview";
import { gql, useQuery } from "@apollo/client";

export interface Task {
  id: number;
  name: string;
  completedAt: string | null;
  dependencyIds: number[];
}

export interface Group {
  name: string;
  tasks: Task[];
}

const buildGroups = (tasks: any[]): Group[] => {
  const groups: Group[] = [];
  tasks.forEach((taskData) => {
    const existingGroupIndex = groups.findIndex(
      (group) => group.name === taskData.group
    );

    if (existingGroupIndex !== -1) {
      const task: Task = {
        id: taskData.id,
        name: taskData.task,
        completedAt: taskData.completedAt,
        dependencyIds: taskData.dependencyIds,
      };
      groups[existingGroupIndex].tasks.push(task);
    } else {
      const group: Group = {
        name: taskData.group,
        tasks: [
          {
            id: taskData.id,
            name: taskData.task,
            completedAt: taskData.completedAt,
            dependencyIds: taskData.dependencyIds,
          },
        ],
      };
      groups.push(group);
    }
  });
  return groups;
};

const getUpdatedGroup = (groupName: string, tasks: any[]): Group | null => {
  const groupTasks = tasks.filter((task) => task.group === groupName);
  if (groupTasks.length > 0) {
    return {
      name: groupName,
      tasks: groupTasks.map((taskData) => ({
        id: taskData.id,
        name: taskData.task,
        completedAt: taskData.completedAt,
        dependencyIds: taskData.dependencyIds,
      })),
    };
  }
  return null;
};

const GET_TASKS = gql`
  {
    tasks {
      id
      completedAt
      dependencyIds
      group
      task
    }
  }
`;

const Home = () => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const { loading, error, data, refetch } = useQuery(GET_TASKS);

  useEffect(() => {
    if (data && selectedGroup) {
      const updatedGroup = getUpdatedGroup(selectedGroup.name, data.tasks);
      setSelectedGroup(updatedGroup);
    }
  }, [data]);

  if (loading) return <div className="loader"></div>;
  if (error) return <p>Error: {error.message}</p>;

  const groups: Group[] = buildGroups(data.tasks);

  const handleSelectGroup = (group: Group) => {
    setSelectedGroup(group);
  };

  const handleCloseDetailView = () => {
    setSelectedGroup(null);
  };

  return (
    <div>
      {selectedGroup ? (
        <Detailview
          group={selectedGroup}
          onClose={handleCloseDetailView}
          refetchTasks={refetch}
        />
      ) : (
        <Overview onSelectGroup={handleSelectGroup} groups={groups} />
      )}
    </div>
  );
};

export default Home;
