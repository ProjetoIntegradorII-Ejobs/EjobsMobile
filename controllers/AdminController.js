import api from "../config/api";

const AdminController = {
  async listarCargos() {
    try {
      const response = await api.get(
        "/api/CargoApiController.php?action=listar"
      );
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

  async editarCargo(id, nome) {
    try {
      const response = await api.post(
        "/api/CargoApiController.php?action=update",
        JSON.stringify({ id, nome }),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch {
      return { success: false, error: "Erro ao editar cargo" };
    }
  },

  async listarCategorias() {
    try {
      const response = await api.get(
        "/api/CategoriaApiController.php?action=listar"
      );
      return response.data;
    } catch {
      return { success: false, error: "Erro ao listar categorias" };
    }
  },

  async editarCategoria(id, nome, icone) {
    try {
      const response = await api.post(
        "/api/CategoriaApiController.php?action=update",
        JSON.stringify({ id, nome, icone }),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch {
      return { success: false, error: "Erro ao editar categoria" };
    }
  },

  async excluirCategoria(id) {
    try {
      const response = await api.post(
        "/api/CategoriaApiController.php?action=delete",
        JSON.stringify({ id }),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch {
      return { success: false, error: "Erro ao excluir categoria" };
    }
  },

  async excluirCargo(id) {
    try {
      const response = await api.post(
        "/api/CargoApiController.php?action=delete",
        JSON.stringify({ id }),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch {
      return { success: false, error: "Erro ao excluir cargo" };
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

  async listarUsuarios() {
    try {
      const response = await api.get(
        "/api/UsuarioApiController.php?action=listAllAdmin"
      );
      return response.data;
    } catch {
      return { success: false, error: "Erro ao listar usuários" };
    }
  },

  async listarEmpresasPendentes() {
    try {
      const response = await api.get(
        "/api/UsuarioApiController.php?action=listarPendentes"
      );
      return response.data;
    } catch {
      return { success: false, error: "Erro ao listar empresas pendentes" };
    }
  },

  async aprovarEmpresa(id) {
    try {
      const response = await api.post(
        "/api/UsuarioApiController.php?action=aprovarEmpresa",
        JSON.stringify({ id }),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch {
      return { success: false, error: "Erro ao aprovar empresa" };
    }
  },

  async alterarStatusUsuario(id, status) {
    try {
      const response = await api.post(
        "/api/UsuarioApiController.php?action=alterarStatus",
        JSON.stringify({ id, status }), // agora bate com o PHP
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch {
      return { success: false, error: "Erro ao alterar status do usuário" };
    }
  },

  async listarVagasAdmin() {
    try {
      const response = await api.get(
        "/api/VagaApiController.php?action=listarAdmin"
      );
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

  async listarCandidaturasAdmin() {
    try {
      const response = await api.get(
        "/api/CandidaturaApiController.php?action=listarAdmin"
      );
      return response.data;
    } catch {
      return { success: false, error: "Erro ao listar candidaturas" };
    }
  },
};

export default AdminController;
