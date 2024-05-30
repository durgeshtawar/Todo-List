import React, { useState } from 'react';
import axios from 'axios';
import "./App.css"

const Create = () => {
  const [task, setTask] = useState('');

  const handleAdd = () => {
    axios.post("http://localhost:3001/add", { task: task })
      .then(result => {
        location.reload();
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='create'>
      <input 
        type="text" 
        placeholder='Enter Your Todo' 
        onChange={(e) => setTask(e.target.value)} 
        className='input' 
      />
      <button 
        type='button' 
        className='button' 
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}

export default Create;
