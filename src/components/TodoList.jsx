import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { TodoContext } from 'TodoContext';
import { TodoTask } from './TodoTask';

export const TodoList = () => {
  const { tasks, setTasks } = useContext(TodoContext);
  useEffect(() => {
    (async () => {
      const r = await axios.get("http://localhost:3000/todos");
      setTasks(r.data);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      {tasks.length === 0 && <p>You still have not a todo registered.</p> }
      {tasks.length > 0 && 
        <ul>
          { tasks.map(task => (
            <li key={task.id}><TodoTask key={task.id} task={task} /></li>
          )) }
        </ul> 
      }
    </React.Fragment>
  );
}