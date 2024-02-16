const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'content-Type' : 'application/json' },
    })

    if(response.ok){document.location.replace('/login');return;};
    alert(response.statusText);
}

document.querySelector('#logout').addEventListener('click', logout);
