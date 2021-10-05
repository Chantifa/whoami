import {getRandomCharacterName, shuffle} from "./utils.js";
import GamePhase from "./GamePhase.js";
import GameStateMessage from "./client/src/common/GameStateMessage.mjs";
import GameSetupMessage from "./client/src/common/GameSetupMessage.mjs";

export default class Game {

    _phase = GamePhase.INITIAL
    _personaMap = new Map()
    _players = []
    currentUserIndex = 0
    _stateNumber = 0
    _deadline

    _questions = []

    constructor(...data) {
        this.data = data
    }

    _setPhase(phase) {
        if (this._phase.getAllowedSuccessors().includes(phase)) {
            this._phase = phase
        } else {
            throw new Error(`Phase transition from ${this._phase} to ${phase} not allowed`)
        }
    }

    start(roomMembers) {
        this._setPhase(GamePhase.PREPARE_START)

        this._questions = []
        this._players = roomMembers

        this._personaMap = new Map()

        shuffle(this._players)
        this._players.forEach(m => {
            this._personaMap.set(m.user.userId, getRandomCharacterName())
        })

        this._deadline = Game.createDeadline(this._phase.getLength())
    }

    getCurrentUser() {
        return this._players[this.currentUserIndex];
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
            this._stateNumber++);
    }

    static createDeadline(minutes) {
        return new Date(Date.now() + minutes * 60000)
    }

    getCurrentQuestion() {
        if (this._questions.length === 0) return null
        return this._questions.at(-1).question;
    }

    getCurrentVotes() {
        if (this._questions.length === 0) return new Map();
        return this._questions.at(-1).votes;
    }

    handleVote(data) { //todo

    }

    handleQuestion(data) { //todo

    }
}