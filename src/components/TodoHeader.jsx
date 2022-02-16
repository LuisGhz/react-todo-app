import React from "react";
import { format } from "date-fns";
import './TodoHeader.css'

export const TodoHeader = ({ totalTasks = 0, completedTasks = 0 }) => {
  return (
    <React.Fragment>
      <h1 className='todo-header todo-app__todo-header'>
        {format(new Date(), 'dd/MM/yyyy')}
      </h1>
      <section className='todo-header__counter'>
        <section className='todo-header__created-tasks'>
          <span className='text-bold' >{totalTasks}</span> {totalTasks === 1 ? 'task' : 'tasks'} created
        </section>
        <section className='todo-header__completed-tasks'>
          <span className='text-bold' >{completedTasks}</span> {completedTasks === 1 ? 'task' : 'tasks'} completed
        </section>
      </section>
    </React.Fragment>
  );
};
