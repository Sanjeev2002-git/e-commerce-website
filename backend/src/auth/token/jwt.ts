import * as jwt from 'jsonwebtoken';

export type JwtPayload = {
  userId: string;
  roles: string[];
  iat?: number;
  exp?: number;
};

export function verifyAccessToken(token: string, secret: string): JwtPayload {
  // Throws on invalid/expired token
  return jwt.verify(token, secret, { algorithms: ['HS256'] }) as JwtPayload;
}

export function signAccessToken(
  payload: JwtPayload,
  secret: string,
  expiresIn: string
): string {
  // jsonwebtoken typings can be picky about option shapes across versions.
  // Cast to `jwt.SignOptions` to keep TS 5.9 + jsonwebtoken typings happy.
  const options = { expiresIn, algorithm: 'HS256' } as jwt.SignOptions;
  return jwt.sign(payload, secret, options);
}


