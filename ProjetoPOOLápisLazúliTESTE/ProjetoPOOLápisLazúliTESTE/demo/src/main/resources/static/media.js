document.addEventListener('DOMContentLoaded', () => {
    const midiaTitle = localStorage.getItem('selectedMidiaTitle'); 
    const userEmail = localStorage.getItem('userEmail'); 
    const container = document.getElementById('mediaContainer'); 
    
    if (!midiaTitle) {
        container.innerHTML = '<h2>Erro: Nenhuma mídia selecionada.</h2><p>Volte para a home e selecione uma mídia.</p>';
        setTimeout(() => {
             window.location.href = 'home.html';
        }, 2000);
        return;
    }
    const fetchMidiaDetails = async () => {
        container.innerHTML = '<h2>Carregando detalhes...</h2>';
        try {
            const response = await fetch(`/api/midias/${encodeURIComponent(midiaTitle)}`);
            if (!response.ok) {
                throw new Error('Mídia não encontrada ou falha no servidor.');
            }
            const midia = await response.json();
            renderMidia(midia);

        } catch (error) {
            container.innerHTML = `<h2>Erro ao carregar: ${midiaTitle}</h2><p>${error.message}</p>`;
            console.error('Erro ao buscar detalhes da mídia:', error);
        }
    };

    const renderMidia = (midia) => {
        let extraDetails = '';
        if (midia.categoria.toLowerCase() === 'filme' || midia.categoria.toLowerCase() === 'serie') {
            extraDetails = `
                <p><strong>Indicações/Prêmios:</strong> ${midia.indicacoes || 'N/A'}</p>
                <p><strong>Diretor/Criador:</strong> ${midia.premios || 'N/A'}</p>
            `;
        } else if (midia.categoria.toLowerCase() === 'jogo') {
             extraDetails = `
                <p><strong>Plataforma:</strong> ${midia.plataforma || 'N/A'}</p>
                <p><strong>Modo de Jogo:</strong> ${midia.modoDeJogo || 'N/A'}</p>
                <p><strong>Desenvolvedora:</strong> ${midia.desenvolvedora || 'N/A'}</p>
            `;
        }
        container.innerHTML = `
            <div class="media-details">
                <h1>${midia.titulo}</h1>
                <p class="media-category">Categoria: ${midia.categoria} (${midia.ano})</p>
                <p class="media-rating">Média de Avaliação: 
                    <strong>${midia.mediaAvaliacao ? midia.mediaAvaliacao.toFixed(1) : 'Sem Avaliações'}</strong> / 5
                </p>
                
                ${midia.imagemUrl ? `<div class="media-image"><img src="${midia.imagemUrl}" alt="${midia.titulo}" style="max-width: 300px; border-radius: 8px; margin: 15px 0;"></div>` : ''}
                
                <hr>
                
                <h2>Sinopse</h2>
                <p>${midia.sinopse || 'Sinopse não disponível'}</p>

                <h2>Detalhes Extras</h2>
                ${extraDetails}
                
                <hr>

                <button id="reviewButton" class="primary">Avaliar esta Mídia</button>

                <h2>Resenhas dos Usuários (${midia.avaliacoes ? midia.avaliacoes.length : 0})</h2>
                <div class="reviews-list">
                    ${midia.avaliacoes && midia.avaliacoes.length > 0
                        ? midia.avaliacoes.map(a => `
                            <div class="review-card">
                                <p class="review-rating">Nota: <strong>${a.nota}</strong> / 5</p>
                                <p>Por: <strong>${a.nomeAutor || 'Usuário'}</strong></p>
                                <p>${a.comentario || 'Sem comentário'}</p>
                            </div>
                        `).join('')
                        : '<p>Nenhuma resenha ainda. Seja o primeiro a avaliar!</p>'
                    }
                </div>
            </div>
        `;
        const reviewButton = document.getElementById('reviewButton');
        if (reviewButton) {
            reviewButton.addEventListener('click', () => {
                localStorage.setItem('selectedMidiaTitleForReview', midia.titulo);
                window.location.href = 'review.html'; 
            });
        }
    };
    fetchMidiaDetails();
});