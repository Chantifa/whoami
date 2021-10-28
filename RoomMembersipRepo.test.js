import {addRoomMembership, getCurrentRoomMembership} from "./RoomMembershipRepo";
import {USER} from "./client/src/common/Types.mjs";

const user = USER.getDto()
const room = "room1234"

test('room management works', () => {
    addRoomMembership(user, room)
    expect(getCurrentRoomMembership(user.userId)).toStrictEqual({room, user})
})