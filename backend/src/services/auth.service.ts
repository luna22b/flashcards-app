import { prisma } from "../prisma";
import bcrypt from "bcrypt";

// sign up service with prisma
export const Signup = {
  async signup(data: { username: string; email: string; password: string }) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
        username: data.username,
      },
    });

    if (existingUser) {
      throw new Error("This user already exists.");
    }

    // hashes passwords
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  },
};

// login service with prisma
export const Login = {
  async login(data: { identifier: string; password: string }) {
    // checks if user email or username exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.identifier }, { username: data.identifier }],
      },
    });

    if (!existingUser) {
      throw new Error("Invalid email or password");
    }

    // verify password
    const isPasswordValid = await bcrypt.compare(
      data.password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    return {
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
    };
  },
};

export const Me = {
  async get(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
};
