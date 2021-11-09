import {getRandomCharacterName, shuffle} from "./utils.js";
import GamePhase from "./client/src/common/GamePhase.mjs";
import GameStateMessage from "./client/src/common/GameStateMessage.mjs";
import GameSetupMessage from "./client/src/common/GameSetupMessage.mjs";

export default class Game {

    _phase = GamePhase.INITIAL
    _personaMap = new Map()
    _players = []
    _currentUserIndex = 0
    _stateNumber = 0
    _deadline

    _questions = []
    _futureQuestions = new Map();

    constructor(...data) {
        this.data = data
    }

    _setPhase(phase) {
        if (this._phase.getAllowedSuccessors().includes(phase)) {
            this._phase = phase
            console.log("NOW PHASE:", phase)
        } else {
            throw new Error(`Phase transition from ${this._phase} to ${phase} not allowed`)
        }
    }

    start(roomMembers) {
        this._setPhase(GamePhase.INITIAL)
        this._setPhase(GamePhase.WAITING_QUESTION)

        this._questions = []
        this._futureQuestions = new Map()
        this._players = roomMembers


        this._personaMap = new Map()

        shuffle(this._players)
        this._players.forEach(m => {
            this._personaMap.set(m, getRandomCharacterName())
            this._futureQuestions.set(m, [])
        })

        this._deadline = Game.createDeadline(this._phase.getLength())
    }

    getCurrentUser() {
        return this._players[this._currentUserIndex];
    }

    getSetupMessage() {
        return new GameSetupMessage(this._personaMap)
    }

    getStateMessage() {
        return new GameStateMessage(
            this.getCurrentUser(),
            this.getCurrentQuestion(),
            this._deadline,
            this.getCurrentVotes(),
            this._phase,
            this._stateNumber++);
    }

    static createDeadline(minutes) {
        return new Date(Date.now() + minutes * 60000)
    }

    getCurrentQuestion() {
        if (this._questions.length === 0) return null
        return this._questions.at(-1).text;
    }

    getCurrentVotes() {
        if (this._questions.length === 0) return new Map();
        return this._questions.at(-1).votes;
    }

    handleVote(user, voteDto) {
        this._validateUser(user)

        if (this._phase !== GamePhase.WAITING_VOTE) {
            throw new Error("Voting is only possible in the voting phase")
        }
        if (voteDto.question === this.getCurrentQuestion()) {
            this._questions.at(-1).votes.set(user.userId, voteDto.vote)
        } else {
            console.log("sorry, too late")
            console.log(voteDto, this.getCurrentQuestion())
        }

        this._nextPhaseIfAdequate() // finish phase if all have voted
    }

    handleQuestion(user, question) {
        this._validateUser(user)

        const userQuestionList = this._futureQuestions.get(user)
        if(!userQuestionList.includes(question.text)){
            userQuestionList.push(question.text)
        } else {
            console.log("duplicate question")
        }
        this._nextPhaseIfAdequate()

    }

    _nextPhaseIfAdequate() {
        //check if we can go to the next phase

        if (this._phase === GamePhase.WAITING_QUESTION) {
            if (this._futureQuestions.get(this.getCurrentUser()).length > 0) {
                this._publishQuestion()
            }
        } else if (this._phase === GamePhase.WAITING_VOTE) {
            if (this.getCurrentVotes().size === this._players.length) {
                this._publishVoteResults()
            }
        }

        if (this._deadline < new Date()) {
            //todo deadline hit
        }
    }

    _publishQuestion() {
        this._setPhase(GamePhase.WAITING_VOTE)
        const usersFutureQuestions = this._futureQuestions.get(this.getCurrentUser());
        const text = usersFutureQuestions.shift()
        const question = {text, votes: new Map()}

        this._questions.push(question)
    }

    _publishVoteResults() {


        const voteResultIsYes = this.getCurrentVoteResult()

        if(voteResultIsYes){
            if(this._currentIsResultQuestion()){
                this._setPhase(GamePhase.FINISHED) //TODO: maybe let the others finish the game
            }
        }else { //vote result is no or equal
            this._setNextPlayer()
        }

        this._setPhase(GamePhase.WAITING_QUESTION)
    }

    _setNextPlayer() {
        this._currentUserIndex = ++this._currentUserIndex % this._players.length
    }

    getCurrentVoteResult() {
        let pro = 0, contra = 0
        const currentVotes = this.getCurrentVotes();
        currentVotes.forEach((votedPro, keysAreIgnoredOnlyValueMatters) => {
            if (votedPro) {
                pro++
            } else {
                contra++
            }
        })

        return contra < pro
    }

    _currentIsResultQuestion() {
        const persona = this._personaMap.get(this.getCurrentUser())
        return this.getCurrentQuestion().toLowerCase().includes(persona.toLowerCase()) //fixme
    }

    _validateUser(user) {
        if(!this._players.includes(user)){
            throw new Error(`User ${user} is not a member of the game`)
        }
    }

    getOverview(room){

        const players = []
        this._players.forEach(p => players.push(p.userName))

        return {roomName: room,
        phase: this._phase.phase,
        players}
    }
}