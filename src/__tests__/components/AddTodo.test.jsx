import Enzyme, { mount } from "enzyme";
import { cleanup } from "@testing-library/react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { TodoContext } from 'TodoContext';
import { AddTodo } from 'components/AddTodo';

Enzyme.configure({ adapter: new Adapter() });
describe('AddTodo component', () => {

  afterEach(cleanup);

  test('Cancel todo', () => {
    const setIsAddTodoVisible = jest.fn();
    const wrapper = mount(
      <TodoContext.Provider value={{ setTasks: () => {} }} >
        <AddTodo  cancelAddTodo={setIsAddTodoVisible} />
      </TodoContext.Provider>
    );
    wrapper.find('.add-todo__cancel').simulate('click');
    expect(setIsAddTodoVisible).toBeCalled()
  });
  
  test('Add todo button must be disable by default', () => {
    const wrapper = mount(
      <TodoContext.Provider value={{ setTasks: () => {} }} >
        <AddTodo />
      </TodoContext.Provider>
    );
    expect(wrapper.find('.add-todo__add').props().disabled).toBe(true);
  });

  test('Add todo button must be enabled if description input has value', () => {
    const wrapper = mount(
      <TodoContext.Provider value={{ setTasks: () => {} }} >
        <AddTodo />
      </TodoContext.Provider>
    );
    wrapper.find('.todo-description').simulate('change', { target: { value: 'description' } })
    expect(wrapper.find('.add-todo__add').props().disabled).toBeFalsy()
  });

  test('Add todo button must disabled if user sets string with only blank spaces on description', () => {
    const wrapper = mount(
      <TodoContext.Provider value={{ setTasks: () => {} }} >
        <AddTodo />
      </TodoContext.Provider>
    );
    wrapper.find('.todo-description').simulate('change', { target: { value: '     ' } })
    expect(wrapper.find('.add-todo__add').props().disabled).toBe(true)
  });
});