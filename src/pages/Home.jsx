import { AddTodoButton } from "components/AddTodoButton";
import { TodoHeader } from "components/TodoHeader";
import { TodoList } from "components/TodoList";
import './Home.css'

export const Home = () => {
  return (
    <section className="todo-app">
      <section className="todo-app__header">
        <TodoHeader />
      </section>
      <section className="todo-app__todo-list">
        <TodoList />
      </section>
      <AddTodoButton />
    </section>
  );
};
