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
      alert(response.message);
    }
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
    alert('Passwords do not match');
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
    alert(response.statusText);
  }

};


document.getElementById('logInForm').addEventListener('submit', loginFormHandler);
document.getElementById('signUpForm').addEventListener('submit', signupFormHandler);