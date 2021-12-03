/**
 * The message sent from server to client on starting a game
 */
export default class GameSetupMessage {
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
    
    getDtoFor(user){
        const copy = new Map(this.mPersonaMapInPlayOrder)
        for (const key of this.mPersonaMapInPlayOrder.keys()) {
            if(key === user){
                copy.set(key, false)
                return {
                    personaMapInPlayOrder: [...copy]
                }
            }
        }
        console.log(`user ${user} not in personaMap`)
        
        return {
            personaMapInPlayOrder: [...copy]
        }
    }

    getDto(){
        return {
            personaMapInPlayOrder: [...this.mPersonaMapInPlayOrder]
        }
    }
}