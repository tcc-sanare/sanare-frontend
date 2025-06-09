import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const optionsList = [
  'Humor',
  'Sintomas',
  'IMC',
  'Hidratação',
  'Pressão Arterial',
  'Glicemia',
];

const Registro = () => {
  const navigation = useNavigation();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    'Humor',
    'Hidratação',
    'Pressão Arterial',
  ]);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSave = () => {
    console.log('Selecionados:', selectedOptions);
    navigation.navigate('humor' as never);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="left" size={30} color={Colors.light.bluePrimary} />
      </TouchableOpacity>

      <Text style={styles.title}>Registro</Text>
      <Text style={styles.subtitle}>Selecione o que você deseja monitorar:</Text>

      <View style={styles.optionsContainer}>
        {optionsList.map((option) => {
          const selected = selectedOptions.includes(option);
          return (
            <TouchableOpacity
              key={option}
              style={styles.optionRow}
              onPress={() => toggleOption(option)}
            >
              <View style={[styles.circle, selected && styles.circleSelected]}>
                {selected && (
                  <AntDesign name="check" size={16} color={Colors.light.white} />
                )}
              </View>
              <Text style={styles.optionLabel}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>


      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 32,
    top: 60,
    fontFamily: 'Poppins-Regular',
    color: Colors.light.bluePrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    top: 90,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 24,
    color: Colors.light.black,
  },
  optionsContainer: {
    left: 50,
    top: 160,
    width: '100%',
    marginBottom: 40,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.bluePrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  circleSelected: {
    backgroundColor: Colors.light.bluePrimary,
  },
  optionLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.light.black,
  },
  saveButton: {
    top: 200,
    width: 150,
    backgroundColor: Colors.light.bluePrimary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: Colors.light.white,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});

export default Registro;