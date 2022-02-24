import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import axios from "axios";
import { TodoList } from "components/TodoList";
import { TodoProvider } from "TodoContext";

Enzyme.configure({ adapter: new Adapter() });
describe("TodoList component", () => {
  let wrapper = mount(<></>);
  const mockData = [
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
  let newData = [];
  let setTasks = (tasks) => {
    newData = [...tasks];
  };
  jest.mock("React", () => ({
    ...jest.requireActual("React"),
    useContext: jest.fn(),
  }));
  let contextSpy = jest.spyOn(React, "useContext");

  beforeEach(() => {
    contextSpy.mockImplementation(() => ({
      tasks: mockData,
      setTasks,
      client: axios,
    }));

    wrapper = mount(
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    );
  });

  beforeEach(() => {
    axios.create.mockReturnThis();
  });

  afterEach(() => {
    newData = [];
  });

  test("Should print You still have not a todo registered.", () => {
    contextSpy.mockImplementation(() => ({
      tasks: [],
      setTasks,
      client: axios,
    }));

    wrapper = mount(
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    );

    expect(
      wrapper.contains("You still have not a todo registered.")
    ).toBeTruthy();
  });

  test("Get tasks with axios", async () => {
    expect(axios.get).toHaveBeenCalled();
  });

  test("Print 3 elements", () => {
    expect(wrapper.find("li").length).toEqual(3);
  });

  test("Mark task as completed", () => {
    wrapper.find(".todo-task__checkmark").at(0).simulate("click");
    expect(newData.filter((t) => t.isCompleted === true).length).toEqual(1);
    expect(axios.put).toBeCalled();
  });

  test("Remove task", () => {
    wrapper.find(".todo-task__removemark").at(0).simulate("click");
    expect(newData.length).toEqual(2);
    expect(axios.delete).toBeCalled();
  });
});
