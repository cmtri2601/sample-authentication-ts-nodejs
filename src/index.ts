import express from 'express';
import { sum } from '~/utils/calc';
const app = express();

app.get('/', async (req, res) => {
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
