import httpErrors from 'http-errors';
import express from 'express';
import bodyParser from 'body-parser';
import parcels from './routes/parcels';
import users from './routes/users';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/parcels', parcels);
app.use('/api/v1/users', users);
app.use((req, res, next)=>{
    next(httpErrors(404));
});

app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
        'status':err.status,
        'message':err.message
    });
    next();
})

export default app;
