import {getGame} from "./GameRepo.js";

const _roomMemberships = [];

// joins the user to the specific chatroom and drops out of others
export function addRoomMembership(user, room) {

    if (_roomMemberships.find((roomMembership) => roomMembership.user.userId === user.userId)) {
        removeRoomMembership(user.socketId)
    }

    _roomMemberships.push({user, room});
}

// Gets a particular user id to return the current user
export function getCurrentRoomMembership(socketId) {
    const currentRoomMembership = _roomMemberships.find((roomMembership) => roomMembership.user.socketId === socketId)
    if (currentRoomMembership){
        return currentRoomMembership
    } else {
        throw new Error("not in a room")
    }

}

// called when the user leaves the chat and its user object deleted from array
export function removeRoomMembership(socketId) {
    const index = _roomMemberships.findIndex((roomMembership) => roomMembership.user.socketId === socketId);

    if (index !== -1) {
        return _roomMemberships.splice(index, 1)[0];
    } else {
        console.log(`Could not remove ${socketId}`)
    }
}

export function getRoomMemberships(room) {
    return _roomMemberships.filter(roomMembership => roomMembership.room === room)
}

/**
 * Returns all Rooms
 * @returns {(string)[]}
 * from https://stackoverflow.com/a/35092559/2828611
 */
function getAllRooms() {
    return [...new Set(_roomMemberships.map(roomMembership => roomMembership.room))]
}

export function getOverview(_, res) {
    const overview = []
    for (const room of getAllRooms()) {
        const game = getGame(room)
        const current = game.getOverview(room)
        const viewers = getRoomMemberships(room).map(roomMembersip => roomMembersip.user.userName)
        current.viewers = viewers.filter(viewer => !current.players.includes(viewer))
        overview.push(current)
    }

    if(res){
        res.send(overview);
    }

    return overview
}

export function removeAllAndEverything() {
    _roomMemberships.splice(0, _roomMemberships.length)
}