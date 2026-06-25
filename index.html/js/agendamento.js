// =========================================================
// agendamento.js - Agendamento de banhos (RF-05)
// DogHelp - Sistema de Gestão para Pet Shops
// =========================================================

(function () {
  const usuario = DH.usuarioLogado();
  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  const pets = DH.petsDoUsuario(usuario.id);
  const selectPet = document.getElementById("selectPet");
  const blocoHorarios = document.getElementById("blocoHorarios");
  const corpoHorarios = document.getElementById("corpoHorarios");
  const resumoSelecao = document.getElementById("resumoSelecao");
  const resumoTexto = document.getElementById("resumoTexto");
  const blocoObservacoes = document.getElementById("blocoObservacoes");

  let petSelecionado = null;
  let horarioSelecionado = null;
  let dataSelecionada = null;

  pets.forEach((pet) => {
    const option = document.createElement("option");
    option.value = pet.id;
    option.textContent = pet.nome + " (" + pet.especie + ")";
    selectPet.appendChild(option);
  });

  selectPet.addEventListener("change", function () {
    const id = this.value;
    if (!id) {
      blocoHorarios.style.display = "none";
      blocoObservacoes.style.display = "none";
      return;
    }
    petSelecionado = DH.obterPetPorId(id);
    blocoHorarios.style.display = "block";
    gerarHorarios();
  });

  function gerarHorarios() {
    const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const horarios = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ];

    let html = "";

    horarios.forEach((hora) => {
      html += "<tr><td class='rotulo-hora'>" + hora + "</td>";
      dias.forEach((dia, index) => {
        const data = new Date();
        const diaSemana = data.getDay();
        const diff = index + 1 - (diaSemana === 0 ? 7 : diaSemana);
        data.setDate(data.getDate() + diff);
        const dataStr = data.toISOString().slice(0, 10);

        const banhos = DH.banhosDoUsuario(usuario.id);
        const ocupado = banhos.some(
          (b) =>
            b.petId === petSelecionado.id &&
            b.proximoBanhoData === dataStr &&
            b.proximoBanhoHorario === hora
        );

        html += "<td>";
        html +=
          "<button class='slot' data-data='" +
          dataStr +
          "' data-hora='" +
          hora +
          "' " +
          (ocupado ? "disabled" : "") +
          ">";
        html += ocupado ? "⛔" : "○";
        html += "</button>";
        html += "</td>";
      });
      html += "</tr>";
    });

    corpoHorarios.innerHTML = html;

    document.querySelectorAll(".slot:not(:disabled)").forEach((btn) => {
      btn.addEventListener("click", function () {
        document
          .querySelectorAll(".slot")
          .forEach((s) => s.classList.remove("selecionado"));
        this.classList.add("selecionado");

        horarioSelecionado = this.dataset.hora;
        dataSelecionada = this.dataset.data;

        const dataObj = new Date(dataSelecionada + "T00:00:00");
        resumoTexto.textContent =
          petSelecionado.nome +
          " - " +
          dataObj.toLocaleDateString("pt-BR") +
          " às " +
          horarioSelecionado;
        resumoSelecao.classList.add("mostrar");
        blocoObservacoes.style.display = "block";
      });
    });
  }

  document
    .getElementById("btnConfirmarBanho")
    .addEventListener("click", function () {
      if (!petSelecionado || !dataSelecionada || !horarioSelecionado) {
        alert("Selecione um horário primeiro.");
        return;
      }

      const observacoes = document.getElementById("obsBanho").value.trim();

      DH.cadastrarBanho({
        petId: petSelecionado.id,
        dataBanho: new Date().toISOString().slice(0, 10),
        proximoBanhoData: dataSelecionada,
        proximoBanhoHorario: horarioSelecionado,
        observacoes: observacoes || "Sem observações.",
      });

      alert("Banho agendado com sucesso!");

      horarioSelecionado = null;
      dataSelecionada = null;
      resumoSelecao.classList.remove("mostrar");
      blocoObservacoes.style.display = "none";
      document.getElementById("obsBanho").value = "";
      gerarHorarios();
    });
})();