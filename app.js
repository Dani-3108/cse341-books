//import statements
import express from 'express';
//import { getDb } from './src/db/connect.js';

//variables
const app = express();

//use and call of express
app.use(express.json());

//Route that verifies the server is running
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Server is running' });
})

//Routes for trails (test)
/*app.get('/trails', async (req, res) => {
    try {
        const trails = await getDb()
            .collection('trails')
            .find({})
            .toArray()
        return res.status(200).json(trails);
    }
    catch (error) {
        console.error('Failed to retrieve trails:', error.message);
        return res.status(500).json({ message: 'Failed to retrieve trails' });
    }
});*/

export default app;