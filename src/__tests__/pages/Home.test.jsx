import React, { useState as useStateMock } from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Home } from "pages/Home";
import { TodoContext, TodoProvider } from "TodoContext";

jest.mock("React", () => ({
  ...jest.requireActual("React"),
  useState: jest.fn(),
}));

Enzyme.configure({ adapter: new Adapter() });
describe("Home component", () => {
  let wrapper = mount(<></>);
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, "useState");

  beforeEach(() => {
    useStateSpy.mockImplementation((init) => [init, setState]);
    wrapper = mount(
      <TodoProvider>
        <Home />
      </TodoProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should has a header section", () => {
    expect(wrapper.exists(".todo-app__header")).toBeTruthy();
  });

  test("Should has todo list", () => {
    expect(wrapper.exists(".todo-app__todo-list")).toBeTruthy();
  });

  test("Should has add todo button", () => {
    expect(wrapper.exists(".open-modal-todo-button")).toBeTruthy();
  });

  test("Open add todo modal when users make click on add todo button", () => {
    wrapper.find(".open-modal-todo-button").at(1).simulate("click");
    expect(setState).toBeCalledWith(true);
  });
});
