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
            const response = await fetch('/api/usuarios/registrar', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ 
                    nome: nome, 
                    email: email
                }) 
            });

            if (response.ok) {
                messageElement.textContent = 'Cadastro realizado com sucesso! Redirecionando para login...';
                messageElement.style.color = '#4CAF50'; 
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                const errorText = await response.text();
                messageElement.textContent = errorText || 'Falha no cadastro. Verifique os dados.';
                messageElement.style.color = '#F44336'; 
            }
        } catch (error) {
            messageElement.textContent = 'Erro de conexão com o servidor.';
            messageElement.style.color = '#F44336';
            console.error('Erro de rede:', error);
        }
    });
}