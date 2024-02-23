const getId = async (userId) => {
    try {
      const response = await fetch(`/friendsId/${userId}`, {
        method: 'POST',
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
  
  document.querySelectorAll('.friend-request').forEach(button => {
    button.addEventListener('click', () => {
      const userId = button.getAttribute('data-id');
  
      getId(userId);
    });
  });