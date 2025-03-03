function showAlert(message) {
    let alertBox = document.getElementById('alert-box');
    alertBox.innerText = message;
    alertBox.style.display = 'block';
    setTimeout(() => { alertBox.style.display = 'none'; }, 3000);
}

function showForm(type) {
    let formHtml = '';
    if (type === 'signup') {
        formHtml = `
            <h2>Signup</h2>
            <input type="email" id="email" class="form-control my-2" placeholder="Enter Email">
            <input type="password" id="password" class="form-control my-2" placeholder="Enter Password">
            <input type="text" id="contact" class="form-control my-2" placeholder="Enter Contact No. (+91)">
            <button class="btn btn-custom" onclick="register()">Register</button>
            <p>Already have an account? <a href="#" onclick="showForm('login')">Login</a></p>
            <button class="btn btn-custom" onclick="goBack()">Back</button>
        `;
    } else {
        formHtml = `
            <h2>Login</h2>
            <input type="email" id="email" class="form-control my-2" placeholder="Enter Email">
            <input type="password" id="password" class="form-control my-2" placeholder="Enter Password">
            <button class="btn btn-custom" onclick="login()">Login</button>
            <p>Don't have an account? <a href="#" onclick="showForm('signup')">Signup</a></p>
            <button class="btn btn-custom" onclick="goBack()">Back</button>
        `;
    }
    document.getElementById('main-container').innerHTML = formHtml;
}

function goBack() {
    document.getElementById('main-container').innerHTML = `
        <h2>Welcome</h2>
        <button class="btn btn-custom" onclick="showForm('signup')">Signup</button>
        <button class="btn btn-custom" onclick="showForm('login')">Login</button>
    `;
}

function register() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let contact = document.getElementById('contact').value;
    if (email && password && contact) {
        localStorage.setItem('user', JSON.stringify({ email, contact }));
        showAlert('Registration successful!');
        showDashboard();
    } else {
        showAlert('Please fill all fields');
    }
}

function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email) {
        showAlert('Login successful!');
        showDashboard();
    } else {
        showAlert('Invalid credentials');
    }
}

function showDashboard() {
    let user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('main-container').innerHTML = `
        <h2>Dashboard</h2>
        <p>Welcome, ${user.email}</p>
        <p>Contact: ${user.contact}</p>
        <button class="btn btn-custom" onclick="logout()">Logout</button>
    `;
}

function logout() {
    localStorage.removeItem('user');
    showAlert('Logged out successfully!');
    goBack();
}