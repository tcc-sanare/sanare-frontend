import { useRegistro } from '@/hooks/useRegistro';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  const [selectedMood, setSelectedMood] = useState<string>('feliz');
  const { isDarkMode, toggleDarkMode, colors } = useTheme();
  const router = useRouter();
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const { updateRegistro } = useRegistro();

  const handleSave = async () => {
    try {
      const now = new Date().toISOString();
      const success = await updateRegistro('humor', now);

      if (success) {
        router.push('./registro');
      } else {
        console.log('Falha ao salvar o registro');
      }
    } catch (error) {
      console.error('Erro no handleSave:', error);
    }
  };

  const toggleMoodSelection = (moodKey: string) => {
    setSelectedMoods(prev => {
      if (prev.includes(moodKey)) {
        return prev.filter(key => key !== moodKey);
      } else {
        return [...prev, moodKey];
      }
    });
  };

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    seta: {
      margin: 45,
      resizeMode: 'contain',
      marginTop: '20%'
    },
    title: {
      fontSize: 32,
      fontFamily: 'Poppins-Medium',
      color: colors.bluePrimary,
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Poppins-Regular',
      textAlign: 'center',
      color: colors.black,
    },
    moodContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      paddingHorizontal: 6,
      gap: 8,
      marginBottom: '15%',
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
      borderColor: colors.bluePrimary,
      backgroundColor: colors.bluePrimary,
    },
    moodButtonText: {
      fontFamily: 'Poppins-Regular',
      color: '#000',
      fontSize: 16,
    },
    moodButtonTextSelected: {
      color: '#fff',
    },
    saveButton: {
      backgroundColor: colors.bluePrimary,
      paddingVertical: 12,
      paddingHorizontal: 40,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      width: '50%',
    },
    saveButtonText: {
      color: colors.white,
      fontSize: 20,
      fontFamily: 'Poppins-SemiBold',
    },
    saveButtonDisabled: {
      backgroundColor: colors.grayOpacity,
    },
  });

  return (
    <View style={styles.container}>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => router.push('./registro')}>
          <Image
            source={require('../../../../assets/images/seta.png')}
            style={styles.seta}
          />
        </TouchableOpacity>

        <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>
          <Text style={styles.title}>Humor</Text>
          <Text style={styles.subtitle}>Como está o seu humor hoje?</Text>
        </View>

        <View style={styles.moodContainer}>
          {moods.map((mood) => {
            const selected = selectedMoods.includes(mood.key);
            return (
              <TouchableOpacity
                key={mood.key}
                style={[styles.moodButton, selected && styles.moodButtonSelected]}
                onPress={() => toggleMoodSelection(mood.key)}
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

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPressIn={handleSave}
            style={[
              styles.saveButton,
              selectedMoods.length === 0 && styles.saveButtonDisabled
            ]}
            onPress={handleSave}
            disabled={selectedMoods.length === 0}
          >
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default Humor;