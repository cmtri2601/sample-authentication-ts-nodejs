import { Request, Response, NextFunction } from 'express';
import jwt, { Jwt, JwtPayload, VerifyErrors } from 'jsonwebtoken';

const tokenSecretKey = 'tokenSecretKey';

interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

type Error = VerifyErrors | null;
type Decoded = Jwt | JwtPayload | string | undefined;

const jwtAuthenticate = (req: CustomRequest, res: Response, next: NextFunction) => {
  // Lấy access token từ header
  const token = req.cookies?.accessToken;

  if (token == null) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, tokenSecretKey, (err: Error, user: Decoded) => {
    //  403 (Forbidden)
    if (err) {
      res.sendStatus(403);
      return;
    }

    req.user = user;
    next();
  });
};

export default jwtAuthenticate;
