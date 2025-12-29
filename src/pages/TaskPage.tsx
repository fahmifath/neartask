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

  return (
    <Main>
      <h1>Todo List</h1>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Tambah todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTodo}>Tambah</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed ? "line-through" : "none"
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </Main>
  );
};

export default TaskPage;