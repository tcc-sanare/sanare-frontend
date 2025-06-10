import Colors from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const moods = [
  {
    key: 'bom',
    label: 'Bom',
    color: '#7ED957',
    image: require('../../../../assets/images/bom.png'),
  },
  {
    key: 'neutro',
    label: 'Neutro',
    color: '#F6DF6A',
    image: require('../../../../assets/images/moderado.png'),
  },
  {
    key: 'ruim',
    label: 'Ruim',
    color: '#FF7F7F',
    image: require('../../../../assets/images/ruim.png'),
  },
];

const Humor = () => {
  const navigation = useNavigation();
  const [selectedMood, setSelectedMood] = useState<'bom' | 'neutro' | 'ruim'>('bom');
  const [note, setNote] = useState('');
  const { isDarkMode, toggleDarkMode, colors } = useTheme();

  const handleSave = () => {
    console.log('Humor selecionado:', selectedMood);
    console.log('Nota:', note);

  };

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: Colors.light.background,
      paddingHorizontal: 24,
      paddingTop: 60,
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
    moodContainer: {
      top: 120,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 16,
      marginBottom: 32,
    },
    moodOption: {
      alignItems: 'center',
      height: 100,
      width: 80,
    },
    circle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: Colors.light.bluePrimary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    circleSelected: {
      backgroundColor: Colors.light.bluePrimary,
    },
    moodCard: {
      width: 60,
      height: 90,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    moodLabel: {
      marginTop: 8,
      fontSize: 14,
      fontFamily: 'Poppins-Regular',
      color: Colors.light.black,
    },
    noteInput: {
      top: 180,
      width: '80%',
      borderBottomWidth: 1,
      borderBottomColor: Colors.light.gray,
      fontSize: 16,
      fontFamily: 'Poppins-Regular',
      paddingVertical: 8,
      marginBottom: 32,
      color: Colors.light.black,
    },
    pagination: {
      top: 190,
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 32,
    },
    dot: {
      width: 16,
      height: 4,
      borderRadius: 2,
      backgroundColor: '#ccc',
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: Colors.light.bluePrimary,
    },
    saveButton: {
      top: 200,
      backgroundColor: Colors.light.bluePrimary,
      paddingVertical: 16,
      paddingHorizontal: 40,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveButtonText: {
      color: Colors.light.white,
      fontSize: 16,
      fontFamily: 'Poppins-SemiBold',
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="left" size={30} color={Colors.light.bluePrimary} />
      </TouchableOpacity>

      <Text style={styles.title}>Humor</Text>
      <Text style={styles.subtitle}>Como está o seu humor hoje?</Text>

      <View style={styles.moodContainer}>
        {moods.map((mood) => {
          const selected = selectedMood === mood.key;
          return (
            <View key={mood.key} style={styles.moodOption}>
              <TouchableOpacity
                style={[styles.circle, selected && styles.circleSelected]}
                onPress={() => setSelectedMood(mood.key as typeof selectedMood)}
              >
                {selected && (
                  <AntDesign name="check" size={16} color={Colors.light.white} />
                )}
              </TouchableOpacity>

              <View style={[styles.moodCard, { backgroundColor: mood.color }]}>
                <Image
                  source={mood.image}
                  style={{ width: 32, height: 32, resizeMode: 'contain' }}
                />
              </View>

              <Text style={styles.moodLabel}>{mood.label}</Text>
            </View>
          );
        })}
      </View>


      <TextInput
        style={styles.noteInput}
        placeholder="Deixar nota"
        placeholderTextColor="#888"
        value={note}
        onChangeText={setNote}
      />

      <View style={styles.pagination}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      {/* Botão salvar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Humor;