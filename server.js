/**
1. En route för att logga in - /api/login
2. Användaren skickar användarnamn och lösenord om det är korrekt så sätt cookie
 */

/*
    {
        username: String
        password: String
    }
*/

const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('users.json')
const database = low(adapter)

const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());

async function getUser(user) {
    return await database.get('users').find({ username: user.username }).value();
}

async function getUserInfo(cookie) {
    return await database.get('users').find({ cookieID: cookie.loggedIn }).value();
}

async function addCookieID(user, id) {
    return await database.get('users').find({ username: user.username }).assign({ cookieID: id }).write();
}

async function getCookie(id) {
    return await database.get('users').find({ cookieID: id }).value();
}

app.post('/api/login', async (req, res) => {
    const body = req.body;
    console.log(body);

    let resObj = {
        success: false
    }

    const user = await getUser(body);
    if (user && user.password === body.password) {
        const cookieID = uuidv4();
        await addCookieID(user, cookieID);
        res.cookie('loggedIn', cookieID);
        resObj.success = true;
    }

    res.send(JSON.stringify(resObj));
});

app.get('/api/isloggedin', async (req, res) => {
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

app.get('/api/logout', (req, res) => {
    let resObj = {
        success: true
    }

    res.clearCookie('loggedIn');
    res.send(JSON.stringify(resObj));
});

app.get('/api/account', async (req, res) => {
    let cookies = req.cookies;

    const user = await getUserInfo(cookies);

    let resObj = {
        success: false
    }

    if (user) {
        resObj.user = user.username;
        resObj.role = user.role;
        resObj.success = true;
    }

    res.send(JSON.stringify(resObj));
});


app.listen(8000, () => {
    console.log('Server is running');
})