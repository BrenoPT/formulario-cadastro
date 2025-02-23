const form = document.getElementById('formulario-cadastro');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('nome').value.trim();
    const description = document.getElementById('descricao').value.trim();
    const value = parseFloat(document.getElementById('valor').value);
    const available = document.getElementById('disp').value;

    if (!name || !description || isNaN(value) || value <= 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    function sanitizeInput(input) {
        return input.replace(/<script.*?>.*?<\/script>/gi, '').replace(/<\/?[a-z][\s\S]*>/gi, '');
    }

    const sanitizedName = sanitizeInput(name);
    const sanitizedDescription = sanitizeInput(description);

    let products;
    try {
        products = JSON.parse(localStorage.getItem('produtos')) || [];
    } catch (e) {
        console.error('Error parsing products data from localStorage', e);
        products = [];
    }

    products.push({ name: sanitizedName, description: sanitizedDescription, value, available });

    localStorage.setItem('produtos', JSON.stringify(products));

    form.reset();

    window.location.href = 'listagem.html';
});

const valueInput = document.getElementById('valor');

let typingTimeout;

valueInput.addEventListener('input', () => {
    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
        let value = valueInput.value.replace(/\D/g, '');

        if (value) {
            const formattedValue = (parseInt(value, 10) / 100).toFixed(2);
            valueInput.value = formattedValue;
        } else {
            valueInput.value = '';
        }
    }, 100);
});
