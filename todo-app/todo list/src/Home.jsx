import React, { useEffect, useState } from 'react';
import Create from './create';
import axios from 'axios';

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5174/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleEdit = (id) => {
    axios.put('http://localhost:5174/update/' + id)
      .then(() => location.reload())
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete('http://localhost:5174/delete/' + id)
      .then(() => location.reload())
      .catch(err => console.log(err));
  };

  return (
    <div className='home'>
      <h1>TODO LIST APP</h1>
      <Create />
      <br />
      {
        todos.length === 0 ? (
          <div><h2>No Record</h2></div>
        ) : (
          todos.map(todo => (
            <div className='task' key={todo._id}>
              <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                <p className={todo.done ? "line_through" : ""}>
                  {todo.task}
                </p>
              </div>
              <div>
                <span onClick={() => handleDelete(todo._id)}>🗑️</span>
              </div>
            </div>
          ))
        )
      }
    </div>
  );
}

export default Home;
