import api from "../config/api";

const CandidaturaController = {
  async candidatar(idUsuario, idVaga) {
    try {
      const response = await api.post(
        "/api/CandidaturaApiController.php?action=candidatar",
        {
          id_usuario: idUsuario,
          id_vaga: idVaga,
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao candidatar:", error);
      return (
        error.response?.data || {
          success: false,
          errors: ["Erro ao conectar ao servidor."],
        }
      );
    }
  },

  async listarPorVaga(idVaga) {
    try {
      const response = await api.get(
        `/api/CandidaturaApiController.php?action=listarPorVaga&id_vaga=${idVaga}`
      );
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao listar candidatos:", error);
      return { success: false, errors: ["Erro ao buscar candidatos."] };
    }
  },

  async verificar(idUsuario, idVaga) {
    try {
      const response = await api.get(
        `/api/CandidaturaApiController.php?action=verificar&id_usuario=${idUsuario}&id_vaga=${idVaga}`
      );
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao verificar candidatura:", error);
      return (
        error.response?.data || {
          success: false,
          errors: ["Erro ao verificar candidatura."],
        }
      );
    }
  },

  async getCandidaturaByUsuario(id) {
    try {
      const response = await api.post(
        `/api/CandidaturaApiController.php?action=minhasCandidaturas&id=${id}`,
        JSON.stringify({ id_usuario: id }),
      {
        headers: { "Content-Type": "application/json" },
      }
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao buscar candidaturas`, error);
      return { success: false, errors: ["Erro ao carregar detalhes da vaga."] };
    }
  },

  async cancelarCandidatura(id) {
  }
};

export default CandidaturaController;
