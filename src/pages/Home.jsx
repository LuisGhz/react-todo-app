import { AddTodoButton } from "components/AddTodoButton";
import { TodoHeader } from "components/TodoHeader";

export const Home = () => {
  return (
    <section className="todo">
      <section className="todo__header">
        <TodoHeader />
      </section>
      <section className="todo__todo-list"></section>
      <AddTodoButton />
    </section>
  );
};
