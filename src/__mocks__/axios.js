/* eslint-disable import/no-anonymous-default-export */
export default {
  get: jest.fn().mockResolvedValue(),
  post: jest.fn().mockResolvedValue(),
  put: jest.fn(),
  delete: jest.fn()
};