import cors from 'cors';
import express from 'express';

import router from './routes/zendesk';

const app: express.Application = express();

const options: cors.CorsOptions = {
  origin: '*'
};

app.use(express.json());
app.use(cors(options));
app.use('/zendesk', router)

app.listen('8080', () => {
  console.log('listening on http://localhost:8080');
});

