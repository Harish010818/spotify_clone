import dotenv from 'dotenv';
import redis from "redis";

dotenv.config();

export const redisClient = redis.createClient({
     password: process.env.REDIS_PASSWORD!,
     socket: {
        host: "redis-17357.crce182.ap-south-1-1.ec2.redns.redis-cloud.com",
        port: 17357 
     }   
});

redisClient.connect()
           .then(()=> console.log("Redis connected successfully!"))
           .catch((err) => console.error(err));
           