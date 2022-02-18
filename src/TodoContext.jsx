import React, { useState } from 'react';

export const TodoContext = React.createContext()

export const TodoProvider = ({ children }) => {
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalTasksCompleted, setTotalTasksCompleted] = useState(0);

  return (
    <TodoContext.Provider value={{
      totalTasks,
      setTotalTasks,
      totalTasksCompleted,
      setTotalTasksCompleted
    }}>
      { children }
    </TodoContext.Provider>
  );
}