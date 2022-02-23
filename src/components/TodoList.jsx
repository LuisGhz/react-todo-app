import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { TodoContext } from 'TodoContext';

export const TodoList = () => {
  const { tasks, setTasks } = useContext(TodoContext);
  useEffect(() => {
    (async () => {
      const r = await axios.get("http://localhost:3000/db");
      setTasks(r.data);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      {tasks.length === 0 && <p>You still have not a todo registered.</p> }
      {tasks.length > 0 && 
        <ul>
          { tasks.map(el => (
            <li key={el.id}>{el.description}</li>
          )) }
        </ul> 
      }
    </React.Fragment>
  );
}