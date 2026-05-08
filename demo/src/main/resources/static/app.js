// app.js - Configurações globais da aplicação
const API_BASE_URL = 'http://localhost:8080/api';

// Função utilitária para fazer requisições à API
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        return response;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

// Verifica se o usuário está logado
function checkAuth() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail && !window.location.href.includes('index.html') && 
        !window.location.href.includes('register.html') && 
        !window.location.href.includes('menu.html')) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Logout function
function logout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
}