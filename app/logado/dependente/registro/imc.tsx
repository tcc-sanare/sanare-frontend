import Colors from '@/constants/Colors';
import { useRegistro } from '@/hooks/useRegistro';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Imc = () => {
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');
    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    const router = useRouter();
    const { updateRegistro } = useRegistro();

    const isFormValid = () => {
        const alturaNum = parseFloat(altura.replace(',', '.'));
        const pesoNum = parseFloat(peso.replace(',', '.'));

        return !isNaN(alturaNum) &&
            !isNaN(pesoNum) &&
            alturaNum > 0 &&
            pesoNum > 0 &&
            alturaNum < 3 &&
            pesoNum < 300;
    };

    const handleSave = async () => {
        if (!isFormValid()) return;

        try {
            const alturaNum = parseFloat(altura.replace(',', '.'));
            const pesoNum = parseFloat(peso.replace(',', '.'));
            const imcValor = (pesoNum / (alturaNum * alturaNum)).toFixed(2);

            const now = new Date().toISOString();
            const success = await updateRegistro('imc', {
                date: now,
                altura: alturaNum.toString(),
                peso: pesoNum.toString(),
                valor: imcValor
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
            marginBottom: 50,
        },
        label: {
            alignSelf: 'flex-start',
            fontSize: 16,
            fontFamily: 'Poppins-SemiBold',
            color: colors.bluePrimary,
            marginBottom: 4,
            marginTop: 12,
        },
        input: {
            borderBottomWidth: 1,
            borderBottomColor: Colors.light.gray,
            fontSize: 16,
            fontFamily: 'Poppins-Regular',
            color: colors.black,
            marginBottom: 55,
        },
        saveButton: {
            paddingVertical: 12,
            paddingHorizontal: 40,
            borderRadius: 30,
            marginTop: 35,
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
        saveButtonTextDisabled: {
            opacity: 0.6,
        },
    });

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
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
                        <Text style={styles.title}>IMC</Text>
                        <Text style={styles.subtitle}>Registre seu IMC</Text>

                        <View style={{ width: '80%' }}>
                            <Text style={styles.label}>Altura (metros):</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ex: 1.80"
                                placeholderTextColor={'#9E9E9E80'}
                                keyboardType="decimal-pad"
                                value={altura}
                                onChangeText={setAltura}
                            />

                            <Text style={styles.label}>Peso (kg):</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ex: 80"
                                placeholderTextColor={'#9E9E9E80'}
                                keyboardType="decimal-pad"
                                value={peso}
                                onChangeText={setPeso}
                            />
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.saveButton,
                                !isFormValid() && styles.saveButtonDisabled
                            ]}
                            onPress={handleSave}
                            disabled={!isFormValid()}
                        >
                            <Text style={[
                                styles.saveButtonText,
                                !isFormValid() && styles.saveButtonTextDisabled
                            ]}>
                                Salvar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Imc;