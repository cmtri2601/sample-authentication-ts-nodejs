import express from 'express';
import jwt from 'jsonwebtoken';
import jwtAuthenticate from '~/auth/3_jwt';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const tokenSecretKey = 'tokenSecretKey';

const users = [
  {
    username: 'user1',
    password: '1'
  },
  {
    username: 'user2',
    password: '2'
  }
];

// home page
app.get('/', async (req, res) => {
  res.send(`
    <html>
    <h2>This is home page</h2>
    <a href="/login">Login</a>
    </html>
    `);
});

// login page
app.get('/login', async (req, res) => {
  res.send(`
    <html>
    <h2>This is login page</h2>
    <form action="login" method="post">
      <label>Username</label>
      <input type="text" name="username"></input>
      <label>Password</label>
      <input type="password" name="password"></input>
      <button type="submit">Login</button>
    </form>
    </html>
    `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    res.sendStatus(401);
    return;
  }

  const accessToken = jwt.sign({ username: user?.username }, tokenSecretKey, { expiresIn: '1h' });
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 5 * 60 * 1000
  });
  res.send(`
    <html>
    Login successfully
    <a href="/protected">See web content</a>
    </html>
    `);
});

app.use(jwtAuthenticate);

app.get('/protected', (req, res) => {
  res.json({ message: 'You can view protected content' });
});

app.listen(3000, () => {
  console.log('JWT server is running on port 3000');
});
