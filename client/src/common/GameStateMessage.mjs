/**
 * The message sent from serer to client with updates on the state
 */
export default class GameStateMessage {
    static id = "GAME_STATE"

    currentUser
    currentQuestion;
    deadline;
    stateNumber;
    voteMap;


    constructor(currentUser, currentQuestion, deadline, votes, stateNumber) {
        this.currentUser = currentUser
        this.currentQuestion = currentQuestion
        this.deadline = deadline
        this.stateNumber = stateNumber

        if (Array.isArray(votes)){
            this.voteMap = new Map(votes)
        } else if(votes instanceof Map){
            this.voteMap = votes
        } else {
            throw new Error(`${votes} should be a map or an array of arrays`)
        }

    }

    getDto() {
        return {
            currentUser: this.currentUser,
            currentQuestion: this.currentQuestion,
            deadline: this.deadline,
            votes: [...this.voteMap],
            stateNumber: this.stateNumber,
            stateTime: new Date()
        }
    }


}