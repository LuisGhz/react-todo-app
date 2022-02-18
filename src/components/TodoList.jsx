import React, { useContext } from 'react';
import { TodoContext } from 'TodoContext';

export const TodoList = () => {
  const { tasks } = useContext(TodoContext);
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