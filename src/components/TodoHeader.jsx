import React from "react";
import { format } from "date-fns";
import { TodoContext } from "../TodoContext";
import { useContext } from "react";
import './TodoHeader.css';


export const TodoHeader = () => {
  const { tasks, totalTasksCompleted } = useContext(TodoContext);
  return (
    <React.Fragment>
      <h1 className='todo-header todo-app__todo-header'>
        {format(new Date(), 'dd/MM/yyyy')}
      </h1>
      <section className='todo-header__counter'>
        <section className='todo-header__created-tasks'>
          <span className='text-bold' >{tasks.length}</span> {tasks.length === 1 ? 'task' : 'tasks'} created
        </section>
        <section className='todo-header__completed-tasks'>
          <span className='text-bold' >{totalTasksCompleted}</span> {totalTasksCompleted === 1 ? 'task' : 'tasks'} completed
        </section>
      </section>
    </React.Fragment>
  );
};
