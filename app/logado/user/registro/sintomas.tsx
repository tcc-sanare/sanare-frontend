import { useRegistro } from '@/hooks/useRegistro';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from "expo-router";
import { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

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

const Sintomas = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const { colors } = useTheme();
    const router = useRouter();
    const { updateRegistro } = useRegistro();

    const handleSave = async () => {
        try {
            const now = new Date().toISOString();
            const success = await updateRegistro('sintomas', {
                date: now,
                symptoms: selectedSymptoms
            });

            if (success) {
                router.push('./registro');
            } else {
                console.log('Falha ao salvar o registro');
            }
        } catch (error) {
            console.error('Erro no handleSave:', error);
        }
    };

    const toggleSymptomSelection = (moodKey: string) => {
        setSelectedSymptoms(prev => {
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
        symptomContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 8,
            marginBottom: '15%',
            paddingHorizontal: 10,
        },
        symptomButton: {
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
        symptomButtonSelected: {
            borderColor: colors.bluePrimary,
            backgroundColor: colors.bluePrimary,
        },
        symptomButtonText: {
            fontFamily: 'Poppins-Regular',
            color: '#000',
            fontSize: 16,
        },
        symptomButtonTextSelected: {
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
                    <Text style={styles.title}>Sintomas</Text>
                    <Text style={styles.subtitle}>Quais sintomas você está sentindo hoje?</Text>
                </View>

                <View style={styles.symptomContainer}>
                    {symptoms.map((symptom) => {
                        const selected = selectedSymptoms.includes(symptom.key);
                        return (
                            <TouchableOpacity
                                key={symptom.key}
                                style={[styles.symptomButton, selected && styles.symptomButtonSelected]}
                                onPress={() => toggleSymptomSelection(symptom.key)}
                            >
                                <Text style={[styles.symptomButtonText, selected && styles.symptomButtonTextSelected]}>
                                    {symptom.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '15%' }}>
                    <TouchableOpacity
                        onPressIn={handleSave}
                        style={[
                            styles.saveButton,
                            selectedSymptoms.length === 0 && styles.saveButtonDisabled
                        ]}
                        onPress={handleSave}
                        disabled={selectedSymptoms.length === 0}
                    >
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Sintomas;