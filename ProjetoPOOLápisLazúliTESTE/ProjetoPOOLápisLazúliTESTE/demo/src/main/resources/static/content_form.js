document.addEventListener('DOMContentLoaded', () => {
    const updateExtraFields = () => {
        const categoria = document.getElementById('categoria').value;
        const extraFieldsDiv = document.getElementById('extraFields');
        extraFieldsDiv.innerHTML = '';

        let fields = [];
        if (categoria === 'filme' || categoria === 'serie') {
            fields.push({ id: 'indicacoes', label: 'Indicações/Prêmios', placeholder: 'Ex: Melhor Filme, Emmy' });
            fields.push({ id: 'premios', label: 'Diretor/Criador', placeholder: 'Nome do Diretor ou Criador' }); 
        }
        if (categoria === 'jogo') {
            fields.push({ id: 'plataforma', label: 'Plataforma', placeholder: 'Ex: PC, PS5, Mobile' });
            fields.push({ id: 'modoDeJogo', label: 'Modo de Jogo', placeholder: 'Ex: Single Player, Multiplayer' });
            fields.push({ id: 'desenvolvedora', label: 'Desenvolvedora', placeholder: 'Ex: CD Projekt RED' });
        }
        fields.forEach(field => {
            const label = document.createElement('label');
            label.textContent = field.label;
            const input = document.createElement('input');
            input.id = field.id;
            input.name = field.id;
            input.type = 'text';
            input.placeholder = field.placeholder;
            input.required = true; 
            extraFieldsDiv.appendChild(label);
            extraFieldsDiv.appendChild(input);
        });
    };
   document.getElementById('categoria').addEventListener('change', updateExtraFields);
   updateExtraFields(); 

    const form = document.getElementById('contentForm');
    const messageElement = document.getElementById('contentFormMessage');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {
            titulo: formData.get('titulo'),
            ano: parseInt(formData.get('ano')),
            categoria: formData.get('categoria'),
            sinopse: formData.get('sinopse') || '', 
            imagemUrl: formData.get('imagemUrl') || '', 
            campoExtra1: formData.get('indicacoes') || formData.get('plataforma') || '',
            campoExtra2: formData.get('premios') || formData.get('modoDeJogo') || '',
            campoExtra3: formData.get('desenvolvedora') || ''
        };
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        messageElement.textContent = 'Processando...';
        try {
            const response = await fetch('/api/midias', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                messageElement.textContent = 'Mídia cadastrada com sucesso! Redirecionando...';
                messageElement.style.color = '#4CAF50';
                form.reset();
                updateExtraFields();
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
            } else {
                const errorText = await response.text();
                messageElement.textContent = `Falha no cadastro: ${errorText}`;
                messageElement.style.color = '#F44336';
            }
        } catch (error) {
            messageElement.textContent = 'Erro de conexão com o servidor.';
            messageElement.style.color = '#F44336';
            console.error('Erro de rede:', error);
        } finally {
            submitButton.textContent = 'Salvar';
            submitButton.disabled = false;
        }
    });
});