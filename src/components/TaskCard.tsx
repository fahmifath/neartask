import { useState } from "react";
import type { Task } from "../types/task";
import { updateSubTask } from "../api/subtask.service";

interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
  onEdit: () => void;
}

export default function TaskCard({ task, onUpdate, onEdit }: TaskCardProps) {
  const [loading, setLoading] = useState(false);

  const handleSubtaskToggle = async (subtaskId: string, currentStatus: boolean) => {
    try {
      setLoading(true);
      await updateSubTask(subtaskId, {
        is_done: !currentStatus,
      });
      onUpdate();
    } catch (err) {
      console.error("Error updating subtask:", err);
      alert("Gagal update subtask");
    } finally {
      setLoading(false);
    }
  };

  // Hitung progress
  const calculateProgress = () => {
    if (!task.subtasks || task.subtasks.length === 0) return 0;
    
    const totalWeight = task.subtasks.reduce((sum, st) => sum + st.weight, 0);
    const completedWeight = task.subtasks
      .filter((st) => st.is_done)
      .reduce((sum, st) => sum + st.weight, 0);
    
    return Math.round((completedWeight / totalWeight) * 100);
  };

  const progress = calculateProgress();

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
          
          {/* Deadline */}
          {task.deadline && (
            <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#999" }}>
              📅 Deadline: {new Date(task.deadline).toLocaleDateString("id-ID")}
            </p>
          )}

          {/* Progress Bar & Subtask */}
          {task.use_progress && task.subtasks && task.subtasks.length > 0 && (
            <div>
              {/* Progress Bar */}
              <div style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <strong>Progress</strong>
                  <span>{progress}%</span>
                </div>
                <div style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: `${progress}%`,
                    height: "100%",
                    backgroundColor: "#4CAF50",
                    transition: "width 0.3s ease",
                  }} />
                </div>
              </div>

              {/* Subtask List */}
              <div>
                <strong style={{ display: "block", marginBottom: "8px" }}>Subtask:</strong>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {task.subtasks.map((subtask) => (
                    <label
                      key={subtask.id}
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                        padding: "8px",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={subtask.is_done}
                        onChange={() => handleSubtaskToggle(subtask.id, subtask.is_done)}
                        disabled={loading}
                        style={{ cursor: "pointer" }}
                      />
                      <span style={{
                        flex: 1,
                        textDecoration: subtask.is_done ? "line-through" : "none",
                        color: subtask.is_done ? "#999" : "#000",
                      }}>
                        {subtask.title}
                      </span>
                      <span style={{
                        fontSize: "12px",
                        backgroundColor: "#e3f2fd",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        color: "#1976d2",
                      }}>
                        Weight: {subtask.weight}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
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
            whiteSpace: "nowrap",
            marginLeft: "10px",
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}