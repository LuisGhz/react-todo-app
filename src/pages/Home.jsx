import { AddTodoButton } from "components/AddTodoButton";

export const Home = () => {
  return (
    <section className="todo">
      <section className="todo__header"></section>
      <section className="todo__todo-list"></section>
      <AddTodoButton />
    </section>
  );
};
