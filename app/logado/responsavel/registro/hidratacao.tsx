import Colors from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Hidratacao = () => {
    const [litros, setLitros] = useState('');
    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    const router = useRouter();
    const isSaveDisabled = litros.trim() === '';

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
        image: {
            height: 120,
            marginBottom: 50,
        },
        input: {
            borderBottomWidth: 1,
            borderBottomColor: Colors.light.gray,
            fontSize: 22,
            width: '40%',
            marginBottom: '20%',
            fontFamily: 'Poppins-Regular',
            color: colors.black,
            textAlign: 'center',
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
        saveButtonText: {
            color: colors.white,
            fontSize: 20,
            fontFamily: 'Poppins-SemiBold',
        },
        saveButtonDisabled: {
            backgroundColor: colors.grayOpacity,
        },
        saveButtonTextDisabled: {
            opacity: 0.7,
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
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
                        <Text style={styles.title}>Hidratação</Text>
                        <Text style={styles.subtitle}>Registre seu consumo de água!</Text>

                        <Image
                            source={require('../../../../assets/images/agua.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Litros"
                            placeholderTextColor={Colors.light.gray}
                            keyboardType="numeric"
                            value={litros}
                            onChangeText={setLitros}
                        />


                        <TouchableOpacity

                            style={[
                                styles.saveButton,
                                isSaveDisabled && styles.saveButtonDisabled
                            ]}
                            onPressIn={() => {
                                router.push('./registro');
                            }}
                            disabled={isSaveDisabled}
                        >
                            <Text style={[
                                styles.saveButtonText,
                                isSaveDisabled && styles.saveButtonTextDisabled
                            ]}>
                                Salvar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View >
    );
};

export default Hidratacao;