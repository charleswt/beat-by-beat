const getName = async (userId) => {
    try {
        console.log(userId)
      const response = await fetch(`/api/friends/friendsId/${userId}`, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
        },
        
      });
  
      if (response.ok) {
        console.log(`User with Name ${userId} added successfully`);
      } else {
        console.error(`Failed to add user with Name ${userId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

   const listenClick = document.querySelector('.submit-btn');
   listenClick.addEventListener('click', (event)=> {
    console.log(event)
    if (event.target.tagName === "BUTTON") {
       const userId = event.target.getAttribute('data-id');
       getName(userId).then(() => location.reload());
    }
   });

   const searchUser = async (user) => {
    const errMsg = document.querySelector('.err-Msg');
    console.log(user)
    try {
        const response = await fetch(`/api/friends/getUsers/${user}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },

        })
        console.log(response + 'Ln 42')
        if (response.ok) {
          errMsg.textContent = "";
          const jsonResponse = await response.json();
          console.log(jsonResponse);
            console.log('Found', user);
            let container = document.getElementById('searchResults');
            let newFriend = document.createElement('p');
            newFriend.innerHTML = 
            `<div id="searchResults" class="prof-marg">
            <div class="friend-box">
              <div class="prof-align">
                <p class="prof-marg">${jsonResponse.name}</p>
                <button data-id=${jsonResponse.id} class="friend-request">Add Friend</button>
              </div>
            </div>
          </div>`;
            container.appendChild(newFriend);
          } else {
            errMsg.textContent = "Cannot find a user with the username";
            console.error('Could not find', user);
          }
    } catch(err){
        console.error(err);
        res.status(500).json({ message: 'Could not find' + user + 'Ln 50' })
    }
   }

   document.querySelector('#search-listen-dashboard')
   .addEventListener('click', () => {
    const inputValue = document.getElementById('inputField').value;
    searchUser(inputValue)
   });

   const deleteFriend = async (deleteId) => {
    console.log(deleteId)
    try {
        const response = await fetch(`/api/friends/deleteFriend/${deleteId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },

        })

        if (response.ok) {
            console.log('Deleted user with the id of', deleteId);
          } else {
            console.error('Could not find a user with the id of', deleteId);
          }
    } catch(err){
        console.error(err);
        res.status(500).json({})
    }
   }

   document.querySelector('.delete-btn-dashboard')
   .addEventListener('click', (event)=> {
    console.log(event)
       const deleteId = event.target.getAttribute('data-deleteId');
       deleteFriend(deleteId).then(() => location.reload());
   });