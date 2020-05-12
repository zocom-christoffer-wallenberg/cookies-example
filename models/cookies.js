const { v4: uuidv4 } = require('uuid');
const { addCookieID } = require('../models/database-functions');

module.exports = {
    async addCookie(user) {
        const cookieID = uuidv4();
        return await addCookieID(user, cookieID);
    }   
}