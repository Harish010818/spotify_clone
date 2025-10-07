import express from 'express';
import dotenv from  'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from "cors";
import userRoute from './userRoute.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors({origin : process.env.FRONTEND_URL, credentials : true}))


app.use("/api/v1/user", userRoute);

const PORT = process.env.PORT || 8000;

app.listen(3000, () => {
    console.log(`User service is running on port ${PORT}`);
})