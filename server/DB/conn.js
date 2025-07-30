import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()


const DB_URI = process.env.MONGO_URI;

mongoose
  .connect(DB_URI, {})
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(err));
