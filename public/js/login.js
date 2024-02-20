const loginHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('.usernameOrEmail').value.trim();
  const password = document.querySelector('.password').value.trim();

  if (email && password) {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      document.location.replace('/');
    } else {
      alert(res.statusText);
    }
  }
};

//password visibility
function seeMyPassword() {
  let input = document.getElementById('myPassword');
  if (input.type === 'password') {
    input.type = 'text';
  } else {
    input.type = 'password';
  }
}

document
  .querySelector('.submit-signin')
  .addEventListener('submit', loginHandler);
