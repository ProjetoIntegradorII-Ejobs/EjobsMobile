import api from "../config/api";

const AdminController = {

  async listarCargos() {
    try {
      const response = await api.get("/api/CargoApiController.php?action=listar");
      return response.data;
    } catch {
      return { success: false, error: "Erro ao listar cargos" };
    }
  },

  async salvarCargo(nome) {
    try {
      const response = await api.post(
        "/api/CargoApiController.php?action=save",
        JSON.stringify({ nome }),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch {
      return { success: false, error: "Erro ao salvar cargo" };
    }
  },

  // -------------------------------
  // CATEGORIAS
  // -------------------------------
  async listarCategorias() {
    try {
      const response = await api.get("/api/CategoriaApiController.php?action=listar");
      return response.data;
    } catch {
      return { success: false, error: "Erro ao listar categorias" };
    }
  },

  async salvarCategoria(nome) {
    try {
      const response = await api.post(
        "/api/CategoriaApiController.php?action=save",
        JSON.stringify({ nome }),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch {
      return { success: false, error: "Erro ao salvar categoria" };
    }
  },

  // -------------------------------
  // USUÁRIOS
  // -------------------------------
  async listarUsuarios() {
    try {
      const response = await api.get("/api/UsuarioApiController.php?action=listAllAdmin");
      return response.data;
    } catch {
      return { success: false, error: "Erro ao listar usuários" };
    }
  },

  async alterarTipoUsuario(id, tipo) {
    try {
      const response = await api.post(
        "/api/UsuarioApiController.php?action=alterarTipo",
        JSON.stringify({ id, tipo }),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch {
      return { success: false, error: "Erro ao alterar tipo do usuário" };
    }
  },

  async alterarStatusUsuario(id, ativo) {
    try {
      const response = await api.post(
        "/api/UsuarioApiController.php?action=alterarStatus",
        JSON.stringify({ id, ativo }),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch {
      return { success: false, error: "Erro ao alterar status do usuário" };
    }
  },

  // -------------------------------
  // VAGAS
  // -------------------------------
  async listarVagasAdmin() {
    try {
      const response = await api.get("/api/VagaApiController.php?action=listarAdmin");
      return response.data;
    } catch {
      return { success: false, error: "Erro ao listar vagas" };
    }
  },

  async deletarVaga(id) {
    try {
      const response = await api.post(
        "/api/VagaApiController.php?action=delete",
        JSON.stringify({ id }),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch {
      return { success: false, error: "Erro ao deletar vaga" };
    }
  },

  // -------------------------------
  // CANDIDATURAS
  // -------------------------------
  async listarCandidaturasAdmin() {
    try {
      const response = await api.get("/api/CandidaturaApiController.php?action=listarAdmin");
      return response.data;
    } catch {
      return { success: false, error: "Erro ao listar candidaturas" };
    }
  },

  async alterarStatusCandidatura(id, status) {
    try {
      const response = await api.post(
        "/api/CandidaturaApiController.php?action=alterarStatus",
        JSON.stringify({ id, status }),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch {
      return { success: false, error: "Erro ao alterar status da candidatura" };
    }
  },
};

export default AdminController;
