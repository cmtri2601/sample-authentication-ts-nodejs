import { Request, Response, NextFunction } from 'express';

function basicAuthenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  // without cookie-parser, cookie is just a string
  const cookies = req.headers.cookie;

  console.log('cookies: ', cookies);
  console.log('req.headers.authorization: ', authHeader); // Basic encoded user password

  if (authHeader) {
    // Giải mã chuỗi base64
    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = auth[0];
    const password = auth[1];
    console.log('username: ', username, ', password: ', password);

    if (username === 'username' && password === 'password') {
      return next();
    }
  }

  // WWW-Authenticate sẽ giúp trình duyệt hiển thị popup đăng nhập
  // Ở đây, Basic chỉ ra rằng máy chủ yêu cầu xác thực Basic Authentication.
  // realm (optional) là một thuộc tính tùy chọn mô tả phạm vi bảo mật của tài nguyên được yêu cầu.
  // Giá trị cái realm này chỉ để mô tả thôi, không có cũng được
  res.setHeader('WWW-Authenticate', 'Basic realm="example"');
  res.status(401).send('Authentication required\n');
}

export default basicAuthenticate;
