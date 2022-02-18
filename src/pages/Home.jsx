import { AddTodoButton } from "components/AddTodoButton";
import { TodoHeader } from "components/TodoHeader";
import { AddTodo } from "components/AddTodo";
import { TodoProvider } from "TodoContext";
import { TodoList } from "components/TodoList";
import "./Home.css";

export const Home = () => {
  return (
    <TodoProvider>
      <div className="todo-app__add-todo-container">
        <AddTodo />
      </div>
      <section className="todo-app">
        <section className="todo-app__header">
          <TodoHeader />
        </section>
        <section className="todo-app__todo-list">
          <TodoList />
        </section>
        <AddTodoButton />
      </section>
    </TodoProvider>
  );
};
