import 'dotenv/config';
import express from 'express';
import { initScheduledJobs } from './scheduledFunctions.js';
import powerRoutes from './routes/power.js';
import authenticationMiddleware from './middlewares/authentication.js';

const app = express();

app.use(authenticationMiddleware);

app.get('/', async (req, res) => {
    res.json({status: 'success'});
});

app.use('/power', powerRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

initScheduledJobs();