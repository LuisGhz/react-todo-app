import { format } from "date-fns";
import { es } from "date-fns/locale";

export const TodoTask = ({ task, markAsCompleted, removeTask }) => {
  
  return (
    <article className="todo-task">
      <span
        className={`todo-task__checkmark ${
          task.isCompleted
            ? "todo-task__checkmark--completed"
            : "todo-task__checkmark--uncompleted"
        }`}
        onClick={markAsCompleted}
      >
        &#x2713;
      </span>
      <div>
        <p className="todo-task__description">{task.description}</p>
        <p className="todo-task__create-at">
          {format(task.createdAt, "dd/MMMM/yyyy", { locale: es })}
        </p>
      </div>
      <span className="todo-task__removemark"
        onClick={removeTask}
      >
        &#x2715;
      </span>
    </article>
  );
};
