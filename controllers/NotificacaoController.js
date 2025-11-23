import api from "../config/api";

const NotificacaoController = {
 

  async getNotificacaoById(id) {
    try {
      const response = await api.get(
        `/api/NotificacaoApiController.php?action=detalhes&id=${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`❌ Erro ao buscar vaga de id ${id}:`, error);
      return { success: false, errors: ["Erro ao carregar detalhes da notificação."] };
    }
  },

  async listarPorUsuario(id) {
  try {
    const response = await api.post(
      `/api/NotificacaoApiController.php?action=listar`,
      { id_usuario: id },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao listar notificacões por usuario:", error);
    return { success: false, notificacoes: [] };
  }
},

async excluirNotificacao(id) {
    try {
      const response = await api.post(
        `/api/NotificacaoApiController.php?action=excluirNotificacao`,
        JSON.stringify({ id_notificacao: id }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return { success: false, errors: ["Erro ao carregar detalhes da vaga."] };
    }
  },

async marcarLido(id) {
 try {
        const response = await api.post(
        "/api/NotificacaoApiController.php?action=marcarLido",
        JSON.stringify({ id_notificacao: id }),
        {
            headers: { "Content-Type": "application/json" },
        }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return { success: false, errors: ["Erro ao marcar como lida"] };
    }
},

};

export default NotificacaoController;
