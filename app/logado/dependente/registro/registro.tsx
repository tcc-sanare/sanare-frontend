import { useRegistro } from '@/hooks/useRegistro';
import { useTheme } from '@/hooks/useTheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from "expo-router";
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const symptoms = [
  { key: 'calafrio', label: 'Calafrio' },
  { key: 'febre', label: 'Febre' },
  { key: 'palpitacao', label: 'Palpitação' },
  { key: 'visao-turva', label: 'Visão Turva' },
  { key: 'sangramento-nasal', label: 'Sangramento Nasal' },
  { key: 'tosse', label: 'Tosse' },
  { key: 'perda-apetite', label: 'Perda de Apetite' },
  { key: 'sono-alterado', label: 'Alterações no sono' },
  { key: 'nausea', label: 'Náusea ou enjoo' },
  { key: 'tontura', label: 'Tontura' },
  { key: 'sangramento-retal', label: 'Sangramento Retal' },
  { key: 'palidez', label: 'Palidez' },
  { key: 'colica-abdominal', label: 'Cólica Abdominal' },
  { key: 'falta-de-ar', label: 'Falta de ar' },
  { key: 'dor-no-peito', label: 'Dor no peito' },
  { key: 'inchaco', label: 'Inchaço no corpo' },
  { key: 'diarreia', label: 'Diarreia' },
  { key: 'fadiga', label: 'Cansaço / Fadiga' },
  { key: 'dor-muscular', label: 'Dor Muscular' },
  { key: 'dor-de-cabeca', label: 'Dor de cabeça' },
  { key: 'dor-articulacoes', label: 'Dor nas articulações' },
];

const moods = [
  { key: 'calmo', label: 'Calmo', image: require('../../../../assets/images/calmo.png') },
  { key: 'feliz', label: 'Feliz', image: require('../../../../assets/images/feliz.png') },
  { key: 'energetico', label: 'Energético', image: require('../../../../assets/images/energetico.png') },
  { key: 'irritado', label: 'Irritado', image: require('../../../../assets/images/irritado.png') },
  { key: 'pouca-energia', label: 'Pouca energia', image: require('../../../../assets/images/pouca-energia.png') },
  { key: 'triste', label: 'Triste', image: require('../../../../assets/images/triste.png') },
  { key: 'confuso', label: 'Desnorteado / Confuso', image: require('../../../../assets/images/confuso.png') },
  { key: 'desanimado', label: 'Desanimado', image: require('../../../../assets/images/desanimado.png') },
  { key: 'ansioso', label: 'Ansioso', image: require('../../../../assets/images/ansioso.png') },
  { key: 'mudanca', label: 'Mudanças de humor', image: require('../../../../assets/images/mudanca.png') },
];

