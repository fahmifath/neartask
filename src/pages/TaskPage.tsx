import { useState } from "react";
import Main from "../layouts/Main";
import type { Task } from "../types/Task";

const TaskPage = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  const addTodo = () => {
    if (!title) return;

    const newTodo: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <Main>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ margin: "0 0 10px 0", color: "#2c3e50", fontSize: "32px" }}>📋 Task Management</h1>
        <p style={{ margin: "0", color: "#7f8c8d", fontSize: "14px" }}>Organize your tasks efficiently</p>
      </div>

      <div style={{ 
        marginBottom: "30px",
        display: "flex",
        gap: "10px",
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
      }}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            flex: "1",
            padding: "12px 16px",
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            fontSize: "16px",
            fontFamily: "inherit",
            transition: "all 0.25s ease"
          }}
        />
        <button onClick={addTodo} style={{ marginBottom: 0 }}>Add Task</button>
      </div>

      {todos.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "#95a5a6"
        }}>
          <p style={{ fontSize: "18px" }}>✨ No tasks yet. Create your first one!</p>
        </div>
      ) : (
        <div style={{
          background: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden"
        }}>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {todos.map((todo, index) => (
              <li 
                key={todo.id}
                style={{
                  padding: "16px 20px",
                  borderBottom: index !== todos.length - 1 ? "1px solid #f0f0f0" : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "all 0.25s ease"
                }}
              >
                <span
                  onClick={() => toggleTodo(todo.id)}
                  style={{
                    cursor: "pointer",
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#bdc3c7" : "#2c3e50",
                    fontSize: "16px",
                    flex: "1",
                    transition: "all 0.25s ease"
                  }}
                >
                  {todo.completed ? "✓" : "○"} {todo.title}
                </span>
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    background: "#e74c3c",
                    padding: "6px 12px",
                    fontSize: "14px",
                    marginLeft: "10px"
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Main>
  );
};

export default TaskPage;