import type { Task } from "../types/task";
import SubTaskItem from "./SubTaskItem";

interface Props {
  task: Task;
  onUpdate: () => void;
}

export default function TaskCard({ task, onUpdate }: Props) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 15, marginBottom: 15 }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      {task.use_progress && (
        <>
          <p>Progress: {task.progress}%</p>
          <progress value={task.progress} max={100} />
        </>
      )}

      <div style={{ marginTop: 10 }}>
        {task.subtasks?.map((sub) => (
          <SubTaskItem key={sub.id} subtask={sub} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
}
