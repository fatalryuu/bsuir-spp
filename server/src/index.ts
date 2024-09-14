import app from './app';

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.info(`[server]: Server is running at ${port} port`);
});
