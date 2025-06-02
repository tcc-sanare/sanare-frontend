import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { View, StyleSheet, Text, ScrollView, Platform, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function codResponsavelCadastro() {
    const router = useRouter();
    const [codigo, setCodigo] = useState('');
    const [enviado, setEnviado] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [confirmado, setConfirmado] = useState(false);

    const handleEnviar = () => {
        setEnviado(true);
        setCarregando(true);

        setTimeout(() => {
            setConfirmado(true);
            setCarregando(false);

            setTimeout(() => {
                router.push('./configuracoes')
            }, 2000);
        }, 3000);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >

                <View style={styles.container}>
                    <Image
                        source={require('../../../../assets/images/bgSanare.png')}
                        style={styles.logoFooter}
                    />


                    <Text style={styles.text}>Insira o código de responsável:</Text>

                    <View style={styles.input}>
                        <TextInput
                            style={styles.textInput}
                            value={codigo}
                            onChangeText={setCodigo}
                            editable={!enviado}
                        />
                    </View>

                    {!enviado && (
                        <TouchableOpacity style={styles.btn} onPress={handleEnviar}>
                            <LinearGradient
                                colors={['#005EB7', '#CEECF5']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 3.8 }}
                                style={styles.btnGradient}
                            >
                                <Text style={styles.btnText}>Enviar código</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}

                    {enviado && !confirmado && (
                        <>
                            <Text style={styles.status}>Aguardando confirmação do responsável...</Text>
                            {carregando && (
                                <LottieView
                                    source={require('../../../../assets/animations/loading.json')}
                                    autoPlay
                                    loop
                                    style={styles.animation}
                                />
                            )}
                        </>
                    )}

                    {confirmado && (
                        <LottieView
                            source={require('../../../../assets/animations/check.json')}
                            autoPlay
                            loop={false}
                            style={styles.animation}
                        />
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    logoFooter: {
        position: 'absolute',
        bottom: 0,
        top: '31%',
        resizeMode: 'contain',
        left: 0,
        right: 0,
        height: '100%',
        width: '100%'
    },
    text: {
        marginTop: '60%',
        fontFamily: 'Poppins-Medium',
        fontSize: 24,
        width: '80%',
        textAlign: 'center'
    },
    input: {
        marginTop: '15%',
        width: '100%',
        alignItems: 'center',
        marginBottom: '30%',
    },
    textInput: {
        height: 70,
        width: '80%',
        backgroundColor: Colors.light.background,
        borderWidth: 3,
        borderColor: Colors.light.bluePrimaryOpacity,
        color: Colors.light.bluePrimary,
        borderRadius: 25,
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 30
    },
    animation: {
        width: 150,
        height: 150,
    },
    btn: {
        width: 250,
        height: 70,
        borderRadius: 50,
        overflow: 'hidden',
    },
    btnText: {
        color: Colors.light.white,
        fontFamily: 'Poppins-Medium',
        fontSize: 22,
    },
    btnGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    status: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 10,
        fontFamily: 'Poppins-Regular',
    },
})