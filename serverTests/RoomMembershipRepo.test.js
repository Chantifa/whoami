import {
    addRoomMembership,
    getCurrentRoomMembership, getRoomMemberships,
    removeAllAndEverything,
    removeRoomMembership
} from "../RoomMembershipRepo.js";
import {USER} from "../client/src/common/Types.mjs";

const user = USER.getDto()
const room = "room1234"

beforeEach(() => {
    removeAllAndEverything();
});

test('room add and get works', () => {
    addRoomMembership(user, room)
    expect(getCurrentRoomMembership(user.socketId)).toStrictEqual({room, user})
})

test('getCurrent throws if none',  () => {
    const getFromEmpty = () => {getCurrentRoomMembership(user.socketId)}

    expect(getFromEmpty).toThrow(Error)
})

test('remove works',  () => {
    addRoomMembership(user,room)
    const removed = removeRoomMembership(user.socketId)
    expect(removed).toStrictEqual({room, user})

    const getFromEmpty = () => {getCurrentRoomMembership(user.socketId)}

    expect(getFromEmpty).toThrow(Error)
})

test('remove nonexistent doesn\'t throw', () => {
    const get = () => removeRoomMembership(user.socketId)
    expect(get).not.toThrow(Error)
})

test('can get all from room',  () => {
    addRoomMembership(user,room)
    expect(getRoomMemberships(room)).toContainEqual({room, user})
})