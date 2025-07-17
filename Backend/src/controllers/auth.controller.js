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

export const verifyOtp = async (req, res) => {};
export const loginUser = async (req, res) => {};
export const logoutUser = async (req, res) => {};
export const resednOtp = async (req, res) => {};
