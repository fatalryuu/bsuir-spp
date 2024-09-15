import app from './app';

import './services/ws';

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.info(`[server]: Server is running at ${port} port`);
});
