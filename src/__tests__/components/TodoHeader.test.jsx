import Enzyme, { mount } from 'enzyme';
import { TodoProvider, TodoContext } from 'TodoContext';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { format } from 'date-fns';
import { TodoHeader } from 'components/TodoHeader';

Enzyme.configure({ adapter: new Adapter() });
describe('TodoHeader component', () => {
  let wrapper = mount(
    <TodoProvider>
      <TodoHeader />
    </TodoProvider>
  );

  beforeEach(() => {
    wrapper = mount(
      <TodoProvider>
        <TodoHeader />
      </TodoProvider>
    )
  })

  test('Should has title', () => {
    expect(wrapper.exists('h1')).toBeTruthy();
  })

  test('Should has created tasks section', () => {
    expect(wrapper.exists('.todo-header__created-tasks')).toBeTruthy();
  });

  test('Should has completed tasks section', () => {
    expect(wrapper.exists('.todo-header__completed-tasks')).toBeTruthy();
  });

  test('Print 0 tasks created', () => {
    expect(wrapper.contains(/0 tasks created/i)).toBeTruthy();
  });

  test('Print 0 tasks completed', () => {
    expect(wrapper.contains(/0 tasks completed/i)).toBeTruthy();
  });

  test('Print 10 tasks created', () => {
    const view = mount(
      <TodoContext.Provider value={{totalTasks: 10}} >
        <TodoHeader />
      </TodoContext.Provider>
    )
    
    expect(view.find('.todo-header__created-tasks').text()).toContain('10 tasks created');
  });

  test('Print 10 tasks completed', () => {
    const view = mount(
      <TodoContext.Provider value={{totalTasksCompleted: 10}} >
        <TodoHeader />
      </TodoContext.Provider>
    )
    
    expect(view.find('.todo-header__completed-tasks').text()).toContain('10 tasks completed');
  });

  test('Print current date on next format dd/MM8/yyyy', () => {
    const currentDate = format(new Date(), 'dd/MM/yyyy');
    expect(wrapper.contains(currentDate)).toBeTruthy();
  })
})