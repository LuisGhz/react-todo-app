/** @jsxImportSource @emotion/react */
import { useContext, useState } from "react"
import axios from 'axios';
import { css } from "@emotion/react";
import { TodoContext } from "TodoContext"

const containerStyle = css`
    align-items: center;
    background-color: white;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    height: 30vh;
    justify-content: space-around;
    margin: 0 auto;
    min-height: 10rem;
    min-width: 20rem;
    width: 40vw;
`;

const inputStyle = css`
  width: 10rem;
`;

const buttonContainersStyle = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const baseButtonsStyle = css`
  border-radius: .7rem;
  color: white;
  width: 7rem;
  padding: .3rem 0;
  border: none;
`;

const cancelButtonStyle = css`
  background-color: gray;
`;

const addButtonStyle = css`
  background-color: #00ff22;
  color: white;
  width: 5rem;
`;

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
    <div className="todo-container" css={containerStyle}>
      <h1>Add TODO</h1>
      <input type="text" className="todo-description" css={inputStyle} onChange={e => setTodoDescription(e.target.value)} />
      <div className="todo-buttons-container" css={buttonContainersStyle}>
      <button onClick={onCancel} className="add-todo__cancel c-pointer text-bold" css={[cancelButtonStyle, baseButtonsStyle]} >Cancel</button>
      <button className="add-todo__add c-pointer text-bold" css={[addButtonStyle, baseButtonsStyle]} disabled={todoDescription.trim() === '' ? true : false} onClick={addTodo} >Add</button>
      </div>
    </div>
  );
}