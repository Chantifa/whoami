const roomMemberships = [];

// joins the user to the specific chatroom
export function addRoomMembership(user, room) {

    roomMemberships.push({user, room});
}

// Gets a particular user id to return the current user
export function getCurrentRoomMembership(socketId) {
    const currentRoomMembership = roomMemberships.find((roomMembership) => roomMembership.user.socketId === socketId)
    if (currentRoomMembership){
        return currentRoomMembership
    } else {
        throw new Error("not in a room")
    }

}

// called when the user leaves the chat and its user object deleted from array
export function removeRoomMembership(socketId) {
    const index = roomMemberships.findIndex((roomMembership) => roomMembership.user.socketId === socketId);

    if (index !== -1) {
        return roomMemberships.splice(index, 1)[0];
    }
}

export function getRoomMemberships(room){
    return roomMemberships.filter(roomMembership => roomMembership.room === room)
}