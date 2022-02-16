import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { TodoList } from 'components/TodoList';

Enzyme.configure({ adapter: new Adapter() })
describe('TodoList component', () => {
  let wrapper = mount(<TodoList />);

  beforeEach(() => {
    wrapper = mount(<TodoList />);
  })

  test('Should print You still have not a todo registered.', () => {
    expect(wrapper.contains('You still have not a todo registered.')).toBeTruthy();
  });

  test('Should print 3 elements', () => {
    const elements = [
      {id: 1, description: 'Todo 1', createdAt: new Date()},
      {id: 2, description: 'Todo 2', createdAt: new Date()},
      {id: 3, description: 'Todo 3', createdAt: new Date()},
    ];
    wrapper.setProps({ elements });
    expect(wrapper.find('li').length).toEqual(3);
  })
})