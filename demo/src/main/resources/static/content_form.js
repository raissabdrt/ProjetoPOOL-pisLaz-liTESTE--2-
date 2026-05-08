// content_form.js
document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuth()) return;

    const categoriaSelect = document.getElementById('categoria');
    const extraFieldsDiv = document.getElementById('extraFields');
    const contentForm = document.getElementById('contentForm');
    const messageElement = document.getElementById('contentFormMessage');

    // Atualiza campos extras quando a categoria muda
    categoriaSelect.addEventListener('change', updateExtraFields);
    
    // Inicializa campos extras
    updateExtraFields();

    // Submit do formulário
    contentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        const midiaData = {
            titulo: document.getElementById('titulo').value,
            ano: parseInt(document.getElementById('ano').value),
            categoria: document.getElementById('categoria').value,
            sinopse: document.getElementById('sinopse').value,
            campoExtra1: '',
            campoExtra2: '',
            campoExtra3: ''
        };

        // Preenche campos extras baseado na categoria
        const categoria = midiaData.categoria;
        if (categoria === 'filme' || categoria === 'serie') {
            midiaData.campoExtra1 = document.getElementById('indicacoes').value;
            midiaData.campoExtra2 = document.getElementById('diretor').value;
        } else if (categoria === 'jogo') {
            midiaData.campoExtra1 = document.getElementById('plataforma').value;
            midiaData.campoExtra2 = document.getElementById('modoJogo').value;
            midiaData.campoExtra3 = document.getElementById('desenvolvedora').value;
        }

        // Adiciona imagem se existir
        const imagemInput = document.getElementById('imagem');
        if (imagemInput.files[0]) {
            formData.append('imagem', imagemInput.files[0]);
        }

        formData.append('midia', new Blob([JSON.stringify(midiaData)], {
            type: 'application/json'
        }));

        messageElement.textContent = 'Salvando...';
        messageElement.style.color = '#fff';

        try {
            const response = await fetch(`${API_BASE_URL}/midias`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                messageElement.textContent = 'Mídia cadastrada com sucesso!';
                messageElement.style.color = '#4CAF50';
                contentForm.reset();
                updateExtraFields(); // Reseta campos extras
                
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
            } else {
                const errorText = await response.text();
                messageElement.textContent = errorText || 'Erro ao cadastrar mídia.';
                messageElement.style.color = '#F44336';
            }
        } catch (error) {
            messageElement.textContent = 'Erro de conexão com o servidor.';
            messageElement.style.color = '#F44336';
            console.error('Erro:', error);
        }
    });

    function updateExtraFields() {
        const categoria = categoriaSelect.value;
        let html = '';

        if (categoria === 'filme' || categoria === 'serie') {
            html = `
                <input type="text" id="indicacoes" placeholder="Indicações/Prêmios">
                <input type="text" id="diretor" placeholder="Diretor/Criador" required>
            `;
        } else if (categoria === 'jogo') {
            html = `
                <input type="text" id="plataforma" placeholder="Plataforma (ex: PC, PS5, Xbox)" required>
                <input type="text" id="modoJogo" placeholder="Modo de Jogo (ex: Single Player)" required>
                <input type="text" id="desenvolvedora" placeholder="Desenvolvedora" required>
            `;
        }

        extraFieldsDiv.innerHTML = html;
    }
});