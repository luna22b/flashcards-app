import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  });
};
