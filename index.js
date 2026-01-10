import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
const greeting = process.env.GREETING || 'Hello';

app.get('/', (_, res) => {
  res.send(`${greeting}, from Primcloud!`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
