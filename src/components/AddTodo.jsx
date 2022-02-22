import { useContext, useState } from "react"
import { TodoContext } from "TodoContext"
import axios from 'axios';

export const AddTodo = ({ setIsAddTodoVisible }) => {
  const [todoDescription, setTodoDescription] = useState('');
  const { setTasks, tasks = [] } = useContext(TodoContext);

  const onCancel = () => {
    setIsAddTodoVisible(false);
  }

  const addTodo = () => {
    const newTask = {
      description: todoDescription,
      createdAt: new Date(),
      isCompleted: false
    };
    axios.post('http://localhost:3000/todos', newTask);
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setIsAddTodoVisible(false);
  }

  return (
    <>
      <h1>Add TODO</h1>
      <input type="text" className="todo-description" onChange={e => setTodoDescription(e.target.value)} />
      <button onClick={onCancel} className="add-todo__cancel" >Cancel</button>
      <button className="add-todo__add" disabled={todoDescription.trim() === '' ? true : false} onClick={addTodo} >Add</button>
    </>
  );
}