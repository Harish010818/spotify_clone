import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js';
import adminRoutes from './adminRoute.js';
// import cors from "cors";
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({extended : true}));
// app.use(cookieParser());
// app.use(cors({origin : process.env.FRONTEND_URL, credentials : true}))
const initDB = async () => {
    try {
        await sql ` 
              CREATE TABLE IF NOT EXISTS albums(
               id SERIAL PRIMARY KEY,
               title VARCHAR(255) NOT NULL,
               description VARCHAR(255) NOT NULL,
               thumbnail  VARCHAR(255) NOT NULL,
               cratedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;
        await sql ` 
              CREATE TABLE IF NOT EXISTS songs(
               id SERIAL PRIMARY KEY,
               title VARCHAR(255) NOT NULL,
               description VARCHAR(255) NOT NULL,
               thumbnail  VARCHAR(255),
               audio VARCHAR(255) NOT NULL,
               album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE,
               cratedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;
        console.log("Database initialized successfully...");
    }
    catch (err) {
        console.log("Error in initializing database", err);
    }
};
app.use("api/v1/admin", adminRoutes);
const PORT = process.env.PORT || 6000;
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`User service is running on port ${PORT}`);
    });
});
//# sourceMappingURL=index.js.map