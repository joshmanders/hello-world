import express from 'express';

const app = express();
const port = import.meta.env.PORT || 3000;

app.get('/', (_, res) => res.send('Hello, from Primcloud!'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
