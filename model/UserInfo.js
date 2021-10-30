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
    gamesFinished: {
        type: Number,
        required: true
    },
    gamesWon: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    collection: 'userInfo'

})

export default mongoose.model("UserInfo", userInfo);