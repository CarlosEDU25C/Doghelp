// =========================================================
// pets.js - CRUD de Pets e Gerenciamento de Saúde (RF-04)
// DogHelp - Sistema de Gestão para Pet Shops
// =========================================================

(function () {
  const usuario = DH.usuarioLogado();
  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  let editandoId = null;
  const listaPets = document.getElementById("listaPets");
  const modalPet = document.getElementById("modalPet");
  const modalSaude = document.getElementById("modalSaude");
  const formPet = document.getElementById("formPet");
  const formSaude = document.getElementById("formSaude");

  function renderizarPets() {
    const pets = DH.petsDoUsuario(usuario.id);

    if (pets.length === 0) {
      listaPets.innerHTML = `
        <div class="ficha-vazia">
          <h3>Nenhum pet cadastrado</h3>
          <p>Clique em "Novo pet" para cadastrar seu primeiro animal.</p>
        </div>
      `;
      return;
    }

    listaPets.innerHTML = pets
      .map(
        (pet) => {
          return `
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
          <button class="btn btn-mini btn-outline" data-editar="${pet.id}">Editar</button>
          <button class="btn btn-mini btn-outline" data-saude="${pet.id}">Saúde</button>
          <button class="btn btn-mini btn-red" data-excluir="${pet.id}">Excluir</button>
        </div>
      </div>
    `;
        }
      )
      .join("");

    document.querySelectorAll("[data-editar]").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.dataset.editar;
        const pet = DH.obterPetPorId(id);
        if (pet) {
          editandoId = id;
          document.getElementById("modalTituloPet").textContent = "Editar pet";
          document.getElementById("petId").value = id;
          document.getElementById("petNome").value = pet.nome;
          document.getElementById("petEspecie").value = pet.especie;
          document.getElementById("petRaca").value = pet.raca || "";
          document.getElementById("petSexo").value = pet.sexo || "Macho";
          document.getElementById("petIdade").value = pet.idade || "";
          document.getElementById("petPeso").value = pet.peso || "";
          modalPet.classList.add("mostrar");
        }
      });
    });

    document.querySelectorAll("[data-saude]").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.dataset.saude;
        const pet = DH.obterPetPorId(id);
        const saude = DH.saudeDoPet(id);
        if (pet) {
          document.getElementById("saudePetId").value = id;
          document.getElementById("saudePetNome").textContent = pet.nome;
          document.getElementById("saudeVacinas").value = saude?.vacinas || "";
          document.getElementById("saudeDoencas").value = saude?.doencas || "";
          document.getElementById("saudeAlergias").value = saude?.alergias || "";
          document.getElementById("saudeMedicamentos").value = saude?.medicamentos || "";
          document.getElementById("saudeCheckup").value = saude?.checkup || "";
          modalSaude.classList.add("mostrar");
        }
      });
    });

    document.querySelectorAll("[data-excluir]").forEach((btn) => {
      btn.addEventListener("click", function () {
        if (confirm("Tem certeza que deseja excluir este pet?")) {
          const id = this.dataset.excluir;
          DH.excluirPet(id);
          renderizarPets();
        }
      });
    });
  }

  /* ---------- MODAL PET ---------- */
  document.getElementById("btnNovoPet").addEventListener("click", function () {
    editandoId = null;
    document.getElementById("modalTituloPet").textContent = "Novo pet";
    document.getElementById("petId").value = "";
    formPet.reset();
    modalPet.classList.add("mostrar");
  });

  document.getElementById("fecharModalPet").addEventListener("click", function () {
    modalPet.classList.remove("mostrar");
  });

  modalPet.addEventListener("click", function (e) {
    if (e.target === this) {
      modalPet.classList.remove("mostrar");
    }
  });

  formPet.addEventListener("submit", function (e) {
    e.preventDefault();

    const dados = {
      usuarioId: usuario.id,
      nome: document.getElementById("petNome").value.trim(),
      especie: document.getElementById("petEspecie").value,
      raca: document.getElementById("petRaca").value.trim(),
      sexo: document.getElementById("petSexo").value,
      idade: parseInt(document.getElementById("petIdade").value) || null,
      peso: parseFloat(document.getElementById("petPeso").value) || null,
    };

    const id = document.getElementById("petId").value;

    if (id) {
      DH.atualizarPet(id, dados);
    } else {
      DH.cadastrarPet(dados);
    }

    modalPet.classList.remove("mostrar");
    renderizarPets();
  });

  /* ---------- MODAL SAÚDE (RF-04) ---------- */
  document.getElementById("fecharModalSaude").addEventListener("click", function () {
    modalSaude.classList.remove("mostrar");
  });

  modalSaude.addEventListener("click", function (e) {
    if (e.target === this) {
      modalSaude.classList.remove("mostrar");
    }
  });

  formSaude.addEventListener("submit", function (e) {
    e.preventDefault();

    const dados = {
      petId: document.getElementById("saudePetId").value,
      vacinas: document.getElementById("saudeVacinas").value.trim(),
      doencas: document.getElementById("saudeDoencas").value.trim(),
      alergias: document.getElementById("saudeAlergias").value.trim(),
      medicamentos: document.getElementById("saudeMedicamentos").value.trim(),
      checkup: document.getElementById("saudeCheckup").value.trim(),
    };

    DH.salvarSaude(dados);
    modalSaude.classList.remove("mostrar");
    renderizarPets();
  });

  renderizarPets();
})();