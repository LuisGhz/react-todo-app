import React, { useContext, useEffect } from "react";
import axios from "axios";
import { TodoContext } from "TodoContext";
import { TodoTask } from "./TodoTask";

export const TodoList = () => {
  const { tasks, setTasks } = useContext(TodoContext);

  useEffect(() => {
    (async () => {
      const r = await axios.get("http://localhost:3000/todos");
      setTasks(r.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markAsCompleted = id => {
    const index = tasks.findIndex(t => t.id === id);
    const stringified = JSON.stringify(tasks)
    const temp = JSON.parse(stringified);
    temp[index].isCompleted = true;
    setTasks(temp);
    axios.put(`http://localhost:3000/todos/${id}`, temp[index]);
  }

  const removeTask = id => {
    const index = tasks.findIndex(t => t.id === id);
    const stringified = JSON.stringify(tasks);
    const temp = JSON.parse(stringified);
    temp.splice(index, 1);
    setTasks(temp);
    axios.delete(`http://localhost:3000/todos/${id}`);
  }

  return (
    <React.Fragment>
      {tasks.length === 0 && <p>You still have not a todo registered.</p>}
      {tasks.length > 0 && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <TodoTask key={task.id} task={task} markAsCompleted={() => markAsCompleted(task.id)} removeTask={() => removeTask(task.id)} />
            </li>
          ))}
        </ul>
      )}
    </React.Fragment>
  );
};
