import React, { useState } from "react";
import "./TodoList.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Front End Developer", description: "Description 1", done: false, timestamp: new Date() },
    { id: 2, title: "Back End Developer", description: "Description 2", done: false, timestamp: new Date() }
  ]);

  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const handleCreateTask = () => {
    if (newTask.trim() === "") {
      setError("Please fill the task title");
      return;
    }
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        title: newTask,
        description: "New task description",
        done: false,
        timestamp: new Date()
      }
    ]);
    setNewTask("");
    setError("");
  };

  const handleUpdateTask = (id, newTitle) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, title: newTitle, timestamp: new Date() } : task)));
  };

  const handleMarkAsDone = id => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, done: true, timestamp: new Date() } : task)));
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Enter task title"
        className="input"
      />
      <button onClick={handleCreateTask} className="button">Add Task</button>
      {error && <p className="error">{error}</p>}

      <br />

      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search tasks"
        className="input"
      />

      <ul className="taskList">
        {filteredTasks.map(task => (
          <li key={task.id} className="taskItem">
            <div className="taskHeader">
              <span className={`taskTitle ${task.done ? "done" : ""}`}>
                {task.title}
              </span>
              {task.done ? "(Completed)" : <button onClick={() => handleMarkAsDone(task.id)} className="markDoneButton">Mark as Done</button>}
              <button onClick={() => handleUpdateTask(task.id, prompt("Enter new task title:", task.title))} className="editButton">Edit</button>
            </div>
            <details className="details">
              <summary className="summary">Show Details</summary>
              <p className="description">{task.description}</p>
              <p className="timestamp">Last Updated: {task.timestamp.toString()}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
