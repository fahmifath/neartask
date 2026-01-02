import { useState } from "react";
import type { Task } from "../types/task";
import { updateSubTask } from "../api/subtask.service";
import "./TaskCard.css";

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
    <div className="task-card">
      <div className="task-card-header">
        <div className="task-card-content">
          <h3 className="task-card-title">{task.title}</h3>
          <p className="task-card-description">{task.description}</p>
          
          {/* Deadline */}
          {task.deadline && (
            <p className="task-card-deadline">
              📅 Deadline: {new Date(task.deadline).toLocaleDateString("id-ID")}
            </p>
          )}

          {/* Progress Bar & Subtask */}
          {task.use_progress && task.subtasks && task.subtasks.length > 0 && (
            <div className="task-card-progress-section">
              {/* Progress Bar */}
              <div>
                <div className="task-card-progress-header">
                  <strong>Progress</strong>
                  <span>{progress}%</span>
                </div>
                <div className="task-card-progress-bar">
                  <div
                    className="task-card-progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Subtask List */}
              <div>
                <strong className="task-card-subtasks-label">Subtask:</strong>
                <div className="task-card-subtasks">
                  {task.subtasks.map((subtask) => (
                    <label key={subtask.id} className="task-card-subtask-item">
                      <input
                        type="checkbox"
                        checked={subtask.is_done}
                        onChange={() => handleSubtaskToggle(subtask.id, subtask.is_done)}
                        disabled={loading}
                      />
                      <span
                        className={`task-card-subtask-text ${
                          subtask.is_done ? "completed" : ""
                        }`}
                      >
                        {subtask.title}
                      </span>
                      <span className="task-card-subtask-weight">
                        Weight: {subtask.weight}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <button onClick={onEdit} className="task-card-edit-btn">
          Edit
        </button>
      </div>
    </div>
  );
}