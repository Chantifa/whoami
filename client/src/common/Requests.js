/**
 * The chat message event to send
 * @type {{getDto(message: string): {message: string}, id: string}}
 */
const CHAT_REQUEST = {
    id: "CHAT_REQUEST",
    getDto(message) {
        return {
            message
        }
    }
}

/**
 * The Message to join a room
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
 * The message to submit your question
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
    CHAT_REQUEST,
    JOIN_ROOM,
    LEAVE_ROOM,
    GAME_QUESTION,
    GAME_VOTE
}