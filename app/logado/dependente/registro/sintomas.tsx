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
    { key: 'dor-de-cabeca', label: 'Dor de cabeça' },
    { key: 'fadiga', label: 'Cansaço / Fadiga' },
    { key: 'nausea', label: 'Náusea ou enjoo' },
    { key: 'tontura', label: 'Tontura' },
    { key: 'febre', label: 'Febre' },
    { key: 'sem-apetite', label: 'Falta de apetite' },
    { key: 'dor-no-peito', label: 'Dor no peito' },
    { key: 'falta-de-ar', label: 'Falta de ar' },
    { key: 'ansiedade', label: 'Ansiedade / Nervosismo' },
    { key: 'sono-alterado', label: 'Alterações no sono' },
];

const Sintomas = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [note, setNote] = useState('');
    const { colors } = useTheme();
    const router = useRouter();
    const { updateRegistro } = useRegistro();

    const handleSave = async () => {
        try {
            const now = new Date().toISOString();
            const success = await updateRegistro('sintomas', now);

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

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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