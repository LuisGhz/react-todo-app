import { AddTodoButton } from "components/AddTodoButton";
import { TodoHeader } from "components/TodoHeader";
import { TodoList } from "components/TodoList";

export const Home = () => {
  return (
    <section className="todo">
      <section className="todo__header">
        <TodoHeader />
      </section>
      <section className="todo__todo-list">
        <TodoList />
      </section>
      <AddTodoButton />
    </section>
  );
};
