// Import styles
import './styles/main.css';

// DOM Elements
const root = document.getElementById('root');
const navLinks = document.querySelector('.nav-links');

// Navigation setup
function setupNavigation() {
    // Add links to navbar
    const links = [
        { text: 'Home', path: '/' },
        { text: 'Features', path: '/features' },
        { text: 'Pricing', path: '/pricing' },
        { text: 'Blog', path: '/blog' },
        { text: 'Login', path: '/login' },
        { text: 'Register', path: '/register' }
    ];
    
    navLinks.innerHTML = '';
    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.path;
        a.textContent = link.text;
        a.className = 'btn btn-primary';
        navLinks.appendChild(a);
    });
    
    // Set up page routing
    window.addEventListener('popstate', renderPage);
    renderPage();
}

// Render different pages
function renderPage() {
    const path = window.location.pathname;
    
    switch(path) {
        case '/':
            root.innerHTML = `
                <section class="hero">
                    <h1>Welcome to Wigy.app</h1>
                    <p>Your widget dashboard platform</p>
                    <button onclick="window.location='/login'" class="btn btn-primary">Get Started</button>
                </section>
            `;
            break;
            
        case '/login':
            root.innerHTML = `
                <section class="auth-form">
                    <h2>Login to Wigy.app</h2>
                    <form id="login-form">
                        <input type="email" placeholder="Email" required>
                        <input type="password" placeholder="Password" required>
                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                    <p>Don't have an account? <a href="/register">Register here</a></p>
                </section>
            `;
            break;
            
        case '/register':
            root.innerHTML = `
                <section class="auth-form">
                    <h2>Create Account</h2>
                    <form id="register-form">
                        <input type="text" placeholder="Full Name" required>
                        <input type="email" placeholder="Email" required>
                        <input type="password" placeholder="Password" required>
                        <button type="submit" class="btn btn-primary">Register</button>
                    </form>
                    <p>Already have an account? <a href="/login">Login here</a></p>
                </section>
            `;
            break;
            
        default:
            root.innerHTML = '<h1>Page Not Found</h1>';
    }
    
    // Setup form submission
    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', handleLogin);
    }
    
    if (document.getElementById('register-form')) {
        document.getElementById('register-form').addEventListener('submit', handleRegister);
    }
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const email = form[0].value;
    const password = form[1].value;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Login successful! Redirecting...');
        window.location = '/';
    } catch (error) {
        alert('Login failed: ' + error.message);
    }
}

// Handle registration
async function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const name = form[0].value;
    const email = form[1].value;
    const password = form[2].value;
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Registration successful! Redirecting to login...');
        window.location = '/login';
    } catch (error) {
        alert('Registration failed: ' + error.message);
    }
}

// Initialize the app
setupNavigation();
