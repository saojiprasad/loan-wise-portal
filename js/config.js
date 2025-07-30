// Configuration file for API endpoints and constants
const CONFIG = {
    API_BASE_URL: 'http://localhost:8080/api',
    
    // API Endpoints
    ENDPOINTS: {
        // Authentication
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        
        // Personal Details
        PERSONAL_ADD: '/personal/add',
        PERSONAL_ALL: '/personal/all',
        PERSONAL_UPDATE: '/personal/update',
        PERSONAL_DELETE: '/personal/delete',
        
        // Income Details
        INCOME_ADD: '/income/add',
        INCOME_ALL: '/income/all',
        INCOME_BY_PERSONAL: '/income/by-personal',
        INCOME_UPDATE: '/income/update',
        INCOME_DELETE: '/income/delete',
        
        // Property Details
        PROPERTY_ADD: '/property/add',
        PROPERTY_ALL: '/property/all',
        PROPERTY_BY_PERSONAL: '/property/by-personal',
        PROPERTY_UPDATE: '/property/update',
        PROPERTY_DELETE: '/property/delete',
        
        // Document Upload
        DOCUMENT_UPLOAD: '/document/upload',
        DOCUMENT_ALL: '/document/all',
        DOCUMENT_BY_PERSONAL: '/document/by-personal',
        DOCUMENT_DELETE: '/document/delete',
        
        // Loan Application
        LOAN_APPLY: '/loan/apply',
        LOAN_ALL: '/loan/all',
        LOAN_STATUS: '/loan/status',
        LOAN_UPDATE_STATUS: '/loan/status/{id}'
    },
    
    // Local Storage Keys
    STORAGE_KEYS: {
        USER_TOKEN: 'loan_user_token',
        USER_INFO: 'loan_user_info',
        CURRENT_USER_ID: 'loan_current_user_id'
    },
    
    // Document Types
    DOCUMENT_TYPES: [
        'ID_PROOF',
        'ADDRESS_PROOF',
        'INCOME_PROOF',
        'PROPERTY_DOCUMENTS',
        'BANK_STATEMENTS',
        'OTHER'
    ],
    
    // Loan Status
    LOAN_STATUS: [
        'PENDING',
        'UNDER_REVIEW',
        'APPROVED',
        'REJECTED',
        'DISBURSED'
    ],
    
    // Validation Rules
    VALIDATION: {
        MIN_NAME_LENGTH: 2,
        MAX_NAME_LENGTH: 50,
        MIN_PASSWORD_LENGTH: 6,
        MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
        ALLOWED_FILE_TYPES: ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx']
    }
};