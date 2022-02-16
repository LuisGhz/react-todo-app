import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Home } from 'pages/Home';

Enzyme.configure({ adapter: new Adapter() })
describe('Home component', () => {
  let wrapper = mount(<Home />);

  beforeEach(() => {
    wrapper = mount(<Home />);
  });

  test('Should has a header section', () => {
    expect(wrapper.exists('.todo__header')).toBeTruthy();
  })

  test('Should has todo list', () => {
    expect(wrapper.exists('.todo__todo-list')).toBeTruthy();
  })

  test('Should has add todo button', () => {
    expect(wrapper.exists('.todo-button')).toBeTruthy();
  })
})