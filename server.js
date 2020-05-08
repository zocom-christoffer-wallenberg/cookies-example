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

/*
1. HTML-sida och JS för klienten
2. En enpoint för att skapa konto
3. I klienten anropa vår endpoint och skicka användarnamn och lösenord
4. På servern spara användarnamn och hasha lösenordet med bcrypt som sparas i databasen
*/



const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

//Hur många gångar som lösenordet kommer att hashas
const saltRounds = 10;

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('users.json')
const database = low(adapter)

const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());

// Bcrypt functions

//hash funktion som tar lösenordet som parameter och returnerar en hash
async function hashPassword(passwordToHash) {
    return await bcrypt.hash(passwordToHash, saltRounds);
}

async function matchPassword(userPassword, hash) {
    const match = await bcrypt.compare(userPassword, hash);
    return match;
}

// Database functions
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

async function addUser(user, pass) {
    return await database.get('users').push({ username: user, password: pass, cookieID: '', role: 'user' }).write();
}


/*Ni kan använda denna kod för att testa hur det fungerar att genera en hash och sedan jämföra lösenordet.
Ta bort kommentarerna och kör getPass();
async function getPass() {
    const myPlaintextPassword = 'pwd123';
    const hash = await hashPassword(myPlaintextPassword);
    const match = await matchPassword(myPlaintextPassword, hash);
    console.log('Password match: ', match);
    console.log('Hash: ', hash);
}*/

//getPass()


// Endpoints
app.post('/api/login', async (req, res) => {
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

//Endpoint för skapa konto
app.post('/api/create', async (req, res) => {
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
        const cookieID = uuidv4();
        await addCookieID(body, cookieID);
        res.cookie('loggedIn', cookieID);
    }

    res.send(JSON.stringify(resObj));
})


app.listen(8000, () => {
    console.log('Server is running');
})