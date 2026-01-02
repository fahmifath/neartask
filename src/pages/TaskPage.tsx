import Main from "../layouts/Main";
import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { getTasks, createTask } from "../api/task.service";
import { getSubTasks } from "../api/subtask.service"; 
import { createSubTask } from "../api/subtask.service";
import TaskCard from "../components/TaskCard";
import TaskModal, { type TaskFormData } from "../components/TaskModal";
import "./TaskPage.css";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      
      // Fetch subtasks untuk setiap task
      const tasksWithSubtasks = await Promise.all(
        data.map(async (task) => {
          if (task.use_progress) {
            const subtasks = await getSubTasks(task.id);
            return { ...task, subtasks };
          }
          return task;
        })
      );
      
      setTasks(tasksWithSubtasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpenModal = (task?: Task) => {
    setSelectedTask(task);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTask(undefined);
  };

  const handleSubmit = async (data: TaskFormData) => {
    try {
      // 1. Create task dulu
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      
      const res = await createTask({
        title: data.title,
        description: data.description,
        deadline: data.deadline || today,
        task_date: today,
        use_progress: data.hasProgress,
      });

      const taskId = res.data.id;

      // 2. Jika ada subtasks → simpan satu per satu
      if (data.hasProgress && data.subtasks.length > 0) {
        await Promise.all(
          data.subtasks.map((st) =>
            createSubTask(taskId, {
              title: st.title,
              weight: st.weight,
            })
          )
        );
      }

      await fetchTasks();
      handleCloseModal();
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Gagal membuat task: " + (err instanceof Error ? err.message : "Unknown error"));
    }
  };

  if (loading) return <Main><div className="task-page-loading">Loading...</div></Main>;

  return (
    <Main>
      <div className="task-page-container">
        <div className="task-page-header">
          <h1 className="task-page-title">NearTask</h1>
          <button
            onClick={() => handleOpenModal()}
            className="task-page-add-btn"
          >
            + Tambah Task
          </button>
        </div>

        <TaskModal
          open={openModal}
          task={selectedTask}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />

        <div className="task-page-grid">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={fetchTasks}
                onEdit={() => handleOpenModal(task)}
              />
            ))
          ) : (
            <div className="task-page-empty">Tidak ada task. Buat task baru untuk memulai.</div>
          )}
        </div>
      </div>
    </Main>
  );
}