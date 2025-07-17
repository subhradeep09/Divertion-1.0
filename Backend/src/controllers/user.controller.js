import { ApiResponse } from '../utils/ApiResponse.js';

export const getAllUsers = async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, [{ name: 'John Doe' }], 'Fetched users'));
};
