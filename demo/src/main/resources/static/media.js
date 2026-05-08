// media.js

// COMENTÁRIO: Função principal que roda após o carregamento da página.
document.addEventListener('DOMContentLoaded', () => {
    // Busca o título da mídia selecionada no localStorage (chave passada da home.html)
    const midiaTitle = localStorage.getItem('selectedMidiaTitle'); 
    // Busca o email do usuário logado para verificar permissões ou exibir informações personalizadas
    const userEmail = localStorage.getItem('userEmail'); 
    const container = document.getElementById('mediaContainer'); // Container onde o conteúdo será renderizado
    
    // COMENTÁRIO: Verifica se a mídia foi selecionada corretamente.
    if (!midiaTitle) {
        container.innerHTML = '<h2>Erro: Nenhuma mídia selecionada.</h2><p>Volte para a home e selecione uma mídia.</p>';
        // COMENTÁRIO: Redireciona para a home se não houver mídia.
        setTimeout(() => {
             window.location.href = 'home.html';
        }, 2000);
        return;
    }

    // COMENTÁRIO: Função assíncrona para buscar os detalhes da mídia na API.
    const fetchMidiaDetails = async () => {
        container.innerHTML = '<h2>Carregando detalhes...</h2>';
        try {
            // COMENTÁRIO: Usa o endpoint GET /api/midias/{titulo}, codificando o título para URLs.
            const response = await fetch(`/api/midias/${encodeURIComponent(midiaTitle)}`);
            if (!response.ok) {
                // Se o servidor não retornar OK, lança um erro.
                throw new Error('Mídia não encontrada ou falha no servidor.');
            }
            const midia = await response.json();
            renderMidia(midia);

        } catch (error) {
            // Exibe mensagem de erro de carregamento.
            container.innerHTML = `<h2>Erro ao carregar: ${midiaTitle}</h2><p>${error.message}</p>`;
            console.error('Erro ao buscar detalhes da mídia:', error);
        }
    };

    // COMENTÁRIO: Função que constrói e insere o HTML com os dados da mídia.
    const renderMidia = (midia) => {
        // Formata as informações extras com base no tipo (Filme/Série/Jogo)
        let extraDetails = '';
        // COMENTÁRIO: Usa toLowerCase() para garantir que a comparação seja insensível a maiúsculas/minúsculas.
        if (midia.categoria.toLowerCase() === 'filme' || midia.categoria.toLowerCase() === 'serie') {
            extraDetails = `
                <p><strong>Indicações/Prêmios:</strong> ${midia.campoExtra1 || 'N/A'}</p>
                <p><strong>Diretor/Criador:</strong> ${midia.campoExtra2 || 'N/A'}</p>
            `;
        } else if (midia.categoria.toLowerCase() === 'jogo') {
             extraDetails = `
                <p><strong>Plataforma:</strong> ${midia.campoExtra1 || 'N/A'}</p>
                <p><strong>Modo de Jogo:</strong> ${midia.campoExtra2 || 'N/A'}</p>
                <p><strong>Desenvolvedora:</strong> ${midia.campoExtra3 || 'N/A'}</p>
            `;
        }

        // COMENTÁRIO: Estrutura do HTML que será injetada.
        container.innerHTML = `
            <div class="media-details">
                <h1>${midia.titulo}</h1>
                <p class="media-category">Categoria: ${midia.categoria} (${midia.ano})</p>
                <p class="media-rating">Média de Avaliação: 
                    <strong>${midia.mediaAvaliacoes ? (midia.mediaAvaliacoes).toFixed(1) : 'Sem Avaliações'}</strong> / 10
                </p>
                
                <hr>
                
                <h2>Sinopse</h2>
                <p>${midia.sinopse}</p>

                <h2>Detalhes Extras</h2>
                ${extraDetails}
                
                <hr>

                <button id="reviewButton" class="primary">Avaliar esta Mídia</button>

                <h2>Resenhas dos Usuários (${midia.avaliacoes ? midia.avaliacoes.length : 0})</h2>
                <div class="reviews-list">
                    ${midia.avaliacoes && midia.avaliacoes.length > 0
                        ? midia.avaliacoes.map(a => `
                            <div class="review-card">
                                <p class="review-rating">Nota: <strong>${a.nota}</strong> / 10</p>
                                <p>Por: <strong>${a.emailUsuario}</strong></p>
                                <p>${a.comentario}</p>
                            </div>
                        `).join('')
                        : '<p>Nenhuma resenha ainda. Seja o primeiro a avaliar!</p>'
                    }
                </div>
            </div>
        `;

        // COMENTÁRIO: Configura a interatividade do botão de avaliação.
        const reviewButton = document.getElementById('reviewButton');
        if (reviewButton) {
            reviewButton.addEventListener('click', () => {
                // COMENTÁRIO: ARMAZENA o título para a página review.html saber qual mídia avaliar.
                localStorage.setItem('selectedMidiaTitleForReview', midia.titulo);
                // COMENTÁRIO: REDIRECIONA para a página de formulário de avaliação.
                window.location.href = 'review.html'; 
            });
        }
    };

    // COMENTÁRIO: Inicia o processo de busca dos detalhes da mídia.
    fetchMidiaDetails();
});