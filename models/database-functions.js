const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('users.json')
const database = low(adapter)

module.exports = {
    async getUser(user) {
        return await database.get('users').find({ username: user.username }).value();
    },
    
    async getUserInfo(cookie) {
        return await database.get('users').find({ cookieID: cookie.loggedIn }).value();
    },
    
    async addCookieID(user, id) {
        return await database.get('users').find({ username: user.username }).assign({ cookieID: id }).write();
    },
    
    async getCookie(id) {
        return await database.get('users').find({ cookieID: id }).value();
    },
    
    async addUser(user, pass) {
        return await database.get('users').push({ username: user, password: pass, cookieID: '', role: 'user' }).write();
    }
}