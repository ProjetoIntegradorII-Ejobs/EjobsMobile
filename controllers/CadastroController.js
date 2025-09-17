import api from "../config/api";

const CadastroController = {
  async register(usuario) {
    try {
      const response = await api.post("/CadastroController.php?action=save", usuario);
      return response.data;
    } catch (error) {
      return error.response?.data || { success: false, errors: ["Erro ao salvar usuário."] };
    }
  },

  async create() {
    try {
      const response = await api.get("/CadastroController.php?action=create");
      return response.data;
    } catch (error) {
      return error.response?.data || { success: false, errors: ["Erro ao carregar dados do cadastro."] };
    }
  },
};

export default CadastroController;