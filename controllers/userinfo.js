import UserInfo from "../model/UserInfo.js";

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