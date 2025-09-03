import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);
  return token;
};

export const verifyToken = (token: string, secret: string) => {
  const decode = jwt.verify(token, secret);

  if (!decode) {
    throw new Error("Unauthorized access");
  }

  return decode;
};