export default function Registro() {
  const { isDarkMode, toggleDarkMode, colors } = useTheme();
  const router = useRouter();
  const { registros, loadRegistros } = useRegistro();
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString('pt-BR', { month: 'long' });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  useFocusEffect(
    React.useCallback(() => {
      loadRegistros();
    }, [])
  );

  const formatEditDate = (dateString?: string) => {
    if (!dateString) return 'nunca editado';

    const date = new Date(dateString);
    return `Editado em: ${date.getDate()}/${date.getMonth() + 1}`;
  };

  const getImcColor = (imc: number) => {
    if (imc < 18.5) return '#fbd115'; // Abaixo do peso
    if (imc < 25) return 'green';    // Normal
    if (imc < 30) return 'orange';   // Sobrepeso
    return '#fc3d0d';                    // Obesidade
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background
    },
    seta: {
      margin: 45,
      resizeMode: 'contain',
      marginTop: '20%'
    },
    TittleView: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '10%'
    },
    tittle: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 24,
      color: colors.black
    },
    dateText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 20,
      color: colors.blackOpacity,
      marginTop: 4
    },
    text: {
      fontFamily: 'Poppins-Medium',
      fontSize: 24,
      color: colors.bluePrimary
    },
    subText: {
      color: colors.black,
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
    },
    saveButton: {
      width: 200,
      backgroundColor: colors.bluePrimary,
      paddingVertical: 16,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25
    },
    saveButtonText: {
      color: colors.white,
      fontSize: 20,
      fontFamily: 'Poppins-Regular',
    },
    card: {
      width: '80%',
      height: 'auto',
      padding: 16,
      backgroundColor: colors.saudeCard,
      marginTop: '15%',
      borderRadius: 12,
      elevation: 4,
      gap: 12,
    },
    cardTittle: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      paddingHorizontal: 16
    },
    arrowIcon: {
      position: 'absolute',
      right: 30
    },
    registroText: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 18,
      color: colors.bluePrimary
    },
    editText: {
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
      color: 'black'
    },
    editTextIMC: {
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      paddingHorizontal: 18,
      paddingVertical: 6,
      borderRadius: 16,
      color: 'white',
      marginTop: 8,
    },
    lastSymptomsContainer: {
      width: '100%',
      paddingHorizontal: 16,
      gap: 8,
      marginTop: 8,
    },
    lastSymptomsTitle: {
      fontFamily: 'Poppins-Medium',
      fontSize: 14,
      color: 'black',
    },
    symptomsList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 8,
      justifyContent: 'center',
    },
    symptomItem: {
      backgroundColor: '#005EB7CC',
      borderRadius: 16,
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    symptomText: {
      fontFamily: 'Poppins-Medium',
      fontSize: 14,
      color: '#fff',
    },
    lastRecordContainer: {
      width: '100%',
      paddingHorizontal: 16,
      gap: 10,
      marginTop: 8,
    },
    recordRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8
    },
  })

  return (
    <View style={styles.container}>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => router.push('../home')}>
          <Image
            source={require('../../../../assets/images/seta.png')}
            style={styles.seta}
          />
        </TouchableOpacity>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '20%' }}>
          <View style={styles.TittleView}>
            <Text style={styles.tittle}>Hoje</Text>
            <Text style={styles.dateText}>{day} de {capitalizedMonth}</Text>
          </View>

          <View style={styles.TittleView}>
            <Text style={styles.text}>Como você está?</Text>
            <Text style={styles.subText}>Faça registro dos seus sintomas!</Text>
          </View>

          <TouchableOpacity
            onPress={() => router.replace('./edit-registro')}
            style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Editar registros</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { router.push('./sintomas') }}
            style={styles.card}>
            <View style={styles.cardTittle}>
              <Text style={styles.registroText}>Sintomas</Text>
              <MaterialIcons
                name='arrow-forward-ios'
                size={18}
                color={'black'}
                style={styles.arrowIcon}
              />
            </View>

            {registros.sintomas?.symptoms && (
              <View style={styles.lastSymptomsContainer}>
                <Text style={styles.editText}>{formatEditDate(registros.sintomas?.date)}</Text>
                <Text style={styles.lastSymptomsTitle}>Último registro:</Text>
                <View style={styles.symptomsList}>
                  {registros.sintomas.symptoms.map((symptom, index) => {
                    const symptomLabel = symptoms.find(s => s.key === symptom)?.label || symptom;
                    return (
                      <View key={index} style={styles.symptomItem}>
                        <Text style={styles.symptomText}>{symptomLabel}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { router.push('./humor') }}
            style={styles.card}>
            <View style={styles.cardTittle}>
              <Text style={styles.registroText}>Humor</Text>
              <MaterialIcons
                name='arrow-forward-ios'
                size={18}
                color={'black'}
                style={styles.arrowIcon}
              />
            </View>

            {registros.humor?.moods && (
              <View style={styles.lastSymptomsContainer}>
                <Text style={styles.editText}>{formatEditDate(registros.humor?.date)}</Text>
                <Text style={styles.lastSymptomsTitle}>Último registro:</Text>
                <View style={styles.symptomsList}>
                  {registros.humor.moods.map((symptom, index) => {
                    const symptomLabel = moods.find(s => s.key === symptom)?.label || symptom;
                    return (
                      <View key={index} style={styles.symptomItem}>
                        <Text style={styles.symptomText}>{symptomLabel}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { router.push('./hidratacao') }}
            style={styles.card}>
            <View style={styles.cardTittle}>
              <Text style={styles.registroText}>Hidratação</Text>
              <MaterialIcons
                name='arrow-forward-ios'
                size={18}
                color={'black'}
                style={styles.arrowIcon}
              />
            </View>

            {registros.hidratacao?.litros && (
              <View style={{ paddingHorizontal: 16 }}>
                <Text style={styles.editText}>{formatEditDate(registros.hidratacao?.date)}</Text>
                <View style={{ flexDirection: 'row', gap: 4, paddingVertical: 8 }}>
                  <Text style={styles.lastSymptomsTitle}>Último registro:</Text>
                  <Text style={styles.lastSymptomsTitle}>{registros.hidratacao.litros} litros</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { router.push('./pressao') }}
            style={styles.card}>
            <View style={styles.cardTittle}>
              <Text style={styles.registroText}>Pressão Arterial</Text>
              <MaterialIcons
                name='arrow-forward-ios'
                size={18}
                color={'black'}
                style={styles.arrowIcon}
              />
            </View>

            {registros.pressao && (
              <View style={{ paddingHorizontal: 16 }}>
                <Text style={styles.editText}>{formatEditDate(registros.pressao?.date)}</Text>
                <View style={{ flexDirection: 'row', gap: 4, paddingVertical: 8 }}>
                  <Text style={styles.lastSymptomsTitle}>Último registro:</Text>
                  <Text style={styles.lastSymptomsTitle}>
                    {registros.pressao.sistolica}/{registros.pressao.diastolica} mmHg
                  </Text>
                </View>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { router.push('./glicemia') }}
            style={styles.card}>
            <View style={styles.cardTittle}>
              <Text style={styles.registroText}>Glicemia</Text>
              <MaterialIcons
                name='arrow-forward-ios'
                size={18}
                color={'black'}
                style={styles.arrowIcon}
              />
            </View>

            {registros.glicemia && (
              <View style={styles.lastRecordContainer}>
                <Text style={styles.editText}>{formatEditDate(registros.glicemia?.date)}</Text>
                <View>
                  <Text style={styles.lastSymptomsTitle}>Último registro:</Text>

                  <View style={styles.recordRow}>
                    <Text style={styles.editText}>Medição:</Text>
                    <Text style={styles.editText}>{registros.glicemia.valor} mg/dL</Text>
                  </View>

                  <View style={styles.recordRow}>
                    <Text style={styles.editText}>Horário:</Text>
                    <Text style={styles.editText}>{registros.glicemia.horario}</Text>
                  </View>
                </View>

                {/* <View style={styles.recordRow}>
                  <Text style={styles.editText}>Situação:</Text>
                  <Text style={styles.editText}>
                    {tiposMedicao.find(t => t.value === registros.glicemia?.situacao)?.label || 'Desconhecido'}
                  </Text>
                </View> */}
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { router.push('./imc') }}
            style={styles.card}>
            <View style={styles.cardTittle}>
              <Text style={styles.registroText}>IMC</Text>
              <MaterialIcons
                name='arrow-forward-ios'
                size={18}
                color={'black'}
                style={styles.arrowIcon}
              />
            </View>

            {registros.imc && (
              <View style={styles.lastRecordContainer}>
                <Text style={styles.editText}>{formatEditDate(registros.imc.date)}</Text>
                <View>
                  <Text style={styles.lastSymptomsTitle}>Último registro:</Text>

                  <View style={styles.recordRow}>
                    <Text style={styles.editText}>Altura:</Text>
                    <Text style={styles.editText}>{registros.imc.altura} m</Text>
                  </View>

                  <View style={styles.recordRow}>
                    <Text style={styles.editText}>Peso:</Text>
                    <Text style={styles.editText}>{registros.imc.peso} kg</Text>
                  </View>

                  <View style={styles.symptomsList}>
                    <Text style={[
                      styles.editTextIMC,
                      { backgroundColor: getImcColor(parseFloat(registros.imc.valor)) }
                    ]}>
                      {registros.imc.valor}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}