document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            alert('Sign Up Successful!');
            window.location.href = 'signin.html';
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('signin-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            alert('Sign In Successful!');
            // Redirect or store token
        } else {
            alert(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
