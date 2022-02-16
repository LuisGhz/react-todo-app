import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Icon } from "components/Icon";

Enzyme.configure({ adapter: new Adapter() });
describe('Icon component', () => {
  let wrapper = mount(<Icon />);

  beforeEach(() => {
    wrapper = mount(<Icon />);
  })

  test('span must has + text', () => {
    expect(wrapper.contains('+')).toBe(true)
  });

  test('must call onclick function', () => {
    const onClick = jest.fn();
    wrapper.setProps({ click: onClick })
    wrapper.find('button').simulate('click');
    expect(onClick).toBeCalled();
  });
})