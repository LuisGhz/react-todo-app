import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import axios from "axios";
import { TodoList } from "components/TodoList";
import { TodoProvider, TodoContext } from "TodoContext";

Enzyme.configure({ adapter: new Adapter() });
describe("TodoList component", () => {
  let wrapper = mount(<></>);
  const fakeData = [
    {
      id: 1,
      description: "1",
      createdAt: new Date(),
      isCompleted: false,
    },
    {
      id: 2,
      description: "2",
      createdAt: new Date(),
      isCompleted: false,
    },
    {
      id: 3,
      description: "3",
      createdAt: new Date(),
      isCompleted: false,
    },
  ];

  beforeEach(() => {
    wrapper = mount(
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    );
  });

  test("Should print You still have not a todo registered.", () => {
    expect(
      wrapper.contains("You still have not a todo registered.")
    ).toBeTruthy();
  });

  test("Get tasks with axios", async () => {
    const data = {
      data: "data",
    };

    axios.get.mockResolvedValueOnce(data);
    expect(axios.get).toHaveBeenCalled();
  });

  test("Print 3 elements", () => {
    const data = [...fakeData];
    const wr = mount(
      <TodoContext.Provider value={{ tasks: data }}>
        <TodoList />
      </TodoContext.Provider>
    );

    expect(wr.find("li").length).toEqual(3);
  });

  test("Mark task as completed", () => {
    const data = [...fakeData];
    let newData  = [];

    const setTasks = (tasks) => {
      newData = [...tasks]
    };
    const wr = mount(
      <TodoContext.Provider value={{ tasks: data, setTasks }}>
        <TodoList />
      </TodoContext.Provider>
    );

    wr.find(".todo-task__checkmark").at(0).simulate("click");
    expect(newData.filter(t => t.isCompleted === true).length).toEqual(1);
    expect(axios.put).toBeCalled();
  });

  test("Remove task", () => {
    const data = [...fakeData];
    let newData = [];
    const setTasks = (tasks) => {
      newData = [...tasks];
    }

    const wr = mount(
      <TodoContext.Provider value={{ tasks: data, setTasks }}>
        <TodoList />
      </TodoContext.Provider>
    );

    wr.find(".todo-task__removemark").at(0).simulate("click");
    expect(newData.length).toEqual(2);
    expect(axios.delete).toBeCalled();
  });
});
