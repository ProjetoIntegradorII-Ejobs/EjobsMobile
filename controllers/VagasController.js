import api from '../config/api';

const VagasController = {
  async getVagas() {
    try {
      const response = await api.get('/api/VagaApiController.php?action=listar'); 
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
      throw error;
    }
  }
};

export default VagasController;
