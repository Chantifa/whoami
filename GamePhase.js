

export default class GamePhase {
    phaseLength;
    phase;

    constructor(phase, phaseLength = 2) {
        this.phase = phase
        this.phaseLength = phaseLength;
    }

    static INITIAL = new GamePhase("INITIAL");
    static WAITING_QUESTION = new GamePhase("WAITING_QUESTION",);
    static WAITING_VOTE = new GamePhase("WAITING_VOTE");
    static FINISHED = new GamePhase("FINISHED");

    getLength() {
        return this.phaseLength
    }

    toString() {
        return `GamePhase ${this.phase}`
    }


    getAllowedSuccessors() {
        return (_successors.get(this))
    }
}

const _successors = new Map([
    [GamePhase.INITIAL, [GamePhase.WAITING_QUESTION, GamePhase.INITIAL]],
    [GamePhase.WAITING_QUESTION, [GamePhase.WAITING_VOTE]],
    [GamePhase.WAITING_VOTE, [GamePhase.FINISHED, GamePhase.WAITING_QUESTION]],
    [GamePhase.FINISHED, [GamePhase.INITIAL]]])