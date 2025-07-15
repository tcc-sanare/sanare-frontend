import { useRegistro } from '@/hooks/useRegistro';
import { useTheme } from '@/hooks/useTheme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Glicemia = () => {
    const { colors } = useTheme();
    const router = useRouter();
    const { updateRegistro } = useRegistro();

    const [glicemia, setGlicemia] = useState('');
    const [horaMedicao, setHoraMedicao] = useState(new Date());
    const [tipoMedicao, setTipoMedicao] = useState('jejum');
    const [observacoes, setObservacoes] = useState('');
    const [showTimePicker, setShowTimePicker] = useState(false);

    const tiposMedicao = [
        { label: 'Em jejum', value: 'jejum' },
        { label: 'Antes da refeição', value: 'pre' },
        { label: 'Após refeição', value: 'pos' },
        { label: 'Ao dormir', value: 'dormir' },
    ];

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    const isFormValid = () => {
        const glicemiaNum = parseInt(glicemia);
        return !isNaN(glicemiaNum) && glicemiaNum > 20 && glicemiaNum < 600;
    };

    const handleSave = async () => {
        try {
            const now = new Date().toISOString();
            const success = await updateRegistro('glicemia', now);

            if (success) {
                router.push('./registro');
            } else {
                console.log('Falha ao salvar o registro');
            }
        } catch (error) {
            console.error('Erro no handleSave:', error);
        }
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
            textAlign: 'center',
        },
        subtitle: {
            fontSize: 16,
            fontFamily: 'Poppins-Regular',
            textAlign: 'center',
            color: colors.black,
            marginBottom: 50,
        },
        inputContainer: {
            width: '100%',
            marginBottom: '15%',
            paddingHorizontal: 25,
            marginTop: 25,
        },
        label: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
            color: colors.bluePrimary,
            marginBottom: 8,
        },
        input: {
            borderBottomWidth: 1,
            borderBottomColor: '#D3D3D3',
            fontSize: 18,
            fontFamily: 'Poppins-Regular',
            color: colors.text,
            paddingVertical: 10,
        },
        timeButton: {
            borderBottomWidth: 1,
            borderBottomColor: '#D3D3D3',
            paddingVertical: 10,
        },
        timeText: {
            fontSize: 18,
            fontFamily: 'Poppins-Regular',
            color: colors.text,
        },
        tipoContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        tipoButton: {
            marginBottom: 20,
            padding: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#D3D3D3',
            width: '48%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        tipoButtonSelected: {
            backgroundColor: colors.bluePrimary,
            borderColor: colors.bluePrimary,
        },
        tipoText: {
            fontFamily: 'Poppins-Regular',
            textAlign: 'center',
            color: colors.black
        },
        tipoTextSelected: {
            color: colors.white,
        },
        saveButton: {
            paddingVertical: 12,
            paddingHorizontal: 40,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            backgroundColor: colors.bluePrimary,
        },
        saveButtonDisabled: {
            backgroundColor: colors.grayOpacity,
        },
        saveButtonText: {
            color: colors.white,
            fontSize: 20,
            fontFamily: 'Poppins-SemiBold',
        },
        unidade: {
            position: 'absolute',
            right: 0,
            bottom: 10,
            fontFamily: 'Poppins-Regular',
            color: colors.text,
        },
    });

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 50 }}
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
                        <View style={{ marginBottom: 30 }}>
                            <Text style={styles.title}>Glicemia</Text>
                            <Text style={styles.subtitle}>Registre seus níveis de glicose no sangue</Text>
                        </View>

                        {/* Campo de valor da glicemia */}
                        <View style={{ width: '80%', marginBottom: 25 }}>
                            <Text style={styles.label}>Valor da Glicemia</Text>
                            <View style={{ position: 'relative' }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ex: 120"
                                    placeholderTextColor={'#D3D3D3'}
                                    keyboardType="numeric"
                                    value={glicemia}
                                    onChangeText={setGlicemia}
                                    maxLength={3}
                                />
                                <Text style={styles.unidade}>mg/dL</Text>
                            </View>
                        </View>

                        {/* Seletor de horário */}
                        <View style={{ width: '80%', marginBottom: '15%' }}>
                            <Text style={styles.label}>Horário da Medição</Text>
                            <TouchableOpacity
                                style={styles.timeButton}
                                onPress={() => setShowTimePicker(true)}
                            >
                                <Text style={styles.timeText}>{formatTime(horaMedicao)}</Text>
                            </TouchableOpacity>
                            {showTimePicker && (
                                <DateTimePicker
                                    value={horaMedicao}
                                    mode="time"
                                    display="default"
                                    onChange={(event, selectedTime) => {
                                        setShowTimePicker(false);
                                        if (selectedTime) {
                                            setHoraMedicao(selectedTime);
                                        }
                                    }}
                                />
                            )}
                        </View>

                        {/* Seletor de tipo de medição */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Tipo de Medição</Text>
                            <View style={styles.tipoContainer}>
                                {tiposMedicao.map((tipo) => (
                                    <TouchableOpacity
                                        key={tipo.value}
                                        style={[
                                            styles.tipoButton,
                                            tipoMedicao === tipo.value && styles.tipoButtonSelected
                                        ]}
                                        onPress={() => setTipoMedicao(tipo.value)}
                                    >
                                        <Text style={[
                                            styles.tipoText,
                                            tipoMedicao === tipo.value && styles.tipoTextSelected
                                        ]}>
                                            {tipo.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Botão de salvar */}
                        <TouchableOpacity
                            style={[
                                styles.saveButton,
                                !isFormValid() && styles.saveButtonDisabled
                            ]}
                            onPress={handleSave}
                            disabled={!isFormValid()}
                        >
                            <Text style={styles.saveButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Glicemia;