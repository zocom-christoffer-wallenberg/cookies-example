const buttonElem = document.querySelector('#logout');

async function isLoggedIn() {
    const url = 'http://localhost:8000/api/isloggedin';

    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();

    if (!data.isLoggedIn) {
        location.href = 'http://localhost:8000/';
    }
}

async function logout() {
    const url = 'http://localhost:8000/api/logout';

    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();

    if (data.success) {
        location.href = 'http://localhost:8000/';
    }
}

buttonElem.addEventListener('click', () => {
    logout();
});

isLoggedIn();