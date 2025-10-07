import express from "express";
import { getAllAlbum, getAllSong, getAllSongOfAlbum, getSingleSong } from "./controller.js";

const songRouter = express.Router();

songRouter.route("/album/all").get(getAllAlbum);
songRouter.route("/song/all").get(getAllSong);
songRouter.route("/album/:id").get(getAllSongOfAlbum);
songRouter.route("/song/:id").get(getSingleSong);

export default songRouter;