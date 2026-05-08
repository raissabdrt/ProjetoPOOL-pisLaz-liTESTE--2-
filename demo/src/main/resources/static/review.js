// review.js
let selectedRating = 0;

// COMENTÁRIO: Função que atualiza as estrelas visualmente (hover ou clique)
const updateStars = (rating, temporary = false) => {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        const starValue = parseInt(star.dataset.value);
        // COMENTÁRIO: Se for temporário (hover), verifica o valor do mouse. Caso contrário, usa o valor salvo.
        const isActive = temporary ? starValue <= rating : starValue <= selectedRating;
        star.style.color = isActive ? '#ffd700' : '#444'; // Amarelo ou cinza
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const userEmail = localStorage.getItem('userEmail');
    // COMENTÁRIO: Título da mídia é passado da tela de detalhes (media.js)
    const midiaTitle = localStorage.getItem('selectedMidiaTitleForReview'); 
    const messageElement = document.getElementById('reviewMessage');
    const submitButton = document.getElementById('submitReview');

    // COMENTÁRIO: Validações essenciais de login e mídia selecionada
    if (!userEmail) {
        alert('Você precisa estar logado para avaliar.');
        window.location.href = 'index.html';
        return;
    }

    if (!midiaTitle) {
        alert('Nenhuma mídia selecionada para avaliação.');
        window.location.href = 'home.html';
        return;
    }

    document.getElementById('mediaTitle').textContent = `Mídia: ${midiaTitle}`;

    // Lógica para seleção de estrelas
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            selectedRating = parseInt(e.target.dataset.value);
            updateStars(selectedRating);
        });
        star.addEventListener('mouseover', (e) => {
            updateStars(parseInt(e.target.dataset.value), true);
        });
        star.addEventListener('mouseout', () => {
            updateStars(selectedRating);
        });
    });

    // Lógica de submissão da avaliação
    submitButton.addEventListener('click', async () => {
        const comentario = document.getElementById('reviewComment').value;
        
        // COMENTÁRIO: Validação obrigatória da nota.
        if (selectedRating === 0) {
            messageElement.textContent = 'Por favor, selecione uma nota (1 a 5 estrelas).';
            messageElement.style.color = '#F44336';
            return;
        }

        // COMENTÁRIO: A nota é de 0-10 no backend. Mapeamento: 5 estrelas * 2 = 10.
        const notaBackend = selectedRating * 2; 

        const data = {
            emailUsuario: userEmail,
            tituloMidia: midiaTitle,
            nota: notaBackend, 
            comentario: comentario
        };

        messageElement.textContent = 'Enviando avaliação...';
        messageElement.style.color = '#fff';
        submitButton.disabled = true;

        try {
            const response = await fetch('/api/midias/avaliar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                messageElement.textContent = 'Avaliação enviada com sucesso! Redirecionando...';
                messageElement.style.color = '#4CAF50';
                setTimeout(() => {
                    // COMENTÁRIO: REDIRECIONAMENTO CORRETO: Volta para a página de detalhes da mídia.
                    window.location.href = 'media.html'; 
                }, 1500);
            } else {
                const errorText = await response.text();
                messageElement.textContent = `Falha ao avaliar: ${errorText}`;
                messageElement.style.color = '#F44336';
            }
        } catch (error) {
            messageElement.textContent = 'Erro de conexão com o servidor.';
            messageElement.style.color = '#F44336';
            console.error('Erro de rede:', error);
        } finally {
             submitButton.disabled = false;
        }
    });
});