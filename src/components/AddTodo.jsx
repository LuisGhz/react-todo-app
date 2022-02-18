import { useContext, useState } from "react"
import { TodoContext } from "TodoContext"

export const AddTodo = ({ cancelAddTodo }) => {
  const [todoDescription, setTodoDescription] = useState('');
  const { setTasks } = useContext(TodoContext);

  const onCancel = () => {
    cancelAddTodo(false);
  }

  return (
    <>
      <h1>Add TODO</h1>
      <input type="text" className="todo-description" onChange={e => setTodoDescription(e.target.value)} />
      <button onClick={onCancel} className="add-todo__cancel" >Cancel</button>
      <button className="add-todo__add" disabled={todoDescription.trim() === '' ? true : false} >Add</button>
    </>
  )
}