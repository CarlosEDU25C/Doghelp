/* =========================================================
   storage.js - Camada de persistência (localStorage)
   DogHelp - Sistema de Gestão para Pet Shops
   ========================================================= */

const DH = (function () {
  const CHAVES = {
    USUARIOS: "dh_usuarios",
    PETS: "dh_pets",
    BANHOS: "dh_banhos",
    SAUDE: "dh_saude",
    SESSAO: "dh_sessao_usuario_id",
  };

  function lerLista(chave) {
    try {
      const dados = JSON.parse(localStorage.getItem(chave));
      return Array.isArray(dados) ? dados : [];
    } catch (e) {
      return [];
    }
  }

  function salvarLista(chave, lista) {
    localStorage.setItem(chave, JSON.stringify(lista));
  }

  function gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  /* ---------------- USUÁRIOS ---------------- */

  function obterUsuarios() {
    return lerLista(CHAVES.USUARIOS);
  }

  function encontrarUsuarioPorEmail(email) {
    return obterUsuarios().find(
      (u) => u.email.toLowerCase() === String(email).toLowerCase()
    );
  }

  function cadastrarUsuario({ nome, email, senha, telefone, endereco }) {
    if (encontrarUsuarioPorEmail(email)) {
      return { ok: false, erro: "Este e-mail já está cadastrado." };
    }
    const usuarios = obterUsuarios();
    const novoUsuario = {
      id: gerarId(),
      nome: nome.trim(),
      email: email.trim(),
      senha: senha,
      telefone: telefone || "",
      endereco: endereco || "",
    };
    usuarios.push(novoUsuario);
    salvarLista(CHAVES.USUARIOS, usuarios);
    return { ok: true, usuario: novoUsuario };
  }

  function autenticar(email, senha) {
    const usuario = encontrarUsuarioPorEmail(email);
    if (!usuario || usuario.senha !== senha) {
      return { ok: false, erro: "E-mail ou senha incorretos." };
    }
    return { ok: true, usuario };
  }

  function iniciarSessao(usuarioId) {
    localStorage.setItem(CHAVES.SESSAO, usuarioId);
  }

  function encerrarSessao() {
    localStorage.removeItem(CHAVES.SESSAO);
  }

  function usuarioLogado() {
    const id = localStorage.getItem(CHAVES.SESSAO);
    if (!id) return null;
    return obterUsuarios().find((u) => u.id === id) || null;
  }

  /* ---------------- PETS ---------------- */

  function obterPets() {
    return lerLista(CHAVES.PETS);
  }

  function petsDoUsuario(usuarioId) {
    return obterPets().filter((p) => p.usuarioId === usuarioId);
  }

  function obterPetPorId(id) {
    return obterPets().find((p) => p.id === id) || null;
  }

  function cadastrarPet(dados) {
    const pets = obterPets();
    const novoPet = { id: gerarId(), ...dados };
    pets.push(novoPet);
    salvarLista(CHAVES.PETS, pets);
    return novoPet;
  }

  function atualizarPet(id, dados) {
    const pets = obterPets().map((p) => (p.id === id ? { ...p, ...dados } : p));
    salvarLista(CHAVES.PETS, pets);
  }

  function excluirPet(id) {
    salvarLista(CHAVES.PETS, obterPets().filter((p) => p.id !== id));
    salvarLista(CHAVES.BANHOS, obterBanhos().filter((b) => b.petId !== id));
    salvarLista(CHAVES.SAUDE, obterSaude().filter((s) => s.petId !== id));
  }

  /* ---------------- SAÚDE (RF-04) ---------------- */

  function obterSaude() {
    return lerLista(CHAVES.SAUDE);
  }

  function saudeDoPet(petId) {
    return obterSaude().find((s) => s.petId === petId) || null;
  }

  function salvarSaude(dados) {
    const saude = obterSaude();
    const existente = saude.findIndex((s) => s.petId === dados.petId);
    if (existente >= 0) {
      saude[existente] = { ...saude[existente], ...dados };
    } else {
      saude.push({ id: gerarId(), ...dados });
    }
    salvarLista(CHAVES.SAUDE, saude);
  }

  /* ---------------- BANHOS (RF-05) ---------------- */

  function obterBanhos() {
    return lerLista(CHAVES.BANHOS);
  }

  function banhosDoUsuario(usuarioId) {
    const idsPets = petsDoUsuario(usuarioId).map((p) => p.id);
    return obterBanhos()
      .filter((b) => idsPets.includes(b.petId))
      .sort((a, b) => new Date(b.dataBanho) - new Date(a.dataBanho));
  }

  function banhosDoPet(petId) {
    return obterBanhos()
      .filter((b) => b.petId === petId)
      .sort((a, b) => new Date(b.dataBanho) - new Date(a.dataBanho));
  }

  function cadastrarBanho(dados) {
    const banhos = obterBanhos();
    const novoBanho = { id: gerarId(), ...dados };
    banhos.push(novoBanho);
    salvarLista(CHAVES.BANHOS, banhos);
    return novoBanho;
  }

  function excluirBanho(id) {
    salvarLista(CHAVES.BANHOS, obterBanhos().filter((b) => b.id !== id));
  }

  /* ---------------- EXPORTS ---------------- */

  return {
    cadastrarUsuario,
    autenticar,
    iniciarSessao,
    encerrarSessao,
    usuarioLogado,
    obterUsuarios,
    petsDoUsuario,
    obterPetPorId,
    cadastrarPet,
    atualizarPet,
    excluirPet,
    saudeDoPet,
    salvarSaude,
    banhosDoUsuario,
    banhosDoPet,
    cadastrarBanho,
    excluirBanho,
  };
})();