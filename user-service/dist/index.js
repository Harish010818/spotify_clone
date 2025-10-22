import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from "cors";
import userRoute from './userRoute.js';
import mongoose from 'mongoose';
const app = express();
dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connnect successfully");
    }
    catch (err) {
        console.log(err);
    }
};
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use("/api/v1/user", userRoute);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connectDB();
    console.log(`User service is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map