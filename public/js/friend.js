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
       getName(userId);
    }
   });

   const searchUser = async (user) => {
    console.log(user)
    try {
        const response = await fetch(`/api/friends/getUsers/${user}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },

        })

        if (response.ok) {
            console.log('Found', user);
          } else {
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
       deleteFriend(deleteId);
   });