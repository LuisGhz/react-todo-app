import React, { useState, useEffect } from "react";
import axios from 'axios';

export const TodoContext = React.createContext();

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [totalTasksCompleted, setTotalTasksCompleted] = useState(0);
  const client = axios.create({
    baseURL: "http://localhost:3000/todos"
  });

  useEffect(() => {
    if (tasks.length > 0) {
      const totalT = [...tasks];
      setTotalTasksCompleted(totalT.filter((t) => t.isCompleted).length);
      return;
    }
    setTotalTasksCompleted(0);
  }, [tasks]);

  return (
    <TodoContext.Provider
      value={{
        tasks,
        setTasks,
        totalTasksCompleted,
        setTotalTasksCompleted,
        client
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
