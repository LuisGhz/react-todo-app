import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { AddTodoButton } from "components/AddTodoButton";

Enzyme.configure({ adapter: new Adapter() });
describe('AddTodoButton component', () => {
  let wrapper = mount(<AddTodoButton />);

  beforeEach(() => {
    wrapper = mount(<AddTodoButton />);
  })

  test('button must has + character', () => {
    expect(wrapper.contains('+')).toBe(true)
  });

  test('must call onclick function', () => {
    const onClick = jest.fn();
    wrapper.setProps({ click: onClick })
    wrapper.find('button').simulate('click');
    expect(onClick).toBeCalled();
  });
})