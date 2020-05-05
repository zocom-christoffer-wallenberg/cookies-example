/**
1. En route för att logga in - /api/login
2. Användaren skickar användarnamn och lösenord om det är korrekt så sätt cookie
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
    const body = req.body;
    console.log(body);

    let resObj = {
        success: false
    }

    if (body.username === 'chris' && body.password === 'pwd123') {
        res.cookie('loggedIn', 'true');
        resObj.success = true;
    }

    res.send(JSON.stringify(resObj));
});

app.get('/api/isloggedin', (req, res) => {
    let cookies = req.cookies;

    let resObj = {
        isLoggedIn: false
    }

    if (cookies && cookies.loggedIn === 'true') {
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


app.listen(8000, () => {
    console.log('Server is running');
})