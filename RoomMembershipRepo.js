const roomMemberships = [];

// joins the user to the specific chatroom
export function addRoomMembership(user, room) {

    roomMemberships.push({user, room});
}

// Gets a particular user id to return the current user
export function getCurrentRoomMembership(userId) {
    return roomMemberships.find((roomMembership) => roomMembership.user.userId === userId)
}

// called when the user leaves the chat and its user object deleted from array
export function removeRoomMembership(userId) {
    const index = roomMemberships.findIndex((roomMembership) => roomMembership.user.userId === userId);

    if (index !== -1) {
        return roomMemberships.splice(index, 1)[0];
    }
}

export function getRoomMembers(room){
    return roomMemberships.filter(roomMembership => roomMembership.room === room)
}