import { sql } from "./config/db.js";
import TryCatch from "./TryCatch.js";
import { redisClient } from "./utils/redisDB.js";
export const getAllAlbum = TryCatch(async (req, res) => {
    let albums;
    // redis implimented from here 
    const CACHE_EXPIRY = 1800;
    if (redisClient.isReady) {
        albums = await redisClient.get("albumss");
    }
    if (albums) {
        return res.json(JSON.parse(albums));
    }
    else {
        albums = await sql `SELECT * FROM albums`;
        if (redisClient.isReady) {
            await redisClient.set("album", JSON.stringify(albums), {
                EX: CACHE_EXPIRY,
            });
        }
    }
    return res.json(albums);
});
export const getAllSong = TryCatch(async (req, res) => {
    let songs;
    // redis implimented from here 
    const CACHE_EXPIRY = 1800;
    if (redisClient.isReady) {
        songs = await redisClient.get("songs");
    }
    if (songs) {
        return res.json(JSON.parse(songs));
    }
    else {
        songs = await sql `SELECT * FROM songs`;
        if (redisClient.isReady) {
            await redisClient.set("songs", JSON.stringify(songs), {
                EX: CACHE_EXPIRY,
            });
        }
    }
    res.json(songs);
});
export const getAllSongOfAlbum = TryCatch(async (req, res) => {
    const { id } = req.params;
    let album, songs;
    //redis impliment from here
    const CACHE_EXPIRY = 1800;
    if (redisClient.isReady) {
        const CACHE_DATA = await redisClient.get(`album_song_${id}`);
        if (CACHE_DATA) {
            return res.json(JSON.parse(CACHE_DATA));
        }
    }
    album = await sql `SELECT * FROM albums WHERE id = ${id}`;
    if (album.length === 0) {
        return res.status(404).json({
            message: "No album with this id"
        });
    }
    songs = await sql `SELECT * FROM songs WHERE album_id = ${id} `;
    const response = { songs, album: album[0] };
    if (redisClient.isReady) {
        await redisClient.set(`album_song_${id}`, JSON.stringify(response), {
            EX: CACHE_EXPIRY,
        });
    }
    res.json(response);
});
export const getSingleSong = TryCatch(async (req, res) => {
    const song = await sql `SELECT * FROM songs WHERE id = ${req.params.id}`;
    res.json(song[0]);
});
// export const getAllSongOfAlbum = TryCatch(async (req, res) => {
//     const { id } = req.params;
//     let album, songs;
//     album = await sql`SELECT * FROM albums WHERE id = ${id}`
//     if (album.length === 0) {
//         return res.status(404).json({
//             message: "No album with this id"
//         })
//     }
//     songs = await sql`SELECT * FROM songs WHERE album_id = ${id} `;
//     const response = { songs, album: album[0] };
//     res.json(response)
// })
//# sourceMappingURL=controller.js.map