import Game from "../Game.js";
import {USER} from "../client/src/common/Types.mjs";
import GamePhase from "../client/src/common/GamePhase.mjs";


let tt;
let run = -1;
let users
let rooms

beforeEach(() => {
    run++
    tt = new Game()
    users = [{...USER.getDto(), userId: `user1_${run}`, socketId: `socket1_${run}`, userName: `name1_${run}`},
        {...USER.getDto(), userId: `user2_${run}`, socketId: `socket2_${run}`, userName: `name2_${run}`}]
    rooms = [`room1_${run}`, `room2_${run}`]


});

test("new game is not dead", () => {
    expect(tt.isDead()).toBe(false)

})

test("started game is not dead", () => {
    tt.start(users)
    expect(tt.isDead()).toBe(false)

})

test("Bad Test that tests a lot", () => {
    let overview = tt.getOverview(rooms[0])
    expect(overview.players).toStrictEqual([])
    expect(overview.roomName).toBe(rooms[0])
    expect(overview.phase).toBe(GamePhase.INITIAL.phase)

    tt.start(users.slice(0,2))
    overview = tt.getOverview(rooms[0])

    expect(overview.players.sort()).toStrictEqual([users[0].userName, users[1].userName].sort())
    expect(overview.roomName).toBe(rooms[0])
    expect(overview.phase).toBe(GamePhase.WAITING_QUESTION.phase)


})