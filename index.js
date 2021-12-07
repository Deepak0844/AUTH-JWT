import express from 'express';
import { authRouter} from './routes/authRoutes.js';
import { pizzaApp} from './routes/pizzaApp.js';
import {MongoClient} from "mongodb";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const MONGO_URL = process.env.MONGO_URL

  async function createConnections(){
  const client = new MongoClient(MONGO_URL);
  await client.connect();  //promise
  console.log("mongodb connected");
  return client;
}
export const client = await createConnections();

//routes
app.use("/",pizzaApp);
app.use("/",authRouter);//middleware

app.listen(PORT,()=>{ console.log("Server started", PORT) })