import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { SearchInput } from 'components/SearchInput';

Enzyme.configure({ adapter: new Adapter() })
describe('SearchInput component', () => {
  let wrapper = mount(<SearchInput />);

  beforeEach(() => {
    wrapper = mount(<SearchInput />);
  });

  test('Should has an input', () => {
    expect(wrapper.exists('input')).toBeTruthy();
  });

  test('Function must be called when input changes', () => {
    const onChange = jest.fn();
    wrapper.setProps({ onChange });
    wrapper.find('input').simulate('change', { targe: { value: 'Valor' } });
    expect(onChange).toBeCalled();
  });
});