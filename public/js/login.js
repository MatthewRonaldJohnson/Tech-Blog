const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const userName = document.querySelector('#logUsername').value.trim();
    const password = document.querySelector('#logPassword').value.trim();
  
    if (userName && password) {
    console.log('passed line 7 if')
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ userName, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {    //send them to homepage if login successfully
        console.log('got here')
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };

document.getElementById('logInForm').addEventListener('submit',loginFormHandler);