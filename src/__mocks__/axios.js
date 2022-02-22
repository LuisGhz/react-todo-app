"use strict";
module.exports = {
  post: (todo) => {
    return Promise.resolve({ ...todo });
  },
  get: () => {
    return Promise.resolve([
      {
        id: 1,
        description: "Task 1",
        createdAt: new Date(),
        isCompleted: false,
      },
      {
        id: 2,
        description: "Task 2",
        createdAt: new Date(),
        isCompleted: false,
      },
      {
        id: 3,
        description: "Task 3",
        createdAt: new Date(),
        isCompleted: false,
      },
    ]);
  },
};
