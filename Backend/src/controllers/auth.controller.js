import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, fullname, phoneNumber, role } = req.body;

    if (!username || !email || !password || !fullname || !phoneNumber || !role) {
      throw new ApiError(400, "All fields are required");
    }

    const existingUserByEmail = await User.findOne({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        throw new ApiError(400, "User already exists with this Email");
      }

      const existingUserByUsername = await User.findOne({
        username,
        _id: { $ne: existingUserByEmail._id },
      });

      if (existingUserByUsername) {
        throw new ApiError(400, "User already exists with this Username");
      }

      // Update unverified user
      existingUserByEmail.username = username;
      existingUserByEmail.fullname = fullname;
      existingUserByEmail.phoneNumber = phoneNumber;
      existingUserByEmail.password = password;
      existingUserByEmail.role = role;
      existingUserByEmail.otp = otp;
      existingUserByEmail.otpExpiration = otpExpiration;

      await existingUserByEmail.save();

      const subject = "Your OTP for Divertion Registration";
      const html = `<p>Hi ${fullname},</p>
        <p>Use the following OTP to complete your Divertion Registration:</p>
        <h2>${otp}</h2>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you didn't request this, you can ignore this email.</p>
        <p>Best Regards,<br>Divertion Team</p>`;

      await sendEmail(email, subject, html);

      return res.status(200).json(
        new ApiResponse(200, {
          userId: existingUserByEmail._id,
        }, "User info updated and OTP resent")
      );
    }

    // Check if username already exists
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      throw new ApiError(400, "User already exists with this Username");
    }

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password,
      fullname,
      phoneNumber,
      role,
      otp,
      otpExpiration,
    });

    const subject = "Your OTP for Divertion Registration";
    const html = `<p>Hi ${fullname},</p>
      <p>Use the following OTP to complete your Divertion Registration:</p>
      <h2>${otp}</h2>
      <p>This OTP is valid for 10 minutes.</p>
      <p>If you didn't request this, you can ignore this email.</p>
      <p>Best Regards,<br>Divertion Team</p>`;

    await sendEmail(email, subject, html);

    return res.status(201).json(
      new ApiResponse(201, {
        userId: newUser._id,
      }, "User registered successfully")
    );
  } catch (err) {
    next(err); // Passes to the global error handler
  }
};

export const verifyOtp = async (req, res) => {
  try{
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.isVerified) {
      throw new ApiError(400, "User already verified");

    }

    if (user.otp !== otp) {
      throw new ApiError(400, "Invalid OTP");
    }
    if(user.otpExpiration < Date.now()){
      throw new ApiError(400, "OTP expired");
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiration = null;
    await user.save();

    return res.status(200).json(
      new ApiResponse(200, {
        userId: user._id,
      }, "User verified successfully")
    );
  }catch(err){
    next(err);
  }

};
export const loginUser = async (req, res) => {};
export const logoutUser = async (req, res) => {};

export const resendOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User is already verified' });
    }



    // Generate new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save new OTP
    user.otp = newOtp,
    user.otpExpiration = Date.now() + 10 * 60 * 1000, // 10 minutes expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    await user.save();
    // Send OTP via email
    const subject = "Your OTP for Divertion Registration";
      const html = `<p>Hi ${user.fullname},</p>
        <p>Use the following OTP to complete your Divertion Registration:</p>
        <h2>${newOtp}</h2>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you didn't request this, you can ignore this email.</p>
        <p>Best Regards,<br>Divertion Team</p>`;

      await sendEmail(user.email, subject, html);

    return res.status(201).json(
      new ApiResponse(201), {
        userId: user._id,
      }, "Otp resent successfully")
  } catch (error) {
    console.error('Error in resendOtp:', error);
    next(error);
  }
};

