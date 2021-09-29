/**
 * The chat message event to receive client messages
 * server -> client
 * @type {{getDto(message: string, user: {userName: string, userId: string}): {message: string, user: {userName: string, userId: string}}, id: string}}
 */
export const CHAT_MESSAGE = {
    id: "CHAT_MESSAGE",
    getDto(message, user) {
        return {
            message,
            user
        }
    }
}

/**
 * The chat message event to receive server announcements
 * server -> client
 * @type {{getDto(string): {message: string}, id: string}}
 */
export const CHAT_ANNOUNCEMENT = {
    id: "CHAT_ANNOUNCEMENT",
    getDto(message) {
        return {
            message
        }
    }
}

/**
 * Error messages
 * @type {{getDto(string): {message: string}, id: string}}
 */
export const ERROR = {
    id: "ERROR",
    getDto(message) {
        return {
            message
        }
    }
}


/**
 * The message sent on starting a game
 * server -> client
 * @type {{getDto(*, *): {personaMapInPlayOrder: *, deadline: *}, id: string}}
 */
export const GAME_SETUP = {
    id: "GAME_SETUP",
    getDto(map, minutes) {
        return {
            personaMapInPlayOrder: [...map],
            deadline: new Date(Date.now() + minutes * 60000)
        }
    }
}
/**
 * Numbering of the state for sequencing
 * @type {number}
 * @private
 */
let _stateNumber = 0 //todo this shold be per room not global probably

/**
 * The message to receive updates on the state
 * @type {{getDto(*, *, *, *): {currentUser: User, stateTime: Date, stateNumber: number, votes: [[]], currentQuestion: String, deadline: Date}, id: string}}
 */
export const GAME_STATE = {
    id: "GAME_STATE",
    getDto(user, question, deadline, voteMap) {
        return {
            currentUser: user,
            currentQuestion: question,
            deadline,
            votes: [...voteMap],
            stateNumber: _stateNumber++,
            stateTime: new Date()
        }
    }
}