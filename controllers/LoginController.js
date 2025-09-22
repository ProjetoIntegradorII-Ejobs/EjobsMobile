import api from '../config/api'; 

const LoginController = {
  async login(email, senha) {
    try {
      const response = await api.post('/api/LoginApiController.php?action=logon', {
        email,
        senha
      });

      return response.data; 
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return { success: false, errors: ["Sem resposta do servidor"] };
      } else {
        return { success: false, errors: [error.message] };
      }
    }
  }
};

export default LoginController;
