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