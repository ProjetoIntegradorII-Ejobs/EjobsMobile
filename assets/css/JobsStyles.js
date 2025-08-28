import { StyleSheet } from "react-native";

export const jobsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // Header Azul
  header: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 15,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginLeft: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#fff',
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Conteúdo Principal
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
  },

  // Seção de Busca e Filtros
  searchSection: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  filterGroup: {
    flex: 1,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  filterDropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderStyle: 'solid',
  },
  filterDropdownText: {
    fontSize: 14,
    color: '#64748b',
  },
  filterButtonContainer: {
    justifyContent: 'flex-end',
  },
  filterButton: {
    backgroundColor: '#49BA49',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Lista de Vagas
  jobsContainer: {
    gap: 20,
    marginBottom: 30,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  jobCompany: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 15,
    fontWeight: '500',
  },
  jobDetails: {
    gap: 8,
    marginBottom: 20,
  },
  jobDetail: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  jobDetailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    width: 80,
    marginRight: 10,
  },
  jobDetailValue: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
  },
  detailsButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Botão Voltar
  backButton: {
    backgroundColor: '#64748b',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
