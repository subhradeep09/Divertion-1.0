// middlewares/role.middleware.js
import {ApiError} from "../utils/ApiError.js";

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (req.user?.isBanned) {
      throw new ApiError(403, "Your account has been banned. Contact support.");
    }
    if(req.user?.isVerified === false) {
      throw new ApiError(403, "Please verify your account before accessing this resource.");
    }
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "You are not allowed to access this resource");
    }
    next();
  };
};
