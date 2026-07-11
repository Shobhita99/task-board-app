// config.js - Environment configuration

// Auto-detect environment
const isReplit = window.location.hostname.includes('replit') || 
                 window.location.hostname.includes('.repl.co');

// For Replit (production)
if (isReplit) {
    // In Replit, the API is at the same domain
    const API_URL = window.location.origin + '/api';
} else {
    // For local development
    const API_URL = 'http://localhost:5000/api';
}

// Make API_URL globally available
window.API_URL = API_URL;

console.log('🌐 Environment:', isReplit ? 'Replit' : 'Local');
console.log('🔗 API URL:', API_URL);