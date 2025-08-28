import React, { useState } from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  SafeAreaView,
  Alert
} from 'react-native';
import { jobsStyles } from '../assets/css/JobsStyles';

export default function Jobs({ navigation }) {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchCity, setSearchCity] = useState('');

  const jobs = [
    {
      id: 1,
      title: 'Desenvolvedor PHP Pleno',
      company: 'Empresa XYZ',
      modality: 'Home Office',
      schedule: '10h',
      regime: 'CLT',
      salary: 'R$ 5.000,00',
      role: 'Desenvolvedor Backend',
      requirements: 'Experiência com Laravel, MySQL, Git',
      description: 'Desenvolvimento de aplicações web em PHP'
    },
    {
      id: 2,
      title: 'Programador React',
      company: 'Microsoft',
      modality: 'Presencial',
      schedule: '44h',
      regime: 'CLT',
      salary: 'R$ 2.000,00',
      role: 'Designer UI/UX',
      requirements: 'Javascript, HTML, CSS, React',
      description: 'Programador Front End para atuar na empresa Microsoft'
    }
  ];

  const handleFilter = () => {
    Alert.alert('Ainda não funcinona');
  };

  const handleJobDetails = (job) => {
    Alert.alert('Detalhes da Vaga', `${job.title}\n\n${job.description}`);
  };


  return (
    <SafeAreaView style={jobsStyles.container}>

      <ScrollView style={jobsStyles.content} showsVerticalScrollIndicator={false}>
        <Text style={jobsStyles.mainTitle}>Vagas</Text>

        <View style={jobsStyles.searchSection}>
          <View style={jobsStyles.searchRow}>
            <TextInput
              style={jobsStyles.searchInput}
              placeholder="Digite o título da vaga"
              value={searchTitle}
              onChangeText={setSearchTitle}
            />
            <TextInput
              style={jobsStyles.searchInput}
              placeholder="Busca por cidade"
              value={searchCity}
              onChangeText={setSearchCity}
            />
          </View>

          <View style={jobsStyles.filtersRow}>
            <View style={jobsStyles.filterGroup}>
              <Text style={jobsStyles.filterLabel}>Modalidade</Text>
              <TouchableOpacity style={jobsStyles.filterDropdown}>
                <Text style={jobsStyles.filterDropdownText}>Selecionar</Text>
              </TouchableOpacity>
            </View>
            <View style={jobsStyles.filterGroup}>
              <Text style={jobsStyles.filterLabel}>Horário</Text>
              <TouchableOpacity style={jobsStyles.filterDropdown}>
                <Text style={jobsStyles.filterDropdownText}>Selecionar</Text>
              </TouchableOpacity>
            </View>
            <View style={jobsStyles.filterGroup}>
              <Text style={jobsStyles.filterLabel}>Regime</Text>
              <TouchableOpacity style={jobsStyles.filterDropdown}>
                <Text style={jobsStyles.filterDropdownText}>Selecionar</Text>
              </TouchableOpacity>
            </View>
            <View style={jobsStyles.filterGroup}>
              <Text style={jobsStyles.filterLabel}>Salário</Text>
              <TouchableOpacity style={jobsStyles.filterDropdown}>
                <Text style={jobsStyles.filterDropdownText}>Selecionar</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

        <View style={jobsStyles.jobsContainer}>
          {jobs.map((job) => (
            <View key={job.id} style={jobsStyles.jobCard}>
              <Text style={jobsStyles.jobTitle}>{job.title}</Text>
              <Text style={jobsStyles.jobCompany}>{job.company}</Text>
              
              <View style={jobsStyles.jobDetails}>
                <View style={jobsStyles.jobDetail}>
                  <Text style={jobsStyles.jobDetailLabel}>Modalidade:</Text>
                  <Text style={jobsStyles.jobDetailValue}>{job.modality}</Text>
                </View>
                <View style={jobsStyles.jobDetail}>
                  <Text style={jobsStyles.jobDetailLabel}>Horário:</Text>
                  <Text style={jobsStyles.jobDetailValue}>{job.schedule}</Text>
                </View>
                <View style={jobsStyles.jobDetail}>
                  <Text style={jobsStyles.jobDetailLabel}>Regime:</Text>
                  <Text style={jobsStyles.jobDetailValue}>{job.regime}</Text>
                </View>
                <View style={jobsStyles.jobDetail}>
                  <Text style={jobsStyles.jobDetailLabel}>Salário:</Text>
                  <Text style={jobsStyles.jobDetailValue}>{job.salary}</Text>
                </View>
                <View style={jobsStyles.jobDetail}>
                  <Text style={jobsStyles.jobDetailLabel}>Cargo:</Text>
                  <Text style={jobsStyles.jobDetailValue}>{job.role}</Text>
                </View>
                <View style={jobsStyles.jobDetail}>
                  <Text style={jobsStyles.jobDetailLabel}>Requisitos:</Text>
                  <Text style={jobsStyles.jobDetailValue}>{job.requirements}</Text>
                </View>
                <View style={jobsStyles.jobDetail}>
                  <Text style={jobsStyles.jobDetailLabel}>Descrição:</Text>
                  <Text style={jobsStyles.jobDetailValue}>{job.description}</Text>
                </View>
              </View>

              <TouchableOpacity 
                style={jobsStyles.detailsButton}
                onPress={() => handleJobDetails(job)}
              >
                <Text style={jobsStyles.detailsButtonText}>Detalhes</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
