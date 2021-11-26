import {getGame, getOverview, remove} from "./GameManager.mjs";

const room = "MyRoomId"
const room2 = "MySECONDRoomId"

test('getOverview gets an epmty overview when there are no games', () => {
    const overview = getOverview()
    expect(overview).toStrictEqual([])
})


test('getOverview gets a created game', () => {
    const game = getGame(room)
    const overview = getOverview()
    expect(overview.length).toBe(1)
    expect(overview[0]).toStrictEqual(game.getOverview(room))

    remove(room)
})

test('remove removes a game ', () => {
    getGame(room)
    remove(room)
    expect(getOverview()).toStrictEqual([])
})

test('getGame gets the same Game', () =>  {
    const game = getGame(room)

    game["make sure, this is differentiable"] = true //

    const game2 = getGame(room2)
    expect(game).not.toEqual(game2)
    expect(getGame(room)).toStrictEqual(game)

    //teardown
    remove(game)
    remove(game2)
})

