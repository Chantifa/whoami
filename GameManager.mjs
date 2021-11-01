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
        const entry = {}

        entry.room = key
        if(value._phase) {
            entry.phase = value._phase.phase
        }
        if(value._players){
            entry.players = []
            value._players.forEach(p => entry.players.push(p.userName))
        }

        overview.push(entry)
    }
    return overview
}