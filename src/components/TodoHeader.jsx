import React from 'react';
import { format } from 'date-fns';

export const TodoHeader = ({ totalTasks = 0, completedTasks = 0 }) => {
  return (
    <React.Fragment>
      <h1>{format(new Date(), 'dd/MM/yyyy')}</h1>
      <section className="todo__created-tasks">
        {totalTasks} { totalTasks === 1 ? 'task' : 'tasks' } created
      </section>
      <section className="todo__completed-tasks">
        {completedTasks} { completedTasks === 1 ? 'task' : 'tasks' } completed
      </section>
    </React.Fragment>
  );
}