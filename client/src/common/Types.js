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
module.exports = {USER}