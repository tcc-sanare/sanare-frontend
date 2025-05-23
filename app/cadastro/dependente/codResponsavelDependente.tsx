import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';

export default function VincularResponsavelCadastro() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const router = useRouter();

    const [codigo, setCodigo] = useState('');
    const [enviado, setEnviado] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [confirmado, setConfirmado] = useState(false);

    const handleEnviar = () => {
        setEnviado(true);
        setCarregando(true);

        setTimeout(() => {
            setCarregando(false);
            setConfirmado(true);

            setTimeout(() => {
                router.push('./doencasCadastroDependente');
            }, 2000);
        }, 5000);
    };

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync(Fonts);
            setFontsLoaded(true);
        }

        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
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
                        source={require('../../../assets/images/bgSanare.png')}
                        style={styles.logoFooter}
                    />

                    <View style={styles.body}>
                        <View style={styles.cadastroContainer}>
                            <Text style={styles.textCadastro}>Cadastro</Text>
                            <Progress.Bar progress={0.4} width={250} color={Colors.light.bluePrimary} />
                        </View>

                        <View style={styles.textView}>
                            <Text style={styles.titulo}>Insira o código de responsável:</Text>

                            <Text style={styles.text}>Ainda não tem um responsável cadastrado? Faça o {''}
                                <Text
                                    style={{ color: Colors.light.bluePrimary, fontFamily: 'Poppins-Regular', textDecorationLine: 'underline' }}
                                    onPress={() => router.push('../cadastro')}
                                >cadastro</Text> {''}
                                antes de continuar!</Text>
                        </View>

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
                                        source={require('../../../assets/animations/loading.json')}
                                        autoPlay
                                        loop
                                        style={styles.animation}
                                    />
                                )}
                            </>
                        )}

                        {confirmado && (
                            <LottieView
                                source={require('../../../assets/animations/check.json')}
                                autoPlay
                                loop={false}
                                style={styles.animation}
                            />
                        )}

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
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
    body: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: '32%'
    },
    cadastroContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: '20%',
        gap: 20
    },
    textCadastro: {
        color: Colors.light.bluePrimary,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 35
    },
    textView: {
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
        width: '80%',

    },
    titulo: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        textAlign: 'center',
    },
    input: {
        marginTop: '20%',
        width: '100%',
        alignItems: 'center',
        marginBottom: '15%',
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