import type { SubTask } from "../types/subtask";
import { updateSubTask } from "../api/subtask.service";
import "./SubTaskItem.css";

interface Props {
  subtask: SubTask;
  onUpdate: () => void;
}

export default function SubTaskItem({ subtask, onUpdate }: Props) {
  const toggle = async () => {
    await updateSubTask(subtask.id, {
      is_done: !subtask.is_done,
    });

    onUpdate();
  };

  return (
    <label className="subtask-item">
      <input
        type="checkbox"
        checked={subtask.is_done}
        onChange={toggle}
      />
      <span className={`subtask-item-text ${subtask.is_done ? "completed" : ""}`}>
        {subtask.title} ({subtask.weight}%)
      </span>
    </label>
  );
}
