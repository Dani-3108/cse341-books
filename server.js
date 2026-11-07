//import statements
import app from "./app.js";
import { connectToDb } from "./src/db/connect.js";

//variables
const PORT = process.env.PORT;

// if statement to handle the error if the port variable is not defined in .env
if (!PORT) {
    throw new Error('PORT is not defined in the environment variables');
}

// connects to the database, starts the server, and stops the app if startup fails
const startServer = async () => {

    try {
        await connectToDb();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    }
    catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();

