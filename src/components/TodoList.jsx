import React from 'react';

export const TodoList = ({ elements = [] }) => {
  return (
    <React.Fragment>
      {elements.length === 0 && <p>You still have not a todo registered.</p> }
      {elements.length > 0 && 
        <ul>
          { elements.map(el => (
            <li key={el.id}>{el.description}</li>
          )) }
        </ul> 
      }
    </React.Fragment>
  );
}