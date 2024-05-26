function updateAuthReference() {
    if (sessionStorage.getItem('cartArray') == null
        || sessionStorage.getItem('cartArray') === undefined) {
        sessionStorage.setItem('cartArray', 'qwerty');
    }

    const token = sessionStorage.getItem('accessToken');
    const auth = document.getElementById('auth-text');
    const authHref = document.getElementById('auth-text-href');
    if (token != null) {
        auth.innerText = 'Профіль користуача'
        authHref.href = '/source-project-front/bootsrap/user-page.html'
    } else {
        auth.innerText = 'Авторизація користуача'
        authHref.href = '/source-project-front/bootsrap/login-page.html'
    }
}

updateAuthReference()