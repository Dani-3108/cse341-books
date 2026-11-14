//import statements
import express from 'express';
import router from './src/router.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' with { type: 'json' };


//variables
const app = express();
 
//Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//use and call of express
app.use(express.json());

app.use(router);

//Route that verifies the server is running
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Server is running' });
})

export default app;