// Main application logic and routing

let currentPage = 'dashboard';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const token = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_TOKEN);
    const userInfo = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_INFO);
    
    if (!token) {
        showLogin();
        return;
    }
    
    // Set user info in header
    if (userInfo) {
        const user = JSON.parse(userInfo);
        document.getElementById('user-name').textContent = `Welcome, ${user.name || 'User'}`;
    }
    
    // Initialize dashboard
    showDashboard();
});

// Navigation functions
function showDashboard() {
    setActivePage('dashboard', 'Dashboard');
    loadTemplate('dashboard');
}

function showPersonal() {
    setActivePage('personal', 'Personal Details');
    loadTemplate('personal');
}

function showIncome() {
    setActivePage('income', 'Income Details');
    loadTemplate('income');
}

function showProperty() {
    setActivePage('property', 'Property Details');
    loadTemplate('property');
}

function showDocument() {
    setActivePage('document', 'Document Upload');
    loadTemplate('document');
}

function showLoan() {
    setActivePage('loan', 'Loan Application');
    loadTemplate('loan');
}

function showLogin() {
    document.body.innerHTML = `
        <div class="login-container">
            <div class="login-form">
                <h2>Loan Management System</h2>
                <form id="login-form">
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" id="login-email" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" id="login-password" class="form-input" required>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Login</button>
                </form>
                <p class="text-center mt-3">
                    Don't have an account? <a href="#" onclick="showRegister()">Register here</a>
                </p>
            </div>
        </div>
        <style>
        .login-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .login-form {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 400px;
        }
        .login-form h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: var(--text-primary);
        }
        </style>
    `;
    
    document.getElementById('login-form').addEventListener('submit', handleLogin);
}

function showRegister() {
    document.body.innerHTML = `
        <div class="login-container">
            <div class="login-form">
                <h2>Register - Loan Management</h2>
                <form id="register-form">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" id="register-name" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" id="register-email" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" id="register-password" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Confirm Password</label>
                        <input type="password" id="register-confirm" class="form-input" required>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Register</button>
                </form>
                <p class="text-center mt-3">
                    Already have an account? <a href="#" onclick="showLogin()">Login here</a>
                </p>
            </div>
        </div>
    `;
    
    document.getElementById('register-form').addEventListener('submit', handleRegister);
}

// Set active page
function setActivePage(page, title) {
    currentPage = page;
    document.getElementById('page-title').textContent = title;
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`[onclick="show${page.charAt(0).toUpperCase() + page.slice(1)}()"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Load template content
function loadTemplate(templateName) {
    const contentArea = document.getElementById('content-area');
    
    switch(templateName) {
        case 'dashboard':
            contentArea.innerHTML = `
                <div class="dashboard-cards">
                    <div class="card">
                        <h3>Personal Details</h3>
                        <p>Manage your personal information</p>
                        <button onclick="showPersonal()" class="btn btn-primary">View Details</button>
                    </div>
                    <div class="card">
                        <h3>Income Details</h3>
                        <p>Add and manage income information</p>
                        <button onclick="showIncome()" class="btn btn-primary">View Income</button>
                    </div>
                    <div class="card">
                        <h3>Property Details</h3>
                        <p>Manage property information</p>
                        <button onclick="showProperty()" class="btn btn-primary">View Properties</button>
                    </div>
                    <div class="card">
                        <h3>Documents</h3>
                        <p>Upload and manage documents</p>
                        <button onclick="showDocument()" class="btn btn-primary">Manage Documents</button>
                    </div>
                    <div class="card">
                        <h3>Loan Application</h3>
                        <p>Apply for a new loan</p>
                        <button onclick="showLoan()" class="btn btn-primary">Apply Now</button>
                    </div>
                </div>
            `;
            break;
            
        case 'personal':
            loadPersonalPage();
            break;
            
        case 'income':
            loadIncomePage();
            break;
            
        case 'property':
            loadPropertyPage();
            break;
            
        case 'document':
            loadDocumentPage();
            break;
            
        case 'loan':
            loadLoanPage();
            break;
    }
}

// Authentication handlers
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const submitBtn = event.target.querySelector('button[type="submit"]');
    
    Utils.showLoading(submitBtn);
    
    // Mock login for now - replace with actual API call
    setTimeout(() => {
        // Simulate successful login
        const mockToken = 'mock-jwt-token-' + Date.now();
        const mockUser = { id: 1, name: 'John Doe', email: email };
        
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER_TOKEN, mockToken);
        Utils.setCurrentUser(mockUser.id, mockUser);
        
        // Reload the page to show dashboard
        location.reload();
    }, 1000);
}

async function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    Utils.showLoading(submitBtn);
    
    // Mock registration - replace with actual API call
    setTimeout(() => {
        alert('Registration successful! Please login.');
        showLogin();
    }, 1000);
}

function logout() {
    Utils.clearSession();
    showLogin();
}

// Page loaders - These will be implemented in separate files
function loadPersonalPage() {
    // Will be implemented in personal.js
    document.getElementById('content-area').innerHTML = '<p>Personal Details page loading...</p>';
}

function loadIncomePage() {
    // Will be implemented in income.js
    document.getElementById('content-area').innerHTML = '<p>Income Details page loading...</p>';
}

function loadPropertyPage() {
    // Will be implemented in property.js
    document.getElementById('content-area').innerHTML = '<p>Property Details page loading...</p>';
}

function loadDocumentPage() {
    // Will be implemented in document.js
    document.getElementById('content-area').innerHTML = '<p>Document Upload page loading...</p>';
}

function loadLoanPage() {
    // Will be implemented in loan.js
    document.getElementById('content-area').innerHTML = '<p>Loan Application page loading...</p>';
}