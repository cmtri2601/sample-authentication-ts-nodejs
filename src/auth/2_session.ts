import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import users from './data/user.json';

const sessionUrl = './data/session.txt';

function sessionAuthenticate(req: Request, res: Response, next: NextFunction) {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!users.includes(req.cookies.username)) {
    res.status(401).send(``);
    return;
  }
  next();
}

export default sessionAuthenticate;
