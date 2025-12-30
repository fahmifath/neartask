import { useEffect, useState } from "react";
import { getTasks } from "../api/task.service";
import type { Task } from "../types/task";
import TaskCard from "../components/TaskCard";
import Main from "../layouts/Main";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Main>
      <div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onUpdate={fetchTasks} />
        ))}
      </div>
    </Main>
  );
}