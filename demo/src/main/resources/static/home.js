// home.js
document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuth()) return;

    const userEmail = localStorage.getItem('userEmail');
    const contentGrid = document.getElementById('contentGrid');
    
    // Preenche os selects de filtro
    populateFilterSelects();
    
    // Busca mídias ao carregar a página
    fetchAndRenderMidias();

    // Event listeners
    document.getElementById('backToMenu').addEventListener('click', () => {
        window.location.href = 'menu.html';
    });

    document.getElementById('searchButton').addEventListener('click', fetchAndRenderMidias);
    
    document.getElementById('clearFilters').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('filterCategory').value = '';
        document.getElementById('filterRating').value = '';
        fetchAndRenderMidias();
    });

    // Buscar ao pressionar Enter
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetchAndRenderMidias();
        }
    });

    async function fetchAndRenderMidias() {
        const searchInput = document.getElementById('searchInput').value;
        const categoryFilter = document.getElementById('filterCategory').value;
        
        contentGrid.innerHTML = '<p>Carregando mídias...</p>';

        try {
            // Constrói a URL com parâmetros de filtro
            const params = new URLSearchParams();
            if (searchInput) params.append('titulo', searchInput);
            if (categoryFilter) params.append('categoria', categoryFilter);
            
            const queryString = params.toString();
            const url = queryString ? `/midias?${queryString}` : '/midias';
            
            const response = await apiRequest(url);
            
            if (!response.ok) {
                throw new Error('Erro ao buscar mídias');
            }
            
            const midias = await response.json();
            renderMidias(midias);
            
        } catch (error) {
            contentGrid.innerHTML = `<p>Erro ao carregar mídias: ${error.message}</p>`;
            console.error('Erro:', error);
        }
    }

    function renderMidias(midias) {
        if (midias.length === 0) {
            contentGrid.innerHTML = '<p>Nenhuma mídia encontrada.</p>';
            return;
        }

        contentGrid.innerHTML = midias.map(midia => `
            <div class="content-card" onclick="selectMidia('${midia.titulo}')">
                <div class="content-card-image">
                    <img src="placeholder.jpg" alt="${midia.titulo}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjMjIyIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPiR7bWlkaWEudGl0dWxvfTwvdGV4dD4KPC9zdmc+'">
                </div>
                <div class="content-card-info">
                    <h3>${midia.titulo}</h3>
                    <p class="media-category">${midia.categoria} (${midia.ano})</p>
                    <div class="rating">
                        ⭐ ${midia.mediaAvaliacao ? midia.mediaAvaliacao.toFixed(1) : 'N/A'} / 10
                    </div>
                    <p class="sinopse-preview">${midia.sinopse.substring(0, 100)}...</p>
                </div>
            </div>
        `).join('');
    }

    function populateFilterSelects() {
        const categorySelect = document.getElementById('filterCategory');
        categorySelect.innerHTML = `
            <option value="">Todas as categorias</option>
            <option value="filme">Filme</option>
            <option value="serie">Série</option>
            <option value="jogo">Jogo</option>
        `;
    }
});

// Função global para selecionar mídia
function selectMidia(titulo) {
    localStorage.setItem('selectedMidiaTitle', titulo);
    window.location.href = 'media.html';
}