//function to collect values from the signup form
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  //send a post request to the ending api/users to crate a new userdata
  if (name && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      //then redirect the user to the dashboard
      document.location.replace("/");
      
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
