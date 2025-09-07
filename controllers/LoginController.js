import api from '../config/api'; 

const LoginController = {
  async login(email, senha) {
    try {
      const response = await api.post('LoginApiController.php?action=login', {
        email,
        senha
      });

      return response.data; 
    } catch (error) {
      if (error.response) {
        return { error: error.response.data.error };
      } else if (error.request) {
        return { error: "Sem resposta do servidor" };
      } else {
        return { error: error.message };
      }
    }
  }
};

export default LoginController;
