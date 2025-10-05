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
  },
  async getVagaById(id) {
    try {
        const response = await api.get(`/api/VagaApiController.php?action=detalhes&id=${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar vaga de id ${id}:`, error);
        throw error;
    }
}

};

export default VagasController;
