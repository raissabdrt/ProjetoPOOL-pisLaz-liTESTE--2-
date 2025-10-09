document.querySelectorAll('[id^="logoutButton"]').forEach(button => {
    button.addEventListener('click', () => {
        localStorage.removeItem('userEmail');
        window.location.href = 'index.html';
    });
});

if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value; 
        const messageElement = document.getElementById('loginMessage');
        messageElement.textContent = 'Carregando...';

        try {
            const response = await fetch('/api/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, nome: email }) 
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('userEmail', user.email);
                messageElement.textContent = `Bem-vindo(a), ${user.nome}! Redirecionando...`;
                messageElement.style.color = '#4CAF50';
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1000);
            } else {
                const errorText = await response.text();
                messageElement.textContent = errorText || 'E-mail inválido.';
                messageElement.style.color = '#F44336';
            }
        } catch (error) {
            messageElement.textContent = 'Erro de conexão com o servidor.';
            messageElement.style.color = '#F44336';
            console.error('Erro de rede:', error);
        }
    });
}
