import GamePhase from "./client/src/common/GamePhase.mjs";
import GameStateMessage from "./client/src/common/GameStateMessage.mjs";
import GameSetupMessage from "./client/src/common/GameSetupMessage.mjs";
import * as fs from "fs";

function randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const characters = JSON.parse(fs.readFileSync('characters.json'))

function getTopics() {
    return Object.keys(characters)
}

function getRandomCharacterName(topic) {
    return randomChoice(characters[topic])
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export default class Game {

    _phase = GamePhase.INITIAL
    _personaMap = new Map()
    _players = []
    _currentUserIndex = 0
    _stateNumber = 0
    _deadline = Game.createDeadline(120)

    _questions = []
    _futureQuestions = new Map();
    _round = -1;
    _statsCallbacks = {
        gameStarted: () => {
            return Promise.resolve()
        },
        gameFinished: () => {
            return Promise.resolve()
        },
        gameWon: () => {
            return Promise.resolve()
        }
    }

    _transitionToPhase(phase) {
        if (this._phase.getAllowedSuccessors().includes(phase)) {
            this._phase = phase
            console.log("NOW PHASE:", phase)
            this._deadline = Game.createDeadline(phase.getLength())
        } else {
            throw new Error(`Phase transition from ${this._phase} to ${phase} not allowed`)
        }
    }

    setStatsCallbacks(statsCallbacks) {
        if ("gameStarted" in statsCallbacks && "gameFinished" in statsCallbacks && "gameWon" in statsCallbacks) {
            this._statsCallbacks = statsCallbacks
        } else {
            throw new Error("statsCallbacks must implement all needed methods")
        }
    }

    start(roomMembers) {
        if(roomMembers.length < 2){
            throw new Error("You can not play alone")
        }

        this._transitionToPhase(GamePhase.INITIAL)
        this._transitionToPhase(GamePhase.WAITING_QUESTION)
        this._statsCallbacks.gameStarted(roomMembers).catch(e => console.log(e.message))

        this._round++
        this._questions = []
        this._futureQuestions = new Map()
        this._players = roomMembers


        this._personaMap = new Map()
        const possibleTopics = getTopics()
        const topic = possibleTopics[this._round % possibleTopics.length]

        shuffle(this._players)
        this._players.forEach(player => {
            this._personaMap.set(player, getRandomCharacterName(topic))
            this._futureQuestions.set(player, [])
        })
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

        if (this.getCurrentUser().userId === user.userId){
            throw new Error("You can not answer your own questions.")
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

        if (this._phase === GamePhase.WAITING_VOTE) {
            if (this.getCurrentVotes().size === this._players.length -1) {
                this._publishVoteResults()
            }
        }
        // both can happen
        if (this._phase === GamePhase.WAITING_QUESTION) {
            if (this._futureQuestions.get(this.getCurrentUser()).length > 0) {
                this._publishQuestion()
            }
        }
    }

    _publishQuestion() {
        this._transitionToPhase(GamePhase.WAITING_VOTE)
        const usersFutureQuestions = this._futureQuestions.get(this.getCurrentUser());
        const text = usersFutureQuestions.shift()
        const question = {text, votes: new Map()}

        this._questions.push(question)
    }

    _publishVoteResults() {


        const voteResultIsYes = this.getCurrentVoteResult()

        if(voteResultIsYes){
            if(this._currentIsResultQuestion()){
                this._transitionToPhase(GamePhase.FINISHED)
                this._statsCallbacks.gameFinished(this._players).catch(e => console.log(e.message))
                this._statsCallbacks.gameWon(this.getCurrentUser()).catch(e => console.log(e.message))
                return
            }
        }else { //vote result is no or equal
            this._setNextPlayer()
        }

        this._transitionToPhase(GamePhase.WAITING_QUESTION)
    }

    dropPlayer(user) {
        const index = this._players.findIndex((player) => player.socketId === user.socketId);
        if (index !== -1) {
            const droppingPlayer = this._players[index]
            this._players.splice(index, 1);
            this._personaMap.delete(droppingPlayer)

            //make sure that current user mapping still works
            if (index === this._currentUserIndex) {
                this._setNextPlayer()
            } else if (index < this._currentUserIndex){
                this._currentUserIndex--
            }
        }
        if (this._players.length <= 1){
            this._statsCallbacks.gameWon(this._players[0]).catch(e => console.log(e.message))
            this._phase = GamePhase.FINISHED
        }

    }

    isDead(){
        return this._deadline < Game.createDeadline(-60) || (this._players.length === 0 && this._deadline < Game.createDeadline(-5))
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
        return this.getCurrentQuestion().toLowerCase().includes(persona.toLowerCase())
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