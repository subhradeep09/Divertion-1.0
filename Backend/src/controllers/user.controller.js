import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const profile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    if(!userId) {
      throw new ApiError(404, "Unauthorized Request");
    }
    const user = await User.findById(userId).select("-password -refreshToken -otp -otpExpiration ");
    return res.status(200).json(new ApiResponse(200, user, "Profile retrieved successfully"));
  } catch (error) {
    next(error);
  }
};
