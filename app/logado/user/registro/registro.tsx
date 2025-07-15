import { useRegistro } from '@/hooks/useRegistro';
import { useTheme } from '@/hooks/useTheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from "expo-router";
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    return `editado em: ${date.getDate()}/${date.getMonth() + 1}`;
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
      height: 100,
      backgroundColor: colors.item,
      marginTop: '15%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      elevation: 4,
      gap: 12
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
      fontFamily: 'Poppins-Medium',
      fontSize: 14,
      color: 'black'
    }
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
            <Text style={styles.editText}>{formatEditDate(registros.sintomas)}</Text>
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
            <Text style={styles.editText}>{formatEditDate(registros.humor)}</Text>
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
            <Text style={styles.editText}>{formatEditDate(registros.hidratacao)}</Text>
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
            <Text style={styles.editText}>{formatEditDate(registros.pressao)}</Text>
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
            <Text style={styles.editText}>{formatEditDate(registros.glicemia)}</Text>
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
            <Text style={styles.editText}>{formatEditDate(registros.imc)}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}