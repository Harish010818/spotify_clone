import { User } from "./model.js";
import TryCatch from "./TryCatch.js";
import jwt from "jsonwebtoken";
import bcrypt from  "bcrypt";
import type { AuthRequest } from "./middleware.js";


export const register = TryCatch(async (req, res) => {

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
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
            username,
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


export const myProfile = TryCatch( async(req: AuthRequest, res) => {
      const userData = req.user;
      return res.status(200).json({
             success : true,
             userData
      })  
})





