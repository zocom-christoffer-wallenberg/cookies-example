const usernameElem = document.querySelector('#username');
const roleElem = document.querySelector('#role');

async function getAccount() {
    const url = 'http://localhost:8000/api/account/get';

    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();

    if (data.success) {
        usernameElem.innerHTML = data.user;
        roleElem.innerHTML = data.role;
    }
}


getAccount();