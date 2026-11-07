import app from "./app.js";

const PORT = process.env.PORT;

if (!PORT) {
    throw new Error('PORT is not defined in the enviroment variables');
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

