// =========================================================
// dashboard.js - Painel principal
// DogHelp - Sistema de Gestão para Pet Shops
// =========================================================

(function () {
  const usuario = DH.usuarioLogado();
  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  const pets = DH.petsDoUsuario(usuario.id);
  const banhos = DH.banhosDoUsuario(usuario.id);

  document.getElementById("totalPets").textContent = pets.length;

  const hoje = new Date();
  const proximos7dias = new Date(hoje);
  proximos7dias.setDate(hoje.getDate() + 7);

  const proximosBanhos = banhos.filter((b) => {
    if (!b.proximoBanhoData) return false;
    const dataProx = new Date(b.proximoBanhoData);
    return dataProx >= hoje && dataProx <= proximos7dias;
  });
  document.getElementById("proximosBanhos").textContent = proximosBanhos.length;

  if (banhos.length > 0) {
    const ultimo = banhos[0];
    const pet = DH.obterPetPorId(ultimo.petId);
    const data = new Date(ultimo.dataBanho);
    document.getElementById("ultimoBanho").textContent =
      pet ? pet.nome + " - " + data.toLocaleDateString("pt-BR") : "—";
  }

  const listaPets = document.getElementById("listaPetsDashboard");
  const petsExibir = pets.slice(0, 4);

  if (petsExibir.length === 0) {
    listaPets.innerHTML = `
      <div class="ficha-vazia">
        <h3>Nenhum pet cadastrado</h3>
        <p>Cadastre seu primeiro animal para começar.</p>
        <a href="pets.html" class="btn btn-blue" style="display:inline-block;">Cadastrar pet</a>
      </div>
    `;
  } else {
    listaPets.innerHTML = petsExibir
      .map(
        (pet) => `
      <div class="ficha">
        <div class="ficha__topo">
          <span class="ficha__nome">${pet.nome}</span>
          <span class="ficha__especie">${pet.especie}</span>
        </div>
        <dl class="ficha__dados">
          <dt>Raça</dt>
          <dd>${pet.raca || "—"}</dd>
          <dt>Sexo</dt>
          <dd>${pet.sexo || "—"}</dd>
          <dt>Idade</dt>
          <dd>${pet.idade ? pet.idade + " anos" : "—"}</dd>
          <dt>Peso</dt>
          <dd>${pet.peso ? pet.peso + " kg" : "—"}</dd>
        </dl>
        <div class="ficha__acoes">
          <a href="agendamento.html" class="btn btn-mini btn-blue">Agendar banho</a>
          <a href="pets.html" class="btn btn-mini btn-outline">Saúde</a>
        </div>
      </div>
    `
      )
      .join("");
  }
})();