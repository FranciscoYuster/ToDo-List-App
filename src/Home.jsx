import React, { useState } from 'react'

export const Home = () => {
  
  const [todos, setTodos] = useState([
    { done: false, title: 'Make the bed', id: Math.random() * 10},
    { done: false, title: 'Wahs my hands', id: Math.random() * 10},
    { done: false, title: 'Eat', id: Math.random() * 10},
    { done: false, title: 'Walk the dog', id: Math.random() * 10}
  ]);

  const [taskInput, setTaskInput] = useState('');

  const handleFormSumbit =  (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      { title: taskInput, done: false, id: Math.random() * 10}
    ]);
    setTaskInput('');
  }

  const eliminar = (taskId) => {
    setTodos(todos.filter(task => task.id !==taskId));
  }

  const nuevaTarea = todos.map(task => (
    <li key={task.id}>
      <div className="view">
        <label>{task.title}</label>
        <button className="destroy" onClick={() => eliminar(task.id)} >x</button>
      </div>
    </li>
  ))


  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>To Do</h1>
          <form onSubmit={handleFormSumbit}>
            <input autoFocus={true} className='new-todo' placeholder='What need to be done?' value={taskInput} onChange={(e) => setTaskInput(e.target.value)}/>
          </form>
        </header>
        <setcion className="main">
          <ul className="todo-list">
            {nuevaTarea}
          </ul>
        </setcion>
        <footer className="footer">
          <span className="todo-count">
            <strong>{todos.filter(task => !task.done).length}</strong> item left
          </span>
        </footer>
      </section>
    </>
  )
}
