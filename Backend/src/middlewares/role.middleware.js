// middlewares/role.middleware.js
import {ApiError} from "../utils/ApiError.js";

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "You are not allowed to access this resource");
    }
    next();
  };
};
