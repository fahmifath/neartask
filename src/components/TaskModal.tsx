import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import Modal from "./Modal";
import "./TaskModal.css";

interface TaskModalProps {
    open: boolean;
    task?: Task;
    onClose: () => void;
    onSubmit: (data: TaskFormData) => void;
}

export interface TaskFormData {
    title: string;
    description: string;
    deadline?: string;
    hasProgress: boolean;
    subtasks: Array<{ title: string; weight: number }>;
}

const emptyForm: TaskFormData = {
    title: "",
    description: "",
    deadline: "",
    hasProgress: false,
    subtasks: [],
};

export default function TaskModal({
    open,
    task,
    onClose,
    onSubmit,
}: TaskModalProps) {
    const [formData, setFormData] = useState<TaskFormData>(emptyForm);
    const [newSubtask, setNewSubtask] = useState({ title: "", weight: 0 });

    /* =========================
       Sync data saat modal buka
    ========================== */
    useEffect(() => {
        if (!open) return;

        if (task) {
            setFormData({
                title: task.title,
                description: task.description ?? "",
                deadline: task.deadline ?? "",
                hasProgress: task.use_progress ?? false,
                subtasks:
                    task.subtasks?.map((st) => ({
                        title: st.title,
                        weight: st.weight ?? 0,
                    })) || [],
            });
        } else {
            setFormData(emptyForm);
        }

        setNewSubtask({ title: "", weight: 0 });
    }, [open, task]);

    /* =========================
       Handlers
    ========================== */
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProgressChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            hasProgress: e.target.checked,
            subtasks: e.target.checked ? prev.subtasks : [],
        }));
    };

    const handleAddSubtask = () => {
        if (!newSubtask.title.trim() || newSubtask.weight <= 0) return;

        setFormData((prev) => ({
            ...prev,
            subtasks: [...prev.subtasks, newSubtask],
        }));

        setNewSubtask({ title: "", weight: 0 });
    };

    const handleRemoveSubtask = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            subtasks: prev.subtasks.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    /* =========================
       UI
    ========================== */
    return (
        <Modal
            open={open}
            onClose={onClose}
            title={task ? "Edit Task" : "Tambah Task Baru"}
        >
            <form onSubmit={handleSubmit} className="task-modal-form">
                {/* Title */}
                <input
                    type="text"
                    name="title"
                    placeholder="Judul Task"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                {/* Description */}
                <textarea
                    name="description"
                    placeholder="Deskripsi"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                />

                {/* Deadline */}
                <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                />

                {/* Progress */}
                <label className="task-modal-checkbox-label">
                    <input
                        type="checkbox"
                        checked={formData.hasProgress}
                        onChange={handleProgressChange}
                    />
                    Gunakan Subtask
                </label>

                {/* Subtask Section */}
                {formData.hasProgress && (
                    <div className="task-modal-subtask-list">
                        {formData.subtasks.map((st, i) => (
                            <div key={i} className="task-modal-subtask-item">
                                <span>
                                    {st.title} ({st.weight})
                                </span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSubtask(i)}
                                >
                                    Hapus
                                </button>
                            </div>
                        ))}

                        <div className="task-modal-subtask-input">
                            <input
                                type="text"
                                placeholder="Nama subtask"
                                value={newSubtask.title}
                                onChange={(e) =>
                                    setNewSubtask((p) => ({ ...p, title: e.target.value }))
                                }
                                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                            />
                            <input
                                type="number"
                                min={1}
                                placeholder="Weight"
                                value={newSubtask.weight}
                                onChange={(e) =>
                                    setNewSubtask((p) => ({
                                        ...p,
                                        weight: Number(e.target.value),
                                    }))
                                }
                            />
                            <button type="button" onClick={handleAddSubtask}>
                                Tambah
                            </button>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="task-modal-actions">
                    <button type="button" onClick={onClose}>
                        Batal
                    </button>
                    <button type="submit">
                        {task ? "Update" : "Simpan"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
