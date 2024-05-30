import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsFillCheckCircleFill, BsTrashFill } from "react-icons/bs";
import { BsCircle } from "react-icons/bs";

const Home = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id, currentStatus) => {
        // Only allow changing from false to true
        if (!currentStatus) {
            axios.put(`http://localhost:3001/update/${id}`, { done: true })
                .then(result => {
                    setTodos(prevTodos =>
                        prevTodos.map(todo =>
                            todo._id === id ? { ...todo, done: true } : todo
                        )
                    );
                })
                .catch(err => console.log(err));
        }
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(result => {
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <div className='home'>
                <h2>Todo List App</h2>
                <Create />
                <br />
                {
                    todos.length === 0
                        ?
                        <div>No Record</div>
                        :
                        todos.map(todo => (
                            <div key={todo._id} className='task-wrapper'>
                                <div className='task'>
                                    <div className='checkbox' onClick={() => handleEdit(todo._id, todo.done)}>
                                        {todo.done ? 
                                            <BsFillCheckCircleFill className='icon' color='green' /> :
                                            <BsCircle className='icon' color='green' />
                                        }
                                        <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                                    </div>
                                </div>
                                <div>
                                    <span><BsTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                                </div>
                            </div>
                        ))
                }
            </div>
        </>
    );
}

export  default Home;
