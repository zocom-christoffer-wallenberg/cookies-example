const { Router } = require('express');
const router = new Router();

const { getUser, getCookie } = require('../models/database-functions');
const { matchPassword } = require('../models/hashPassword');
const { addCookie } = require('../models/cookies'); 

router.post('/login', async (req, res) => {
    const body = req.body;
    console.log(body);

    let resObj = {
        success: false
    }

    const user = await getUser(body);
    console.log(user);
    const isAMatch = await matchPassword(body.password, user.password);
    console.log('isAMatch: ', isAMatch);
    if (user && isAMatch) {
        const cookie = await addCookie(user);
        res.cookie('loggedIn', cookie.cookieID);
        resObj.success = true;
    }

    res.send(JSON.stringify(resObj));
});

router.get('/isloggedin', async (req, res) => {
    let cookies = req.cookies;
    
    let resObj = {
        isLoggedIn: false
    }

    const cookieID = await getCookie(cookies.loggedIn)

    if (cookies && cookieID) {
        resObj.isLoggedIn = true;
    }

    res.send(JSON.stringify(resObj));
});

router.get('/logout', (req, res) => {
    let resObj = {
        success: true
    }

    res.clearCookie('loggedIn');
    res.send(JSON.stringify(resObj));
});

module.exports = router;