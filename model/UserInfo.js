import mongoose from "mongoose";

const userInfo = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    gamesStarted: {
        type: Number,
        required: true,
        default: 0
    },
    gamesFinished: {
        type: Number,
        required: true,
        default: 0
    },
    gamesWon: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true,
    collection: 'userInfo'

})

export default mongoose.model("UserInfo", userInfo);

