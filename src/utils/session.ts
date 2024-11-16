import fs from 'fs/promises';
const sessionUrl = './src/data/session.json';

const checkSection = async (value: string): Promise<boolean> => {
  const data = await fs.readFile(sessionUrl, 'utf-8');
  const content = data ? (JSON.parse(data) as string[]) : [];
  return content.includes(value);
};

const addSection = async (value: string) => {
  const data = await fs.readFile(sessionUrl, 'utf-8');

  if (!data) {
    await fs.writeFile(sessionUrl, JSON.stringify([value]), 'utf-8');
  } else {
    const content = JSON.parse(data) as string[];
    content.push(value);
    await fs.writeFile(sessionUrl, JSON.stringify(content), 'utf-8');
  }
};

const removeSection = async (value: string) => {
  const data = await fs.readFile(sessionUrl, 'utf-8');
  const content = data ? (JSON.parse(data) as string[]) : [];

  content.filter((session) => session !== value);
  await fs.writeFile(sessionUrl, JSON.stringify(content), 'utf-8');
};

export { checkSection, addSection, removeSection };
