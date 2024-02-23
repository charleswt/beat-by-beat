const getId = async (userId) => {
    try {
        console.log(userId)
      const response = await fetch(`/api/users/friendsId/${userId}`, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
        },
        
      });
  
      if (response.ok) {
        console.log(`User with ID ${userId} added successfully`);
      } else {
        console.error(`Failed to add user with ID ${userId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

   var listenClick = document.querySelector('.submit-btn');
   listenClick.addEventListener('click', (event)=> {
    console.log(event)
    if (event.target.tagName === "BUTTON") {
       var userId = event.target.getAttribute('data-id');
       getId(userId);
    }
   });