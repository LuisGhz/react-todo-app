import React, { useState } from "react";
import { AddTodoButton } from "components/AddTodoButton";
import { TodoHeader } from "components/TodoHeader";
import { AddTodo } from "components/AddTodo";
import { TodoList } from "components/TodoList";
import "./Home.css";

export const Home = () => {
  const [isAddTodoVisible, setIsAddTodoVisible] = useState(false);

  return (
    <>
      <div className="todo-app__add-todo-container" style={{display: isAddTodoVisible ? 'flex' : 'none'}}>
        <AddTodo setIsAddTodoVisible={setIsAddTodoVisible} />
      </div>
      <section className="todo-app">
        <section className="todo-app__header">
          <TodoHeader />
        </section>
        <section className="todo-app__todo-list">
          <TodoList />
        </section>
        <section className="todo-app__add-todo-button-container">
          <AddTodoButton click={() => setIsAddTodoVisible(true)} />
        </section>
      </section>
    </>
  );
};
