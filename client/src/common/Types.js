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
 *
 * @type {{getDto(message: string): {message: string}, id: string}}
 */
const CHAT_MESSAGE_SENDER = {
    id: "CHAT_SEND",
    getDto(message) {
        return {
            message
        }
    }
}

/**
 *
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
 *
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
 *
 * @type {{getDto(userName: string, roomName: string): {userName: string, roomName: string, , version: string}, id: string}}
 */
const JOIN_ROOM = {
    id: "JOIN_ROOM",
    getDto(userName, roomName, version) {
        return {
            userName,
            roomName,
            version: process.env.REACT_APP_VERSION
        }
    }
}

/**
 * You can explicitly leave the room.
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

const GAME_SETUP = {
    id: "GAME_SETUP",
    getDto(map, minutes){
        return {
            personaMapInPlayOrder: {...map},
            deadline: new Date(Date.now()+minutes*60000)
        }
    }
}

const  GAME_QUESTION = {
    id: "GAME_QUESTION",
    getDto(){
        return {
            question : ""
        }
    }
}
let _stateNumber = 0
const GAME_STATE = {
    id: "GAME_STATE",
    getDto(user, question, deadline, voteMap){
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
 *
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
    GAME_STATE
}