const userCards = document.getElementById('userCards');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalUserName = document.getElementById('modalUserName');
const cagadaList = document.getElementById('cagadaList');
const addCagadaContainer = document.getElementById('addCagadaContainer');
const cagadaInput = document.getElementById('cagadaInput');
const submitCagada = document.getElementById('submitCagada');

let selectedUserId = null;

// Função para carregar os usuários
async function loadUsers() {
  const response = await fetch('/api/users');
  const users = await response.json();

  userCards.innerHTML = '';
  users.forEach(user => {
    const card = document.createElement('div');
    card.className = 'card';
    const imageUrl = `/images/${user.imageFileName || 'default.jpg'}`; // Usa uma imagem padrão se não houver imagem específica
    
    card.innerHTML = `
      <img src="${imageUrl}" alt="${user.nome}">
      <h3>${user.nome}</h3>
      <p>Cagadas: ${user.cagada.length}</p>
      <button class="button add-button" onclick="showAddCagada('${user._id}')">Adicionar Cagada</button>
      <button class="button view-button" onclick="showCagadas('${user._id}', '${user.nome}')">Visualizar Cagadas</button>
    `;
    userCards.appendChild(card);
  });
}

// Função para mostrar a lista de cagadas no modal
async function showCagadas(userId, userName) {
  selectedUserId = userId;
  modalUserName.textContent = userName;

  const response = await fetch(`/api/users/${userId}/cagadas`);
  const cagadas = await response.json();

  cagadaList.innerHTML = '';
  cagadas.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Ordena as cagadas

  cagadas.forEach(cagada => {
    const listItem = document.createElement('li');
    listItem.textContent = `${new Date(cagada.createdAt).toLocaleString()} - ${cagada.descricao}`;
    cagadaList.appendChild(listItem);
  });

  modal.style.display = 'block';
}

// Função para abrir a caixa de entrada de nova cagada
function showAddCagada(userId) {
  selectedUserId = userId;
  addCagadaContainer.style.display = 'block';
}

// Função para adicionar uma nova cagada
submitCagada.addEventListener('click', async () => {
  const descricao = cagadaInput.value;
  if (descricao) {
    await fetch(`/api/users/${selectedUserId}/cagada`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descricao })
    });

    cagadaInput.value = '';
    addCagadaContainer.style.display = 'none';
    loadUsers(); // Atualiza a lista de usuários
  }
});

// Fecha o modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Inicializa a lista de usuários
loadUsers();
