/**
 * Simple express
 */

import express from 'express';
import swaggerUi from 'swagger-ui-express';
// This is the actual library, will normally be 'postman-to-swagger`
import postmanToSwagger from '../../lib';

const app = express();

// Example health router
const health = express.Router();
health.get('/', (req, res) => res.json({ status: 'alive' }));

// Here is your swagger router
const swagger = express.Router();
const swaggerJSON = postmanToSwagger(`${__dirname}/mockCollection.json`);
swagger.get('/swagger', swaggerUi.setup(swaggerJSON));

app.use('/health', health);
// Docs will be served on http://localhost:3001/docs/swagger
app.use('/docs', swagger);

const { PORT = 3001 } = process.env;
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Docs served on http://localhost:${PORT}/docs/swagger`);
});
