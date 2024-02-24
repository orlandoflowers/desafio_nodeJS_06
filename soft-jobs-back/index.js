import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/users.route.js';

const app = express();
config();

app.use(express.json());
app.use(cors());

// morgan to log requests
app.use(morgan('dev'));

app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
