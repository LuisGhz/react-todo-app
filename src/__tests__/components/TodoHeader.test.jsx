import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { format } from 'date-fns';
import { TodoHeader } from 'components/TodoHeader';

Enzyme.configure({ adapter: new Adapter() });
describe('TodoHeader component', () => {
  let wrapper = mount(<TodoHeader />);

  beforeEach(() => {
    wrapper = mount(<TodoHeader />);
  })

  test('Should has title', () => {
    expect(wrapper.exists('h1')).toBeTruthy();
  })

  test('Should has created tasks section', () => {
    expect(wrapper.exists('.todo__created-tasks')).toBeTruthy();
  });

  test('Should has completed tasks section', () => {
    expect(wrapper.exists('.todo__completed-tasks')).toBeTruthy();
  })

  test('Should print 0 tasks created', () => {
    expect(wrapper.contains(/0 tasks created/i)).toBeTruthy();
  });

  test('Should print 0 tasks completed', () => {
    expect(wrapper.contains(/0 tasks completed/i)).toBeTruthy();
  });

  test('Should print 1 task created and 2 tasks created', () => {
    wrapper.setProps({ totalTasks: 1 });
    expect(wrapper.contains(/1 task created/i)).toBeTruthy();
    wrapper.setProps({ totalTasks: 2 })
    expect(wrapper.contains(/2 tasks created/i)).toBeTruthy();
  });

  test('Should print 1 task completed and 2 tasks completed', () => {
    wrapper.setProps({ totalTasks: 1 });
    expect(wrapper.contains(/1 task completed/i)).toBeTruthy();
    wrapper.setProps({ totalTasks: 2 })
    expect(wrapper.contains(/2 tasks completed/i)).toBeTruthy();
  });

  test('Should print current date with next format dd/MM8/yyyy', () => {
    const currentDate = format(new Date(), 'dd/MM/yyyy');
    expect(wrapper.contains(currentDate)).toBeTruthy();
  })
})