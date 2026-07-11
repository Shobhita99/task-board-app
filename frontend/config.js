// config.js - Environment configuration
// This file MUST load before app.js

// Detect environment
const isReplit = window.location.hostname.includes('replit') || 
                 window.location.hostname.includes('.repl.co') ||
                 window.location.hostname === 'localhost' ||
                 window.location.hostname === '127.0.0.1';

// Set API URL - for Replit, it's the same origin
let API_URL;
if (isReplit) {
    API_URL = window.location.origin + '/api';
} else {
    API_URL = 'http://localhost:5000/api';
}

// Make globally available
window.API_URL = API_URL;

// Debug info
console.log('🌐 Environment:', isReplit ? 'Replit' : 'Local');
console.log('🔗 API URL:', window.API_URL);