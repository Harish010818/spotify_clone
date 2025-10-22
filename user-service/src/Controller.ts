import { User } from "./model.js";
import TryCatch from "./TryCatch.js";
import jwt from "jsonwebtoken";
import bcrypt from  "bcrypt";
import type { AuthRequest } from "./middleware.js";


export const register = TryCatch(async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All field are required"
        })
    }

    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({
            message: "The user is already exist with this username"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await User.create(
        {
            name,
            email,
            password: hashedPassword,

        }
    )

    return res.status(200).json({
        success: true,
        message: "Account created successfully",
        userData
    })
})

export const login = TryCatch(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "All field are required"
        })
    }

    const user = await User.findOne({ email });

    let isPswdMatch = false;

    if (user) isPswdMatch = await bcrypt.compare(password, user.password);

    if (!user || !isPswdMatch) {
        return res.status(400).json({
            message: "Incorrect email or password"
        })
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY as string, { expiresIn: '1d' });

    return res.status(200)
        .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        })
        .json({
            message: "Login successfully"
        })
})

export const logout = TryCatch( async(_: AuthRequest, res) => {

    return res.status(200)
            .cookie("token", " ", { maxAge: 0})
            .json({
                message: "logged out successfully"
            })
})


export const myProfile = TryCatch( async(req: AuthRequest, res) => {
    const userData = req.user;
      return res.status(200).json({
             success : true,
             userData
    })  
})


export const addToPlaylist = TryCatch(
  async (req: AuthRequest, res) => {
    const userId = req.user?._id;

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        message: "NO user with this id",
      });
      return;
    }

    if (user?.playlist.includes(req.params.id as string)) {
      const index = user.playlist.indexOf(req.params.id as string);

      user.playlist.splice(index, 1);

      await user.save();

      res.json({
        message: " Removed from playlist",
      });
      return;
    }

    user.playlist.push(req.params.id as string);

    await user.save();

    res.json({
      message: "Added to PlayList",
    });
  }
);