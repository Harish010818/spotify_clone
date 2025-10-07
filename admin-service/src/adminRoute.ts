import express from "express";
import uploadFile, { isAuthenticated } from "./middleware.js";
import { addAlbum, addSong, addThumbnail, deleteAlbum, deleteSong } from "./Controller.js";

const adminRouter = express.Router();

adminRouter.route("/album/new").post(isAuthenticated, uploadFile, addAlbum);
adminRouter.route("/song/new").post(isAuthenticated, uploadFile, addSong);
adminRouter.route("/song/:id").post(isAuthenticated, uploadFile, addThumbnail);
adminRouter.route("/album/:id").post(isAuthenticated, deleteAlbum);
adminRouter.route("/song/:id").post(isAuthenticated, deleteSong);

export default adminRouter;