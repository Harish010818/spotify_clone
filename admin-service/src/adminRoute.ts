import express from "express";
import uploadFile, { isAuthenticated } from "./middleware.js";
import { addAlbum, addSong, addThumbnail, deleteAlbum, deleteSong } from "./controller.js";

const adminRouter = express.Router();

adminRouter.route("/album/new").post(isAuthenticated, uploadFile, addAlbum);
adminRouter.route("/album/:id").delete(isAuthenticated, deleteAlbum);

adminRouter.route("/song/new").post(isAuthenticated, uploadFile, addSong);
adminRouter.route("/song/:id").post(isAuthenticated, uploadFile, addThumbnail);
adminRouter.route("/song/:id").delete(isAuthenticated, deleteSong);

export default adminRouter;