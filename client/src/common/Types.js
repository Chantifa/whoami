/**
 * The user object used in different messages
 * @type {{getDto(): {userName: string, userId: string}, id: string}}
 */
const USER = {
    id: "USER",
    getDto() {
        return {
            userId: "invalid",
            userName: "anon"
        }
    }

}
/**
 * The chat message event to send
 * client -> server
 * @type {{getDto(message: string): {message: string}, id: string}}
 */
const CHAT_MESSAGE_SENDER = {
    id: "CHAT_SEND",
    getDto(message) {
        return {
            message
        }
    }
} //TODO: Maybe split sender & receiver messages and rename them

/**
 * The chat message event to receive client messages
 * server -> client
 * @type {{getDto(message: string, user: {userName: string, userId: string}): {message: string, user: {userName: string, userId: string}}, id: string}}
 */
const CHAT_MESSAGE_RECEIVER = {
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
const CHAT_ANNOUNCEMENT = {
    id: "CHAT_ANNOUNCEMENT",
    getDto(message) {
        return {
            message
        }
    }
}

/**
 * The Message to join a room
 * client -> server
 * @type {{getDto(userName: string, roomName: string): {userName: string, roomName: string, version: string}, id: string}}
 */
const JOIN_ROOM = {
    id: "JOIN_ROOM",
    getDto(userName, roomName) {
        return {
            userName,
            roomName,
            version: process.env.REACT_APP_VERSION
        }
    }
}

/**
 * The message to leave a room
 * client -> server
 * @type {{getDto(string): {roomName: string}, id: string}}
 */
const LEAVE_ROOM = {
    id: "LEAVE_ROOM",
    getDto(roomName) {
        return {
            roomName: roomName
        }
    }
}

/**
 * The message sent on starting a game
 * server -> client
 * @type {{getDto(*, *): {personaMapInPlayOrder: *, deadline: *}, id: string}}
 */
const GAME_SETUP = {
    id: "GAME_SETUP",
    getDto(map, minutes) {
        return {
            personaMapInPlayOrder: {...map},
            deadline: new Date(Date.now() + minutes * 60000)
        }
    }
}
/**
 * The message to submit your question
 * client -> server
 * @type {{getDto(): {question: string}, id: string}}
 */
const GAME_QUESTION = {
    id: "GAME_QUESTION",
    getDto() {
        return {
            question: ""
        }
    }
}
/**
 * Numbering of the state for sequencing
 * @type {number}
 * @private
 */
let _stateNumber = 0

/**
 * The message to receive updates on the state
 * server -> client
 * @type {{getDto(*=, *=, *, *): {currentUser: *, stateTime: *, stateNumber, votes: *, currentQuestion: *, deadline: *}, id: string}}
 */
const GAME_STATE = {
    id: "GAME_STATE",
    getDto(user, question, deadline, voteMap) {
        return {
            currentUser: user,
            currentQuestion: question,
            deadline,
            votes: {...voteMap},
            stateNumber: _stateNumber++,
            stateTime: new Date()
        }
    }
}

/**
 * The message to submit votes
 * true means yes, false means no
 * @type {{getDto(question: string, vote: boolean): {question: string, vote: boolean}, id: string}}
 */
const GAME_VOTE = {
    id: "GAME_VOTE",
    getDto(question, vote) {
        return {
            question,
            vote
        }
    }
}

module.exports = {
    CHAT_ANNOUNCEMENT,
    CHAT_MESSAGE_RECEIVER,
    CHAT_MESSAGE_SENDER,
    JOIN_ROOM,
    LEAVE_ROOM,
    GAME_SETUP,
    GAME_QUESTION,
    GAME_STATE,
    GAME_VOTE
}