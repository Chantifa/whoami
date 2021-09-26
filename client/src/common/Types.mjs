/**
 * The user object used in different messages
 * @type {{getDto(): {userName: string, userId: string}, id: string}}
 */
export const USER = {
    id: "USER",
    getDto() {
        return {
            userId: "invalid",
            userName: "anon"
        }
    }

}
