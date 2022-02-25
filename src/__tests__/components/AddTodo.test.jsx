import React from "react";
import Enzyme, { mount } from "enzyme";
import { cleanup } from "@testing-library/react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { TodoProvider } from "TodoContext";
import { AddTodo } from "components/AddTodo";
import axios from "axios";

jest.mock("React", () => ({
  ...jest.requireActual("React"),
  useContext: jest.fn(),
}));
Enzyme.configure({ adapter: new Adapter() });
describe("<AddTodo />", () => {
  let wrapper = mount(<></>);
  let setIsAddTodoVisible = jest.fn();
  let contextSpy = jest.spyOn(React, "useContext");

  const mockData = [];
  let setTasks = jest.fn();
  beforeEach(() => {
    contextSpy.mockImplementation(() => ({
      tasks: mockData,
      setTasks,
      client: axios,
    }));
  });

  beforeEach(() => {
    wrapper = mount(
      <TodoProvider>
        <AddTodo setIsAddTodoVisible={setIsAddTodoVisible} />
      </TodoProvider>
    );
  });

  afterEach(cleanup);

  test("Cancel todo", () => {
    wrapper.find(".add-todo__cancel").simulate("click");
    expect(setIsAddTodoVisible).toBeCalled();
  });

  test("Input must has auto focus", () => {
    expect(wrapper.find(".todo-description").props().autoFocus).toBeTruthy();
  })

  test("Add todo button must be disable by default", () => {
    expect(wrapper.find(".add-todo__add").props().disabled).toBe(true);
  });

  test("Add todo button must be enabled if description input has value", () => {
    wrapper
      .find(".todo-description")
      .simulate("change", { target: { value: "description" } });
    expect(wrapper.find(".add-todo__add").props().disabled).toBeFalsy();
  });

  test("Add todo button must disabled if user sets string with only blank spaces on description", () => {
    wrapper
      .find(".todo-description")
      .simulate("change", { target: { value: "     " } });
    expect(wrapper.find(".add-todo__add").props().disabled).toBe(true);
  });

  test("Call axios and close component if user enter a description", () => {
    wrapper
      .find(".todo-description")
      
      .simulate("change", { target: { value: "Description" } });
    wrapper.find(".add-todo__add").simulate("click");
    expect(wrapper.find(".todo-description").props().value).toEqual("");
    expect(axios.post).toBeCalled();
    expect(setIsAddTodoVisible).toBeCalled();
  });

  test("Create todo with enter key and only if description is valid", () => {
    wrapper
      .find(".todo-description")
      
      .simulate("change", { target: { value: "      " } });
    wrapper.find(".todo-description").simulate("keypress", { which: 13 });
    expect(axios.post).toBeCalledTimes(0);
    wrapper
      .find(".todo-description")
      
      .simulate("change", { target: { value: "Description" } });
    wrapper.find(".todo-description").simulate("keypress", { which: 13 });
    expect(axios.post).toBeCalled();
    expect(setIsAddTodoVisible).toBeCalled();
  });
});
