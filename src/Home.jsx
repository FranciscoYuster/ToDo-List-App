import React, { useEffect, useState } from 'react';

export const Home = () => {
  const apiUrl = 'https://playground.4geeks.com/todo/users/franciscoYuster';
  const todosURL = 'https://playground.4geeks.com/todo/todos/franciscoYuster';

  const [todos, setTodos] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if (response.status === 404) {
          return fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: "franciscoYuster" })
          });
        }
        return response;
      })
      .then(() => fetchTasks())
      .catch(error => console.error('Error verificando/creando usuario:', error));
  }, []);

  const fetchTasks = () => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setTodos(data.todos || []))
      .catch(error => console.error('Error obteniendo tareas:', error));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    fetch(todosURL, {
      method: 'POST',
      body: JSON.stringify({ label: taskInput, is_done: false }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => fetchTasks())
      .catch(error => console.error('Error agregando tarea', error));

    setTaskInput('');
  };

  const eliminar = (taskId) => {
    fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
      method: 'DELETE'
    })
      .then(() => fetchTasks())
      .catch(error => console.error('Error eliminando tarea', error));
  };

  const clearAllTask = () => {
    fetch(apiUrl, {
      method: 'DELETE'
    })
      .then(() => setTodos([]))
      .catch(error => console.error('Error eliminando todas las tareas', error));
  };

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>To Do List</h1>
          <form onSubmit={handleFormSubmit}>
            <input
              autoFocus={true}
              className='new-todo'
              placeholder='What needs to be done?'
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
          </form>
        </header>
        <section className="main">
          <ul className="todo-list">
            {todos.map((task) => (
              <li key={task.id}>
                <label>{task.label}</label>
                <button onClick={() => eliminar(task.id)}>x</button>
              </li>
            ))}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{todos.length}</strong> items left
          </span>
          <button className="btn" onClick={clearAllTask}>Clear All</button>
        </footer>
      </section>
    </>
  );
};
