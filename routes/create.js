const { Router } = require('express');
const router = new Router();

const { addUser } = require('../models/database-functions');
const { hashPassword } = require('../models/hashPassword');
const { addCookie } = require('../models/cookies');

//Endpoint för skapa konto
router.post('/', async (req, res) => {
    let body = req.body;

    let resObj = {
        success: false
    }

    //Hasha lösenord och spara i en variabel
    const passwordHash = await hashPassword(body.password);
    console.log(passwordHash);
    //Lägg till användare i databasen med användarnamn och de hashade lösenordet
    const userCreated = await addUser(body.username, passwordHash);

    if (userCreated) {
        resObj.success = true;
        const cookie = await addCookie(body);
        res.cookie('loggedIn', cookie.cookieID);
    }

    res.send(JSON.stringify(resObj));
});

module.exports = router;