import express from 'express';
import bodyParser from 'body-parser';
import parcels from './routes/parcels';
import users from './routes/users';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/parcels', parcels);
app.use('/api/v1/users', users);

export default app;
