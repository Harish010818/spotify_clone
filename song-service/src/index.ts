import express from 'express';
import dotenv from 'dotenv';
import songRoute from './songRoute.js';
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({origin : process.env.FRONTEND_URL, credentials : true}))

const PORT = process.env.PORT || 6000;

app.use("api/v1", songRoute);

app.listen(PORT, () => {
        console.log(`User service is running on port ${PORT}`);
})
