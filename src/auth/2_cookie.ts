import { Request, Response, NextFunction } from 'express';
import users from './data/user.json';

function cookieAuthenticate(req: Request, res: Response, next: NextFunction) {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  if (!users.includes(req.cookies.username)) {
    res.status(401).send(`<div>Login to continue <a href='/login'>login</a></div>`);
    return;
  }
  next();
}

export default cookieAuthenticate;

/*
Restful api
- credentials: determines whether or not the browser sends credentials with the request, as well as whether any Set-Cookie response headers are respected 
- by default mode: cors (prevent request cross site) => set no-cors to mimic csrf

--simple request--
fetch('http://localhost:3000/status', {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  method: 'POST',
  credentials: 'include',
  mode: 'no-cors', //
  body: "content=Hacker đã đăng bài"
})

fetch('http://localhost:3000/post')

--pre-light request--
fetch('http://localhost:3000/status', {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-PINGOTHER": "pingpong",
  },
  method: 'POST',
  credentials: 'include',
  body: "content=Hacker đã đăng bài"
})

*/
