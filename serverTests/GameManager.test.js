import {getGame, getOverview, remove} from "../model/GameRepo.js";

const room = "MyRoomId"
const room2 = "MySECONDRoomId"

test('getOverview gets an epmty overview when there are no games', async () => {
    const overview = await getOverview()
    expect(overview).toStrictEqual([])
})


test('getOverview gets a created game', async () => {
    const game = getGame(room)
    const overview = await getOverview()
    expect(overview.length).toBe(1)
    expect(overview[0]).toStrictEqual(game.getOverview(room))

    remove(room)
})

test('remove removes a game ', async () => {
    getGame(room)
    remove(room)
    const overview = await getOverview()
    expect(overview).toStrictEqual([])
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

