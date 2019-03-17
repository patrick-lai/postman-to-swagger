/**
 * Simple express
 */

import express from 'express';

const app = express();

// Example health router
const health = express.Router();
health.get('/', (req, res) => res.json({ status: 'alive' }));

// Here is your swagger router
const swagger = express.Router();

app.use('/health', health);
app.use('/swagger', swagger);

const server = app.listen(process.env.PORT || 3001, () => {
  // eslint-disable-next-line
  console.log(`Listening on http://localhost:${server.address().port}`);
});
