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


/*
Model - alla databasfunktioner
Controller - routes
View - HTML/CSS/JS
*/

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const loginRouter = require('./routes/login');
const createRouter = require('./routes/create');
const accountRouter = require('./routes/account');
const app = express();

app.use(express.static('view'));
app.use(cookieParser());
app.use(bodyParser.json());

//Endpoints
app.use('/api/auth', loginRouter);
app.use('/api/create', createRouter);
app.use('/api/account', accountRouter);

app.listen(8000, () => {
    console.log('Server is running');
})