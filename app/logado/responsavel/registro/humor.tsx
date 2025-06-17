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

const Humor = () => {
  const navigation = useNavigation();
  const [selectedMood, setSelectedMood] = useState<string>('feliz');
  const [note, setNote] = useState('');
  const { isDarkMode, toggleDarkMode, colors } = useTheme();

  const handleSave = () => {
    console.log('Humor selecionado:', selectedMood);
    console.log('Nota:', note);
  };

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
            <TouchableOpacity
              key={mood.key}
              style={[styles.moodButton, selected && styles.moodButtonSelected]}
              onPress={() => setSelectedMood(mood.key)}
            >
              <Image
                source={mood.image}
                style={{ width: 25, height: 25, marginRight: 4 }}
              />
              <Text style={[styles.moodButtonText, selected && styles.moodButtonTextSelected]}>
                {mood.label}
              </Text>
            </TouchableOpacity>
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

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
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
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  moodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F4FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#D6E1FF',
    margin: 4,
  },
  moodButtonSelected: {
    borderColor: Colors.light.bluePrimary,
    backgroundColor: Colors.light.bluePrimary,
  },
  moodButtonText: {
    fontFamily: 'Poppins-Regular',
    color: Colors.light.black,
    fontSize: 16,
  },
  moodButtonTextSelected: {
    color: '#fff',
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

export default Humor;