import Enzyme, { mount } from "enzyme";
import { cleanup } from "@testing-library/react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { TodoContext } from 'TodoContext';
import { AddTodo } from 'components/AddTodo';
import axios from 'axios';

jest.mock('axios')
Enzyme.configure({ adapter: new Adapter() });
describe('AddTodo component', () => {

  afterEach(cleanup);

  test('Cancel todo', () => {
    const setIsAddTodoVisible = jest.fn();
    const wrapper = mount(
      <TodoContext.Provider value={{ setTasks: () => {} }} >
        <AddTodo  setIsAddTodoVisible={setIsAddTodoVisible} />
      </TodoContext.Provider>
    );
    wrapper.find('.add-todo__cancel').at(1).simulate('click');
    expect(setIsAddTodoVisible).toBeCalled()
  });
  
  test('Add todo button must be disable by default', () => {
    const wrapper = mount(
      <TodoContext.Provider value={{ setTasks: () => {} }} >
        <AddTodo />
      </TodoContext.Provider>
    );
    expect(wrapper.find('.add-todo__add').at(1).props().disabled).toBe(true);
  });

  test('Add todo button must be enabled if description input has value', () => {
    const wrapper = mount(
      <TodoContext.Provider value={{ setTasks: () => {} }} >
        <AddTodo />
      </TodoContext.Provider>
    );
    wrapper.find('.todo-description').at(1).simulate('change', { target: { value: 'description' } })
    expect(wrapper.find('.add-todo__add').at(1).props().disabled).toBeFalsy()
  });

  test('Add todo button must disabled if user sets string with only blank spaces on description', () => {
    const wrapper = mount(
      <TodoContext.Provider value={{ setTasks: () => {} }} >
        <AddTodo />
      </TodoContext.Provider>
    );
    wrapper.find('.todo-description').at(1).simulate('change', { target: { value: '     ' } })
    expect(wrapper.find('.add-todo__add').at(1).props().disabled).toBe(true)
  });
  
  
  test('Call axios and close component if user enter a description', () => {
    const postSpy = jest.spyOn(axios, 'post');
    const setIsAddTodoVisible = jest.fn();
    const wrapper = mount(
      <TodoContext.Provider value={{ setTasks: () => {} }} >
        <AddTodo setIsAddTodoVisible={setIsAddTodoVisible} />
      </TodoContext.Provider>
    );
    wrapper.find('.todo-description').at(1).simulate('change', { target: { value: 'Description' } });
    wrapper.find('.add-todo__add').at(1).simulate('click');
    expect(wrapper.find('.todo-description').at(1).props().value).toEqual("");
    expect(postSpy).toBeCalled();
    expect(setIsAddTodoVisible).toBeCalled();
  });
  
  test("Create todo with enter key and only if description is valid", () => {
    const postSpy = jest.spyOn(axios, 'post');
    const setIsAddTodoVisible = jest.fn();
    const wrapper = mount(
      <TodoContext.Provider value={{ setTasks: () => {} }} >
        <AddTodo setIsAddTodoVisible={setIsAddTodoVisible} />
      </TodoContext.Provider>
    );
    
    wrapper.find('.todo-description').at(1).simulate('change', { target: { value: '      ' } });
    wrapper.find('.todo-description').at(1).simulate('keypress', { which: 13 });
    expect(postSpy).toBeCalledTimes(0);
    wrapper.find('.todo-description').at(1).simulate('change', { target: { value: 'Description' } });
    wrapper.find('.todo-description').at(1).simulate('keypress', { which: 13 });
    expect(postSpy).toBeCalled();
    expect(setIsAddTodoVisible).toBeCalled();
  });


});