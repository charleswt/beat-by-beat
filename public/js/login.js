const loginHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('.usernameOrEmail').value.trim();
    const password = document.querySelector('.password').value.trim();

    if (email && password){

        const res = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type' : 'application/json' },
        })

        if (res.ok){document.location.replace('/');
    }else{
        alert(res.statusText)
    }
    }
};

document.querySelector('.login-form').addEventListener('submit', loginHandler);
