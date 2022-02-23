import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { TodoTask } from "components/TodoTask";

Enzyme.configure({ adapter: new Adapter() });
describe("<TodoTask />", () => {
  let wrapper = mount(<></>);
  let task = {};
  let markAsCompleted = jest.fn();
  let removeTask = jest.fn();

  beforeEach(() => {
    task = {
      id: 1,
      description: "Task 1",
      createdAt: new Date(),
      isCompleted: false,
    };
    markAsCompleted = jest.fn();
    wrapper = mount(
      <TodoTask
        task={task}
        markAsCompleted={markAsCompleted}
        removeTask={removeTask}
      />
    );
  });

  test("Retrieve task from parent", () => {
    expect(wrapper.find(".todo-task__description").text()).toContain("Task 1");
  });

  test("Show date on next format: DD/MM/YYYY", () => {
    const currentDate = format(new Date(), "dd/MMMM/yyyy", {
      locale: es,
    });
    expect(wrapper.find(".todo-task__create-at").text()).toContain(currentDate);
  });

  test("Show gray check if task is not completed", () => {
    expect(wrapper.find(".todo-task__checkmark").props().className).toContain(
      "todo-task__checkmark--uncompleted"
    );
  });

  test("Mark as completed", () => {
    wrapper.find(".todo-task__checkmark").simulate("click");
    expect(markAsCompleted).toBeCalled();
  });

  test("Show green mark if task is completed", () => {
    const completedTask = {
      ...task,
      isCompleted: true,
    };
    wrapper.setProps({ task: completedTask });
    expect(wrapper.find(".todo-task__checkmark").props().className).toContain(
      "todo-task__checkmark--completed"
    );
  });

  test("Remove task", () => {
    wrapper.find(".todo-task__removemark").simulate("click");
    expect(removeTask).toBeCalled();
  });
});
