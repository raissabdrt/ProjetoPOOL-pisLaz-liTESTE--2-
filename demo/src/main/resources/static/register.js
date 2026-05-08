// register.js
const registerForm = document.getElementById('registerForm');

if (registerForm) {
    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('senha').value;
        const messageElement = document.getElementById('registerMessage');
        
        messageElement.textContent = 'Processando...';
        messageElement.style.color = '#fff';

        try {
            const response = await apiRequest('/usuarios/registrar', {
                method: 'POST',
                body: JSON.stringify({ 
                    nome: nome, 
                    email: email, 
                    senha: password
                })
            });

            if (response.ok) {
                messageElement.textContent = 'Cadastro realizado! Redirecionando...';
                messageElement.style.color = '#4CAF50';
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                const errorText = await response.text();
                messageElement.textContent = errorText || 'Falha no cadastro.';
                messageElement.style.color = '#F44336';
            }
        } catch (error) {
            messageElement.textContent = 'Erro de conexão com o servidor.';
            messageElement.style.color = '#F44336';
            console.error('Erro:', error);
        }
    });
}