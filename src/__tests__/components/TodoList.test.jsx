import Enzyme, { mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import axios from "axios";
import { TodoList } from "components/TodoList";
import { TodoProvider, TodoContext } from "TodoContext";

Enzyme.configure({ adapter: new Adapter() });
describe("TodoList component", () => {
  let wrapper = mount(<></>);

  beforeEach(() => {
    wrapper = mount(
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    );
  });

  test("Should print You still have not a todo registered.", () => {
    expect(
      wrapper.contains("You still have not a todo registered.")
    ).toBeTruthy();
  });

  test("Get tasks with axios", async () => {
    const data = {
      data: 'data',
    };

    axios.get.mockResolvedValueOnce(data);
    expect(axios.get).toHaveBeenCalled();
  });

  test("Print 3 elements", () => {
    const data = [
      {
        id: 1,
        description: "1",
        createdAt: new Date(),
        isCompleted: false
      },
      {
        id: 2,
        description: "2",
        createdAt: new Date(),
        isCompleted: false
      },
      {
        id: 3,
        description: "3",
        createdAt: new Date(),
        isCompleted: false
      }
    ]
    const wr = mount(
      <TodoContext.Provider value={{ tasks: data }}>
        <TodoList />
      </TodoContext.Provider>
    )

    expect(wr.find("li").length).toEqual(3);
  });

  test.todo("Remove task");

  test.todo("Mark task as completed");
});
