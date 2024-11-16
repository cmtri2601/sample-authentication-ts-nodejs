import { Request, Response, NextFunction } from 'express';
import { checkSection } from '~/utils/session';

async function sessionAuthenticate(req: Request, res: Response, next: NextFunction) {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!(await checkSection(req.cookies.session))) {
    res.status(401).send(`<div>Login to continue <a href='/login'>login</a></div>`);
    return;
  }
  console.log('session iss checked');
  next();
}

export default sessionAuthenticate;
