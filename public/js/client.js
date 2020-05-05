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
    console.log(data);
}

buttonElem.addEventListener('click', () => {
    const user = inputUser.value;
    const pass = inputPass.value;

    login(user, pass);
});