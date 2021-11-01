import Game from "./Game.js";

const games = {}

/**
 *
 * @param room
 * @returns {Game}
 */
export function getGame(room) {
    if (!games[room]) {
        games[room] = new Game()
    }
    return games[room]
}

export function getOverview(){
    const overview = []
    for (const [key, value] of Object.entries(games)) {


        overview.push(value.getOverview(key))
    }
    return overview
}