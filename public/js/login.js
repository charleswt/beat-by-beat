const loginHandler = async (event) => {
    event.preventDeault();

    const usernameOrEmail = document.querySelector('.usernameOrEmail').value.trim();
    const pass = document.querySelector('.password').value.trim();

    if (usernameOrEmail && passowrd){

        const res = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ usernameOrEmail, pass }),
            headers: { 'Content-Type' : 'application/json' },
        })

        if (res.ok){document.location.replace('/');
    }else{
        alert(res.statusText)
    }
    }
};

document.querySelector('.submit-signin').addEventListener('submit', loginHandler);