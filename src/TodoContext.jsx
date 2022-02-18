import React, { useState, useEffect } from 'react';

export const TodoContext = React.createContext()

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState(0);
  const [totalTasksCompleted, setTotalTasksCompleted] = useState(0);

  useEffect(() => {
    const totalT = tasks.filter(t => t.isCompleted).length;
    setTotalTasksCompleted(totalT);
  }, [tasks]);

  return (
    <TodoContext.Provider value={{
      tasks,
      setTasks,
      totalTasksCompleted,
      setTotalTasksCompleted
    }}>
      { children }
    </TodoContext.Provider>
  );
}