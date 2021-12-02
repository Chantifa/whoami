import UserInfo from "./UserInfo.js";

export async function gameStarted(users) {
    const promises = []
    for (const user of users) {
        const query = {'userId': user.userId}
        promises.push(UserInfo.findOneAndUpdate(query, {$inc: {gamesStarted: 1}, username: user.userName}, {upsert: true}).exec())
    }

    return Promise.all(promises)
}

export async function gameFinished(users) {
    const promises = []
    for (const user of users) {
        const query = {'userId': user.userId}
        promises.push(UserInfo.findOneAndUpdate(query, {$inc: {gamesFinished: 1}, username: user.userName}, {upsert: true}).exec())
    }

    return Promise.all(promises)
}

export async function gameWon(user) {
    const query = {'userId': user.userId}
    return UserInfo.findOneAndUpdate(query, {$inc: {gamesWon: 1}, username: user.userName}, {upsert: true}).exec()
}

export default {gameStarted, gameFinished, gameWon}

export async function getRanking(req, res){
    UserInfo.find({}, ["username", "userId", "gamesStarted", "gamesFinished", "gamesWon"])
        .sort({"gamesWon": -1}).limit(10)
        .exec()
        .then(highscore => {
            if (!highscore) {
                res.status(404).json({highscore: "Not found"})
            } else {
                res.status(200).json(highscore)
            }
        })
        .catch(error => {
            console.log(error, error.message)
            res.status(500)
        })
}

export async function getUserInfo(req, res){
    const userId = req.params.userId


    UserInfo.findOne({'userId': userId})
        .then(userInfo => {
            if (!userInfo) {
                res.status(404).json({userInfo: "Not found"})
            } else {
                res.status(200).json(userInfo)
            }
        })
        .catch(error => {
            console.log(error, error.message)
            res.status(500)
        })
}