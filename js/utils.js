// Utility functions for API calls and common operations

class ApiClient {
    constructor() {
        this.baseUrl = CONFIG.API_BASE_URL;
    }

    // Get authorization headers
    getHeaders(includeAuth = true) {
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (includeAuth) {
            const token = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_TOKEN);
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }
        
        return headers;
    }

    // Generic API request method
    async request(endpoint, options = {}) {
        const url = this.baseUrl + endpoint;
        const config = {
            headers: this.getHeaders(options.includeAuth !== false),
            ...options
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('API request failed:', error);
            return { success: false, error: error.message };
        }
    }

    // GET request
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    // POST request
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // PUT request
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    // DELETE request
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    // File upload
    async uploadFile(endpoint, formData) {
        const token = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_TOKEN);
        const headers = {};
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(this.baseUrl + endpoint, {
                method: 'POST',
                headers,
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('File upload failed:', error);
            return { success: false, error: error.message };
        }
    }
}

// Create global API client instance
const api = new ApiClient();

// Utility Functions
const Utils = {
    // Show loading state
    showLoading(element) {
        element.classList.add('loading');
        element.disabled = true;
    },

    // Hide loading state
    hideLoading(element) {
        element.classList.remove('loading');
        element.disabled = false;
    },

    // Show message
    showMessage(message, type = 'success', containerId = 'content-area') {
        const container = document.getElementById(containerId);
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        
        // Insert at the beginning of container
        container.insertBefore(messageDiv, container.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 5000);
    },

    // Format date
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    // Format currency
    formatCurrency(amount) {
        if (!amount) return '₹0';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    },

    // Validate email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate phone
    isValidPhone(phone) {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone);
    },

    // Get current user ID
    getCurrentUserId() {
        return localStorage.getItem(CONFIG.STORAGE_KEYS.CURRENT_USER_ID);
    },

    // Set current user
    setCurrentUser(userId, userInfo) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.CURRENT_USER_ID, userId);
        localStorage.setItem(CONFIG.STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
    },

    // Clear user session
    clearSession() {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER_TOKEN);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER_INFO);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.CURRENT_USER_ID);
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};