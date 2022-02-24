import { useContext, useEffect } from "react";
import Enzyme, { mount } from "enzyme";
import axios from 'axios';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { TodoContext, TodoProvider } from "TodoContext";

Enzyme.configure({ adapter: new Adapter() });
describe("TodoContext", () => {

  beforeEach(() => {
    axios.create.mockReturnThis();
  });
  
  test("Get tasks and set new tasks", () => {
    const TestComponent = () => {
      const { tasks, setTasks } = useContext(TodoContext);

      const addTask = () => {
        const t = [...tasks];
        const random = Math.round(Math.random() * 10);
        t.push({
          id: random,
          description: `${random}`,
          createdAt: new Date(),
          isCompleted: false,
        });
        setTasks(t);
      };

      return (
        <>
          <p>{tasks.length}</p>
          <button onClick={addTask}>
            Add
          </button>
        </>
      );
    };

    const wrapper = mount(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );
    
    expect(wrapper.find("p").text()).toEqual("0");
    wrapper.find("button").simulate("click");
    expect(wrapper.find("p").text()).toEqual("1");
  });

  test("From 2 tasks set 1 as completed", () => {
    const TestComponent = () => {
      const { tasks, setTasks, totalTasksCompleted } = useContext(TodoContext);

      useEffect(() => {
        setTasks([
          {
            id: 1,
            description: "1",
            isCompleted: false
          },
          {
            id: 2,
            description: "2",
            isCompleted: false
          }
        ])
      }, [])

      const markTask = () => {
        const t = [...tasks];
        t[0].isCompleted = true;
        setTasks(t);
      };

      return (
        <>
          <p>{totalTasksCompleted}</p>
          <button onClick={markTask}>
            Completed
          </button>
        </>
      );
    };

    const wrapper = mount(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    expect(wrapper.find("p").text()).toEqual("0");
    wrapper.find("button").simulate("click");
    expect(wrapper.find("p").text()).toEqual("1");
  });

  test("Call axios client", () => {
    const TestComponent = () => {
      const { client } = useContext(TodoContext);

      useEffect(() => {
        client.get("");
      }, []);

      return <></>
    }

    const wrapper = mount(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    expect(axios.get).toBeCalled();
  });

});
