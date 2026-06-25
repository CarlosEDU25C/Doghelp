// =========================================================
// auth.js - Controle de autenticação
// DogHelp - Sistema de Gestão para Pet Shops
// =========================================================

(function () {
  const usuario = DH.usuarioLogado();
  const isLoginPage =
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname === "";

  if (usuario && isLoginPage) {
    window.location.href = "dashboard.html";
    return;
  }

  if (!usuario && !isLoginPage) {
    window.location.href = "index.html";
    return;
  }

  if (usuario && document.getElementById("nomeUsuario")) {
    document.getElementById("nomeUsuario").textContent = usuario.nome;
  }

  /* ---------- LOGIN ---------- */
  const btnLogin = document.getElementById("btnLogin");
  if (btnLogin) {
    btnLogin.addEventListener("click", function (e) {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const senha = document.getElementById("loginSenha").value.trim();
      const alerta = document.getElementById("alertaLogin");

      if (!email || !senha) {
        alerta.textContent = "Preencha todos os campos.";
        alerta.className = "alerta alerta-erro mostrar";
        return;
      }

      const result = DH.autenticar(email, senha);
      if (!result.ok) {
        alerta.textContent = result.erro;
        alerta.className = "alerta alerta-erro mostrar";
        return;
      }

      DH.iniciarSessao(result.usuario.id);
      window.location.href = "dashboard.html";
    });
  }

  /* ---------- CADASTRO (RF-01) ---------- */
  const btnCadastrar = document.getElementById("btnCadastrar");
  if (btnCadastrar) {
    btnCadastrar.addEventListener("click", function (e) {
      e.preventDefault();
      const nome = document.getElementById("cadNome").value.trim();
      const email = document.getElementById("cadEmail").value.trim();
      const senha = document.getElementById("cadSenha").value.trim();
      const telefone = document.getElementById("cadTelefone").value.trim();
      const endereco = document.getElementById("cadEndereco").value.trim();
      const alerta = document.getElementById("alertaCadastro");

      if (!nome || !email || !senha) {
        alerta.textContent = "Preencha todos os campos obrigatórios.";
        alerta.className = "alerta alerta-erro mostrar";
        return;
      }

      if (senha.length < 6) {
        alerta.textContent = "A senha deve ter no mínimo 6 caracteres.";
        alerta.className = "alerta alerta-erro mostrar";
        return;
      }

      const result = DH.cadastrarUsuario({ nome, email, senha, telefone, endereco });
      if (!result.ok) {
        alerta.textContent = result.erro;
        alerta.className = "alerta alerta-erro mostrar";
        return;
      }

      alerta.textContent = "Cadastro realizado com sucesso! Faça login.";
      alerta.className = "alerta alerta-sucesso mostrar";

      document.getElementById("cadNome").value = "";
      document.getElementById("cadEmail").value = "";
      document.getElementById("cadSenha").value = "";
      document.getElementById("cadTelefone").value = "";
      document.getElementById("cadEndereco").value = "";

      setTimeout(() => {
        document.getElementById("cadastroForm").classList.add("oculto");
        document.getElementById("loginForm").classList.remove("oculto");
        alerta.className = "alerta";
      }, 1500);
    });
  }

  /* ---------- ALTERNAR TELAS ---------- */
  const irCadastro = document.getElementById("irCadastro");
  const irLogin = document.getElementById("irLogin");

  if (irCadastro) {
    irCadastro.addEventListener("click", function (e) {
      e.preventDefault();
      document.getElementById("loginForm").classList.add("oculto");
      document.getElementById("cadastroForm").classList.remove("oculto");
      document.getElementById("alertaLogin").className = "alerta";
      document.getElementById("alertaCadastro").className = "alerta";
    });
  }

  if (irLogin) {
    irLogin.addEventListener("click", function (e) {
      e.preventDefault();
      document.getElementById("cadastroForm").classList.add("oculto");
      document.getElementById("loginForm").classList.remove("oculto");
      document.getElementById("alertaLogin").className = "alerta";
      document.getElementById("alertaCadastro").className = "alerta";
    });
  }

  /* ---------- SAIR ---------- */
  const btnSair = document.getElementById("btnSair");
  if (btnSair) {
    btnSair.addEventListener("click", function () {
      DH.encerrarSessao();
      window.location.href = "index.html";
    });
  }
})();