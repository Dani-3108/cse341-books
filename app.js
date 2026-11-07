//import statements
import express from 'express';
import router from './src/router.js';

//variables
const app = express();

//use and call of express
app.use(express.json());

app.use(router);

//Route that verifies the server is running
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Server is running' });
})

export default app;