import jwt from "jsonwebtoken";
import { GenerateTokenParams } from "../modules/auth/types/utils.types";
import { acessTokenSecret, refreshTokenSecret } from "../constants/secrets";

export const generateToken = (
  params: GenerateTokenParams,
  expiresIn: string,
  token: "refresh" | "access"
) =>
  jwt.sign(
    params,
    token === "refresh" ? refreshTokenSecret : acessTokenSecret,
    {
      expiresIn,
    }
  );
