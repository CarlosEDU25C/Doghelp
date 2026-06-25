// =========================================================
// historico.js - Histórico de banhos (RF-08)
// DogHelp - Sistema de Gestão para Pet Shops
// =========================================================

(function () {
  const usuario = DH.usuarioLogado();
  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  const banhos = DH.banhosDoUsuario(usuario.id);
  const corpo = document.getElementById("corpoHistorico");

  if (banhos.length === 0) {
    corpo.innerHTML = `
      <tr class="estado-vazio-linha">
        <td colspan="6">Nenhum banho registrado ainda.</td>
      </tr>
    `;
    return;
  }

  corpo.innerHTML = banhos
    .map((banho) => {
      const pet = DH.obterPetPorId(banho.petId);
      const dataBanho = new Date(banho.dataBanho);
      const hoje = new Date();
      let status = "";
      let classeStatus = "";

      if (banho.proximoBanhoData) {
        const proxData = new Date(banho.proximoBanhoData);
        if (proxData < hoje) {
          status = "Atrasado";
          classeStatus = "selo-atrasado";
        } else if (proxData.toDateString() === hoje.toDateString()) {
          status = "Hoje";
          classeStatus = "selo-hoje";
        } else {
          status = "Agendado";
          classeStatus = "selo-ok";
        }
      } else {
        status = "Concluído";
        classeStatus = "selo-ok";
      }

      return `
      <tr>
        <td><strong>${pet ? pet.nome : "Pet removido"}</strong></td>
        <td>${dataBanho.toLocaleDateString("pt-BR")}</td>
        <td>${
          banho.proximoBanhoData
            ? new Date(banho.proximoBanhoData).toLocaleDateString("pt-BR") +
              " " +
              banho.proximoBanhoHorario
            : "—"
        }</td>
        <td><span class="selo ${classeStatus}">${status}</span></td>
        <td class="col-obs">${banho.observacoes || "—"}</td>
        <td class="col-acoes">
          <button class="btn btn-mini btn-red" data-excluir="${
            banho.id
          }">Excluir</button>
        </td>
      </tr>
    `;
    })
    .join("");

  document.querySelectorAll("[data-excluir]").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (confirm("Excluir este registro de banho?")) {
        DH.excluirBanho(this.dataset.excluir);
        window.location.reload();
      }
    });
  });
})();