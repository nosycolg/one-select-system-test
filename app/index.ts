require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { init } from './routes/routes';
import callbackMiddleware from './middlewares/callbackMiddleware';

const app = express();

async function start() {
    try {
        const allowedOrigins = [process.env.FRONTEND_ORIGIN];

        const options = {
            allowedOrigins: allowedOrigins,
            methods: 'GET, POST, PUT, DELETE',
            allowedHeaders: 'Content-Type, Authorization'
        };

        app.use(bodyParser.json());
        app.use(cors(options));
        app.use(callbackMiddleware);

        init(app);

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (err) {
        console.error(`[Server Error] - ${err}`);
    }
}

start();
module.exports = app;
