require('dotenv').config();

const app = require('./app');
const connectDB = require("./database/db");


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log("MONGO DB CONNECTION FAILED IN INDEX.JS ->", err);
}); 