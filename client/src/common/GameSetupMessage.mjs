/**
 * The message sent from server to client on starting a game
 */
export default class GameSetupMessage { //TODO: add start time to enable replays and hot joining
    static id = "GAME_SETUP"
    mPersonaMapInPlayOrder = new Map()
    constructor(personaMapInPlayOrder) {
        if (Array.isArray(personaMapInPlayOrder)){
            this.mPersonaMapInPlayOrder = new Map(personaMapInPlayOrder)
        } else if(personaMapInPlayOrder instanceof Map){
            this.mPersonaMapInPlayOrder = personaMapInPlayOrder
        } else {
            throw new Error(`${personaMapInPlayOrder} should be a map or an array of arrays`)
        }
    }

    getDto(){
        return {
            personaMapInPlayOrder: [...this.mPersonaMapInPlayOrder]
        }
    }
}