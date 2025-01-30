import express from "express";
dotenv.config()
import dotenv from "dotenv"
import connectDB from "./src/Db/index.js";
import todoRoutes from "./src/routs/todos.routs.js"
import cors from "cors"
const app = express()

app.use (express.json())

app.use(cors())

// routes

app.use('/api/v1', todoRoutes)

connectDB()
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
  });
})
.catch((err) => {
  console.log("MONGO DB connection failed !!! ", err);
});


