require("dotenv").config();

const app = require("./app");
const connectDB = require("./database/db");
const { startSchedule } = require("./utils/Schedule");

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
    startSchedule();
  })
  .catch((err) => {
    console.log("MONGO DB CONNECTION FAILED IN INDEX.JS ->", err);
  });
