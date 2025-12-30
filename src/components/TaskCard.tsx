// Komponen card untuk menampilkan satu task
// Menampilkan: judul, deskripsi, daftar subtask, dan tombol edit
import type { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
  onEdit: () => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "15px",
      borderRadius: "8px",
      backgroundColor: "white",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: "0 0 8px 0" }}>{task.title}</h3>
          <p style={{ margin: "0 0 10px 0", color: "#666" }}>{task.description}</p>

          {task.progress && task.subtasks && (
            <div>
              <strong>Subtask:</strong>
              <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                {task.subtasks.map((subtask) => (
                  <li key={subtask.id}>{subtask.title}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={onEdit}
          style={{
            padding: "8px 16px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}