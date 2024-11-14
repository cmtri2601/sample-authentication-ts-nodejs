import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { sum } from '~/utils/calc';
// import basicAuthenticate from '~/auth/1_basic';
import cookieAuthenticate from '~/auth/2_cookie';
const app = express();

// fake db
const db = ['This is 1st post', 'This is 2nd post', 'This is 3rd post'];

// setup cor
const corsOptions = {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3001'], //
  methods: ['GET', 'POST'],
  credentials: true,
  maxAge: 3600
};
app.use(cors(corsOptions));

// parse re cookie => req.cookies
app.use(cookieParser());

// parse req body
app.use(express.urlencoded({ extended: false }));

// login -- add login before authentication
app.get('/login', (req, res) => {
  // to test csrf by FETCH, sameSite: 'none' && secure: true
  res.cookie('username', 'John Doe', {
    httpOnly: true,
    // sameSite: 'lax', // default is 'lax',
    // secure: true, // if sameSite = none, we need set secure = true to make browser accept
    maxAge: 5 * 60 * 1000
  });
  res.send(`
    <html>
      <div>You are in!</div>
      <div>Return to <a href="/">home page</a></div>
    </html>
    `);
});

// authentication middleware
app.use(cookieAuthenticate);

// home page
app.get('/', async (req, res) => {
  res.send(`
    <html>
    <h2>This is home page</h2>
    <form action="status" method="post">
      <textarea type="text" placeholder="What are u thinking?" name="content"></textarea>
      <button type="submit">Post</button>
    </form>
    <br>
    <a href="/post">See post</a>
    </html>
    `);
});

// home page
app.post('/status', async (req, res) => {
  const { content } = req.body;
  console.log(req.body);
  console.log('cookie', req.cookies);
  db.push(content);
  res.send(`<div>Post successfully, go to <a href='/post'>post page</a> to see post</div>`);
});

// post
app.get('/post', async (req, res) => {
  res.send(`
    <html>
    <h3>List posts: </h3>
    <ul>
    ${db.map((post) => `<li>${post}</li>\n`)}
    </ul>
    <a href="/">Home page</a>
    </html>
    `);
});

// test chalk
app.get('/test-chalk', async (req, res) => {
  // use dynamic import for lib without js (write by ts)
  const chalk = (await import('chalk')).default;

  console.log(
    chalk.yellow(
      'I am a yellow line ' +
        chalk.blue.underline.bold('with a blue substring') +
        ' that becomes yellow again!\n' +
        chalk.dim.red('Result ', sum(1, 2))
    )
  );

  res.send('Hello World');
});

app.listen(3000);
