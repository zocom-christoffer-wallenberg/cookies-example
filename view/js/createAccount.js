const buttonElem = document.querySelector('#submit');
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#pass');


async function createAccount(username, password) {
    const url = 'http://localhost:8000/api/create';
    const body = {
        username: username,
        password: password
    }

    const response = await fetch(url, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }});
    const data = await response.json();

    if (data.success) {
        location.href = 'http://localhost:8000/loggedin.html';
    }
}

buttonElem.addEventListener('click', () => {
    const username = inputUser.value;
    const password = inputPass.value;

    createAccount(username, password);
});