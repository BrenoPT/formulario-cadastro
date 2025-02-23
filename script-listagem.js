const products = JSON.parse(localStorage.getItem('produtos')) || [];
products.sort((a, b) => a.value - b.value);

const tableBody = document.getElementById('listagem-produtos');
products.forEach(product => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = product.name;
    row.appendChild(nameCell);

    const valueCell = document.createElement('td');
    valueCell.textContent = product.value.toFixed(2);
    row.appendChild(valueCell);

    tableBody.appendChild(row);
});

document.getElementById('cadastrar').addEventListener('click', () => {
    window.location.href = 'cadastro.html';
});