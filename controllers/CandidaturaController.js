import api from "../config/api";

const CandidaturaController = {
  async candidatar(idUsuario, idVaga) {
    try {
      const response = await api.post("/api/CandidaturaApiController.php?action=candidatar", {
        id_usuario: idUsuario,
        id_vaga: idVaga,
      });
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao candidatar:", error);
      return error.response?.data || { success: false, errors: ["Erro ao conectar ao servidor."] };
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
      return error.response?.data || { success: false, errors: ["Erro ao verificar candidatura."] };
    }
  },
};

export default CandidaturaController;
