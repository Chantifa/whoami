const roomMemberships = [];

// joins the user to the specific chatroom
function addRoomMembership(user, room) {

    roomMemberships.push({user, room});
}

// Gets a particular user id to return the current user
function getCurrentRoomMembership(userId) {
    return roomMemberships.find((roomMembership) => roomMembership.user.userId === userId)
}

// called when the user leaves the chat and its user object deleted from array
function removeRoomMembership(userId) {
    const index = roomMemberships.findIndex((roomMembership) => roomMembership.user.userId === userId);

    if (index !== -1) {
        return roomMemberships.splice(index, 1)[0];
    }
}

module.exports = {addRoomMembership, getCurrentRoomMembership, removeRoomMembership}
