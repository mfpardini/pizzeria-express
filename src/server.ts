import express from 'express';
import { connectToDb } from './database/data-source';
import router from './routes';

const appStart = async () => {
    await connectToDb();
    
    const app = express();

    app.use(express.json());
    app.use('/api', router);
    
    app.listen(3333, () => console.log('server running on port 3333'));    
}

appStart();