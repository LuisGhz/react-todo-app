import { useContext, useState } from "react";
import { TodoContext } from "TodoContext";
import './AddTodo.css';

export const AddTodo = ({ setIsAddTodoVisible }) => {
  const { setTasks, tasks, client } = useContext(TodoContext);
  const [todoDescription, setTodoDescription] = useState("");
  console.log(setTasks)
  console.log(tasks)
  console.log(client)
  console.log(setTodoDescription)
  const onCancel = () => {
    setTodoDescription("");
    setIsAddTodoVisible(false);
  };

  const createOnEnter = e => {
    if (todoDescription.trim() !== "" && e.which === 13) addTodo();
  }

  const addTodo = () => {
    const newTask = {
      description: todoDescription.trim(),
      createdAt: new Date().getTime(),
      isCompleted: false,
    };
    client.post("", newTask);
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setTodoDescription("");
    setIsAddTodoVisible(false);
  };

  return (
    <div className="todo-container" >
      <h1 className="add-todo__title" >Add TODO</h1>
      <input
        type="text"
        className="todo-description"
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
        onKeyPress={(e) => createOnEnter(e)}
      />
      <div className="todo-buttons-container">
        <button
          onClick={onCancel}
          className="add-todo__cancel add-todo-base-button c-pointer text-bold"
        >
          Cancel
        </button>
        <button
          className="add-todo__add add-todo-base-button c-pointer text-bold"
          disabled={todoDescription.trim() === "" ? true : false}
          onClick={addTodo}
        >
          Add
        </button>
      </div>
    </div>
  );
};
