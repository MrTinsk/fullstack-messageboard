import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";
import messageRoutes from "./routes/message.js"

const app = express();



dotenv.config();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// specify your middleware here
app.use(express.json());


// specify your routes here
app.use("/api/user",userRoutes)
app.use("/api/message", messageRoutes)

console.log("Connecting to database. Put the kettle on while you wait... 🫖");
console.log(process.env.DB_HOST)
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Database connected! 😍☕"))
  .catch((error) => console.log(error, "Database did not connect! ☹️❌"));


 

app.listen(3001, () => console.log("The server is listening... 🐒"));
