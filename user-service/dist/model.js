import mongoose, { Document, Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    },
    playlist: [
        {
            type: String,
            required: true
        }
    ]
}, { timestamps: true });
export const User = mongoose.model("User", userSchema);
//# sourceMappingURL=model.js.map