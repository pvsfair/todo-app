import app from './app.js';

const port = process.env.PORT || 3333;

app.listen(port, (err) => {
  if (err) {
    console.error(`Error trying to listen on port ${port}`);
    console.error(err);
  }
  console.log(`Listening on port ${port}...`);
});
