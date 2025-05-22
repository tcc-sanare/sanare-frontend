import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import * as Font from 'expo-font';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function VincularResponsavelCadastro() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const router = useRouter();

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
                            <Text>StepBar forms</Text>
                            {/* <StepBar totalSteps={5} currentStep={1} /> */}
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
                            <TextInput style={styles.textInput} />
                        </View>

                        <Text style={styles.status}>Aguardando confirmação do responsável</Text>

                        <Text onPress={() => router.push('./doencasCadastroDependente')}>Animação aqui!</Text>
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
        marginBottom: '20%',
    },
    textInput: {
        height: 70,
        width: '80%',
        backgroundColor: Colors.light.background,
        borderWidth: 3,
        borderColor: Colors.light.bluePrimary,
        color: Colors.light.bluePrimary,
        borderRadius: 25,
        textAlign: 'center',
        alignItems: 'center',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 30
    },
    status:{
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        marginBottom: 30
    }
})