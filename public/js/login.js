const loginFormHandler = async (event) => {
  event.preventDefault();

  const userName = document.querySelector('#logUsername').value.trim();
  const password = document.querySelector('#logPassword').value.trim();

  if (userName && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ userName, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {    //send them to homepage if login successfully
      document.location.replace('/dashboard');
    } else {
      alert(response.status + ': wrong username and/or password');
    }
  } else {
    alert('Need to provide both User Name and a Password to login')
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const userName = document.querySelector('#signUsername').value.trim();
  const password = document.querySelector('#signPassword').value.trim();
  const confirmPassword = document.querySelector('#confirmPassword').value.trim();

  if (!(userName && password && confirmPassword)) {
    alert('You must enter values into all 3 fields to sign up');
    return;
  }

  if (password !== confirmPassword) {
    document.querySelector('#signPassword').value = '';
    document.querySelector('#confirmPassword').value ='';
    alert('Passwords do not match');
    
    return;
  }

  if(password.length < 8){
    document.querySelector('#signPassword').value = '';
    document.querySelector('#confirmPassword').value ='';
    alert('Password must be at least 8 characters long');
    return;
  }

  const response = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({ user_name: userName, password }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Sign Up Failed. Your chosen user name may already be in use, please try another')
  }


};


document.getElementById('logInForm').addEventListener('submit', loginFormHandler);
document.getElementById('signUpForm').addEventListener('submit', signupFormHandler);