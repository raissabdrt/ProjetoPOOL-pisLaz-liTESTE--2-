// login.js
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona listeners para todos os botões de logout
    document.querySelectorAll('[id^="logoutButton"]').forEach(button => {
        button.addEventListener('click', logout);
    });

    // Apenas para a página de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageElement = document.getElementById('loginMessage');
            
            messageElement.textContent = 'Carregando...';
            messageElement.style.color = '#fff';

            try {
                const response = await apiRequest('/usuarios/login', {
                    method: 'POST',
                    body: JSON.stringify({ 
                        email: email, 
                        senha: password 
                    })
                });

                if (response.ok) {
                    const user = await response.json();
                    localStorage.setItem('userEmail', user.email);
                    localStorage.setItem('userName', user.nome);
                    
                    messageElement.textContent = `Bem-vindo(a), ${user.nome}!`;
                    messageElement.style.color = '#4CAF50';
                    
                    setTimeout(() => {
                        window.location.href = 'home.html';
                    }, 1000);
                } else {
                    const errorText = await response.text();
                    messageElement.textContent = errorText || 'E-mail não encontrado.';
                    messageElement.style.color = '#F44336';
                }
            } catch (error) {
                messageElement.textContent = 'Erro de conexão com o servidor.';
                messageElement.style.color = '#F44336';
                console.error('Erro:', error);
            }
        });
    }
});