const buttonElem = document.querySelector('#submit');
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#pass');


async function login(username, password) {
    const url = 'http://localhost:8000/api/login';
    const obj = {
        username: username,
        password: password
    }

    const response = await fetch(url, { method: 'POST', body: JSON.stringify(obj), headers: { 'Content-Type': 'application/json' } });
    const data = await response.json();

    return await data;
}

async function isLoggedIn() {
    const url = 'http://localhost:8000/api/isloggedin';

    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();

    if (data.isLoggedIn) {
        location.href = 'http://localhost:8000/loggedin.html';
    }
}

buttonElem.addEventListener('click', async () => {
    const user = inputUser.value;
    const pass = inputPass.value;

    let loggedIn = await login(user, pass);

    if (loggedIn.success) {
        location.href = 'http://localhost:8000/loggedin.html'
    }
});

isLoggedIn();