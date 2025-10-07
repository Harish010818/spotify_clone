import type { Request } from "express";
import TryCatch from "./TryCatch.js";
import getBuffer from "./config/dataUri.js";
import cloudinary from "./utils/cloudinaryConfig.js";
import { sql } from "./config/db.js";
import { redisClient } from "./utils/redisDB.js";

// Step 1: Extend Express Request to hold our custom user data
interface AuthRequest extends Request {
    user?: {
        _id: string,
        role: string
    };
}

// adding album 
export const addAlbum = TryCatch(async (req: AuthRequest, res) => {

    if (req.user?.role !== "admin") {
        return res.status(401).json(
            { message: "Only admin can add albums" }
        )
    }

    const { title, description } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            message: "No file attached to upload"
        })
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
        return res.status(400).json({
            message: "Failed to generate file buffer"
        })
    }

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "spotify/albums"
    })

    const result = await sql`
                      INSERT INTO albums
                      (title, description, thumbnail)
                      VALUES(${title}, ${description}, ${cloud.secure_url} )
                      RETURNING *  
                    `;
    // cache
    if (redisClient.isReady) {
        await redisClient.del("albums")
    }

    res.status(200).json({
        message: "Album added successfully",
        album: result[0]
    })
})


// adding song to the existing album
export const addSong = TryCatch(async (req: AuthRequest, res) => {
    if (req.user?.role !== "admin") {
        return res.status(401).json(
            { message: "Only admin can add songs" }
        )
    }

    const { title, description, album } = req.body;
    const isalbum = await sql`SELECT * FROM albums WHERE id = ${album}`

    if (isalbum.length === 0) {
        return res.status(404).json({
            message: "No album found with this id"
        })
    }

    const file = req.file;

    if (!file) {
        return res.status(400).json({
            message: "No file attached to upload"
        })
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
        return res.status(400).json({
            message: "Failed to generate file buffer"
        })
    }

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "spotify/songs",
        resource_type: "video"
    })

    const result = await sql`
                          INSERT INTO songs
                          (title, description, audio, album_id)
                          VALUES(${title}, ${description}, ${cloud.secure_url}, ${album})
                          RETURNING *
                        `
    //cache 
    if (redisClient.isReady) {
        await redisClient.del("songs")
    }

    res.status(200).json({
        message: "Song added successfully",
        Song: result[0]
    })


    return;
})


// adding thumbnail to existing album
export const addThumbnail = TryCatch(async (req: AuthRequest, res) => {
    if (req.user?.role !== "admin") {
        return res.status(401).json(
            { message: "Only admin can add thumnails" }
        )
    }

    const song = await sql`SELECT * FROM albums WHERE id = ${req.params.id}`

    if (song.length === 0) {
        return res.status(404).json({
            message: "No song found with this id"
        })
    }

    const file = req.file;

    if (!file) {
        return res.status(400).json({
            message: "No file attached to upload"
        })
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer || !fileBuffer.content) {
        return res.status(400).json({
            message: "Failed to generate file buffer"
        })
    }

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "spotify/thumbnails"
    });

    const result = await sql`
                        UPDATE albums
                        SET thumbnail = ${cloud.secure_url}
                        WHERE id = ${req.params.id}
                        RETURNING *  
                        `
    // cache
    if (redisClient.isReady) {
        await redisClient.del("songs")
    }

    res.status(200).json({
        message: "Thumbnail added successfully",
        song: result[0]
    })

})



export const deleteAlbum = TryCatch(async (req: AuthRequest, res) => {
    if (req.user?.role !== "admin") {
        return res.status(401).json(
            { message: "You are not admin" }
        )
    }

    const { id } = req.params;

    const isalbum = await sql`SELECT * FROM albums WHERE id = ${id}`

    if (isalbum.length === 0) {
        return res.status(404).json({
            message: "No album found with this id"
        })
    }

    await sql`DELETE FROM songs WHERE album_id=${id}`;
    await sql`DELETE FROM albums WHERE id=${id}`;

    //cache
    if (redisClient.isReady) {
        await redisClient.del("albums");
        await redisClient.del("songs");
    }

    res.status(200).json({
        message: "Album deleted successfully"
    })
})



export const deleteSong = TryCatch(async (req: AuthRequest, res) => {
    if (req.user?.role !== "admin") {
        return res.status(401).json(
            { message: "You are not admin" }
        )
    }

    const { id } = req.params;

    await sql`DELETE FROM songs WHERE album_id=${id}`;

    // cache
    if (redisClient.isReady) {
        await redisClient.del("songs");
    }

    res.status(200).json({
        message: "Song deleted successfully"
    })
})

