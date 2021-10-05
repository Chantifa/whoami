export default class GamePhase {
    phaseLength;

    constructor(phase, phaseLength = 2) {
        this.phase = phase
        this.phaseLength = phaseLength;
    }

    static INITIAL = new GamePhase(0);
    static PREPARE_START = new GamePhase(1,);
    static MAIN = new GamePhase(2);
    static FINISHED = new GamePhase(3);

    getLength() {
        return this.phaseLength
    }

    toString(){
        return `GamePhase Nr ${this.phase}`
    }

    getAllowedSuccessors() {
        switch (this) {
            case GamePhase.INITIAL:
                return [GamePhase.PREPARE_START]
            case GamePhase.PREPARE_START:
                return [GamePhase.MAIN, GamePhase.FINISHED]
            case GamePhase.MAIN:
                return [GamePhase.FINISHED]
            case GamePhase.FINISHED:
                return [GamePhase.INITIAL, GamePhase.PREPARE_START]
            default:
                throw new Error("Something went missing on implementation")
        }
    }
}