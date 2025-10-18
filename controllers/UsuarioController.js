import api from "../config/api";

const UsuarioController = {
  async update(usuario) {
    try {
      const response = await api.post(
        "/api/UsuarioApiController.php?action=update",
        JSON.stringify(usuario),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(" Enviado para API:", usuario);
      console.log(" Resposta da API:", response.data);

      return response.data;
    } catch (error) {
      console.error(" Erro na requisição UPDATE:", error);
      return error.response?.data || {
        success: false,
        errors: ["Falha na comunicação com o servidor."],
      };
    }
  },
};

export default UsuarioController;
