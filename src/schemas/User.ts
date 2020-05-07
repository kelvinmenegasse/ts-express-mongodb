import { Schema, Document, model } from "mongoose";

interface UserInterface extends Document {
    name?: string
    email?: string
    password?: string
    date?: Date
}

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            min: 6,
            max: 255,
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 255,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024
        },
        date: {
            type: Date,
            default: Date.now
        },
    }, {
        timestamps: true,
    }
)

export default model<UserInterface>('User', UserSchema);