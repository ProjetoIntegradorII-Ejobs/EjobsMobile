import api from "../config/api";

const CadastroController = {
  async register(usuario) {
    try {
      const response = await api.post("/api/CadastroApiController.php?action=save", usuario);
      return response.data;
    } catch (error) {
      return error.response?.data || { success: false, errors: ["Erro ao salvar usuário."] };
    }
  },

  async create() {
    try {
      const response = await api.get("/api/CadastroApiController.php?action=create");
      return response.data;
    } catch (error) {
      return error.response?.data || { success: false, errors: ["Erro ao carregar dados do cadastro."] };
    }
  },

  async carregaCidades(nome) {
     try {
      const response = await api.get("/controller/CidadeController.php", {
      params: {
        action: "listarPorNome",
        nome: nome
      }});
      return response.data;
    } catch (error) {
      return error.response?.data || { success: false, errors: ["Erro ao carregar cidades."] };
    }
  }
};

export default CadastroController;