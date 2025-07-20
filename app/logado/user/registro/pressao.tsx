import Colors from '@/constants/Colors';
import { useRegistro } from '@/hooks/useRegistro';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Pressao = () => {
    const [sistolica, setSistolica] = useState('');
    const [diastolica, setDiastolica] = useState('');
    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    const router = useRouter();
    const { updateRegistro } = useRegistro();

    const isFormValid = () => {
        const sis = parseInt(sistolica);
        const dia = parseInt(diastolica);

        return !isNaN(sis) &&
            !isNaN(dia) &&
            sis > 0 &&
            dia > 0 &&
            sis > dia;
    };

    const handleSave = async () => {
        try {
            const now = new Date().toISOString();
            const success = await updateRegistro('pressao', {
                date: now,
                sistolica: sistolica,
                diastolica: diastolica
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
        unidade: {
            position: 'absolute',
            right: 0,
            bottom: 65,
            fontFamily: 'Poppins-Regular',
            color: colors.text,
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
                        <Text style={styles.title}>Pressão Arterial</Text>
                        <Text style={styles.subtitle}>Como está a sua Pressão Arterial?</Text>

                        <View style={{ width: '80%' }}>
                            <Text style={styles.label}>Sistólica (maior):</Text>
                            <View style={{ position: 'relative' }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ex: 120"
                                    placeholderTextColor={'#9E9E9E80'}
                                    keyboardType="numeric"
                                    value={sistolica}
                                    onChangeText={setSistolica}
                                    maxLength={3}
                                />
                                <Text style={styles.unidade}>mmHg</Text>
                            </View>
                        </View>


                        <View style={{ width: '80%' }}>
                            <Text style={styles.label}>Diastólica (menor):</Text>
                            <View style={{ position: 'relative' }}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Ex: 80"
                                    placeholderTextColor={'#9E9E9E80'}
                                    keyboardType="numeric"
                                    value={diastolica}
                                    onChangeText={setDiastolica}
                                    maxLength={3}
                                />
                                <Text style={styles.unidade}>mmHg</Text>
                            </View>
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

export default Pressao;