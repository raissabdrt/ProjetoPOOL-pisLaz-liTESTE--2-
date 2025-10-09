let selectedRating = 0;

const updateStars = (rating, temporary = false) => {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => {
        const starValue = parseInt(star.dataset.value);
        const isActive = temporary ? starValue <= rating : starValue <= selectedRating;
        star.style.color = isActive ? '#ffd700' : '#444'; 
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const userEmail = localStorage.getItem('userEmail');
    const midiaTitle = localStorage.getItem('selectedMidiaTitleForReview'); 
    const messageElement = document.getElementById('reviewMessage');
    const submitButton = document.getElementById('submitReview');
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

    submitButton.addEventListener('click', async () => {
        const comentario = document.getElementById('reviewComment').value;
        if (selectedRating === 0) {
            messageElement.textContent = 'Por favor, selecione uma nota (1 a 5 estrelas).';
            messageElement.style.color = '#F44336';
            return;
        }
        const notaBackend = selectedRating; 
        const data = {
            tituloMidia: midiaTitle,
            emailUsuario: userEmail,
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