import api from "../config/api";

const VagasController = {
  async getVagas() {
    try {
      const response = await api.get(
        "/api/VagaApiController.php?action=listar"
      );
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar vagas:", error);
      return { success: false, errors: ["Erro ao buscar vagas."] };
    }
  },

  async getVagaById(id) {
    try {
      const response = await api.get(
        `/api/VagaApiController.php?action=detalhes&id=${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao buscar vaga de id ${id}:`, error);
      return { success: false, errors: ["Erro ao carregar detalhes da vaga."] };
    }
  },

  async cadastrar(vaga) {
    try {
      const response = await api.post(
        "/api/VagaApiController.php?action=save",
        JSON.stringify(vaga),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao salvar vaga:", error);
      return (
        error.response?.data || {
          success: false,
          errors: ["Erro ao salvar vaga."],
        }
      );
    }
  },

  async create(params = {}) {
    try {
      const response = await api.post(
        "/api/VagaApiController.php?action=create",
        JSON.stringify(params),
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao carregar dados do cadastro de vaga:", error);
      return (
        error.response?.data || {
          success: false,
          errors: ["Erro ao carregar dados do cadastro."],
        }
      );
    }
  },

  async listarPorEmpresa(idEmpresa) {
    try {
      const response = await api.get(
        `/api/VagaApiController.php?action=listarPorEmpresa&id=${idEmpresa}`
      );
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao listar vagas por empresa:", error);
      return { success: false, vagas: [] };
    }
  },
  
  async getVagaEdit(id) {
    try {
      const response = await api.get(
        `/api/VagaApiController.php?action=edit&id=${id}`
      );
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao carregar vaga para edição:", error);
      return { success: false, errors: ["Erro ao carregar vaga."] };
    }
  },
  async inativarVaga(id) {
  try {
    const response = await api.get(`/api/VagaApiController.php?action=inativar&id=${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao inativar vaga:", error);
    return { success: false, errors: ["Erro ao inativar vaga."] };
  }
},
async alterarStatusVaga(id) {
  try {
    const response = await api.get(`/api/VagaApiController.php?action=alterarStatus&id=${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao alterar status da vaga:", error);
    return { success: false, errors: ["Erro ao alterar status da vaga."] };
  }
},


};

export default VagasController;
