"use server";

import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  try {
    const { name, email, password } = payload;

    if (!name || !email || !password) {
      return { success: false, message: "All fields are required" };
    }

    if (password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters" };
    }

    const isExist = await dbConnect("users").findOne({ email });
    if (isExist) {
      return { success: false, message: "An account with this email already exists" };
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashPassword,
      provider: "credentials",
      role: "user",
      createdAt: new Date().toISOString(),
    };

    const result = await dbConnect("users").insertOne(newUser);
    if (result.acknowledged) {
      return { success: true, message: "Account created successfully" };
    } else {
      return { success: false, message: "Something went wrong. Please try again." };
    }
  } catch (error) {
    return { success: false, message: "Server error. Please try again later." };
  }
};
