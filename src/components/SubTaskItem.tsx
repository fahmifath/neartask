import type { SubTask } from "../types/subtask";
import { updateSubTask } from "../api/subtask.service";

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
    <label style={{ display: "block" }}>
      <input
        type="checkbox"
        checked={subtask.is_done}
        onChange={toggle}
      />
      {subtask.title} ({subtask.weight}%)
    </label>
  );
}
