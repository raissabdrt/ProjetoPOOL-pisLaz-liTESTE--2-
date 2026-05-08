document.addEventListener('DOMContentLoaded', () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        window.location.href = 'index.html'; 
        return; 
    }
    const fetchAndRenderMidias = async () => {
        const searchInput = document.getElementById('searchInput').value;
        const categoryFilter = document.getElementById('filterCategory').value;
        const ratingFilter = document.getElementById('filterRating').value;
        const params = new URLSearchParams();
        if (searchInput) params.append('titulo', searchInput);
        if (categoryFilter && categoryFilter !== 'all') params.append('categoria', categoryFilter);
        try {
            const response = await fetch(`/api/midias?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar mídias');
            }
            
            let midias = await response.json();
            if (ratingFilter && ratingFilter !== 'all') {
                const minRating = parseFloat(ratingFilter);
                midias = midias.filter(midia => {
                    const mediaAvaliacao = midia.mediaAvaliacao || 0;
                    return mediaAvaliacao >= minRating;
                });
            }
            
            renderMidias(midias);
        } catch (error) {
            console.error('Erro ao buscar mídias:', error);
            document.getElementById('contentGrid').innerHTML = '<p>Erro ao carregar mídias. Tente novamente.</p>';
        }
    };

    const renderMidias = (midias) => {
        const container = document.getElementById('contentGrid');
        
        if (midias.length === 0) {
            container.innerHTML = '<p>Nenhuma mídia encontrada.</p>';
            return;
        }
        
        container.innerHTML = midias.map(midia => `
            <div class="media-card" onclick="selectMidia('${midia.titulo}')">
                ${midia.imagemUrl ? `<div class="media-card-image"><img src="${midia.imagemUrl}" alt="${midia.titulo}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px 8px 0 0;"></div>` : ''}
                <div class="media-card-content" style="padding: 15px;">
                    <h3>${midia.titulo}</h3>
                    <p class="media-info">${midia.categoria} (${midia.ano})</p>
                    <p class="media-rating">⭐ ${midia.mediaAvaliacao ? midia.mediaAvaliacao.toFixed(1) : 'N/A'}</p>
                    <p class="media-sinopse">${midia.sinopse ? midia.sinopse.substring(0, 100) + '...' : 'Sem sinopse'}</p>
                </div>
            </div>
        `).join('');
    };

    window.selectMidia = (titulo) => {
        localStorage.setItem('selectedMidiaTitle', titulo);
        window.location.href = 'media.html';
    };

    document.getElementById('backToMenu').addEventListener('click', () => {
        window.location.href = 'menu.html';
    });

    document.getElementById('searchButton').addEventListener('click', fetchAndRenderMidias);

    document.getElementById('clearFilters').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        document.getElementById('filterCategory').value = 'all';
        document.getElementById('filterRating').value = 'all';
        fetchAndRenderMidias();
    });

    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetchAndRenderMidias();
        }
    });

    document.getElementById('filterCategory').addEventListener('change', fetchAndRenderMidias);

    document.getElementById('filterRating').addEventListener('change', fetchAndRenderMidias);

    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('userEmail');
        window.location.href = 'index.html';
    });

    const loadCategories = async () => {
        try {
            const response = await fetch('/api/midias');
            if (response.ok) {
                const midias = await response.json();
                const categories = [...new Set(midias.map(m => m.categoria))].sort();
                
                const categorySelect = document.getElementById('filterCategory');
                categorySelect.innerHTML = '<option value="all">Todas as categorias</option>';
                categories.forEach(cat => {
                    const displayName = cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
                    categorySelect.innerHTML += `<option value="${cat}">${displayName}</option>`;
                });
            }
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    };

    const loadRatingOptions = () => {
        const ratingSelect = document.getElementById('filterRating');
        ratingSelect.innerHTML = `
            <option value="all">Todas as avaliações</option>
            <option value="4.5">4.5+ estrelas</option>
            <option value="4.0">4.0+ estrelas</option>
            <option value="3.5">3.5+ estrelas</option>
            <option value="3.0">3.0+ estrelas</option>
            <option value="2.5">2.5+ estrelas</option>
            <option value="2.0">2.0+ estrelas</option>
            <option value="1.5">1.5+ estrelas</option>
            <option value="1.0">1.0+ estrelas</option>
            <option value="0.5">0.5+ estrelas</option>
        `;
    };

    loadCategories();
    loadRatingOptions();
    fetchAndRenderMidias();
});