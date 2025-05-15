import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

export default function login() {
    const router = useRouter();
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [senhaVisivel, setSenhaVisivel] = useState(false);

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
            style={{ flex: 1 }}
        >

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >

                <View style={styles.container}>
                    <Image
                        source={require('../../assets/images/bgSanare.png')}
                        style={styles.logoFooter}
                    />

                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../assets/images/seta.png')}
                            style={styles.seta}
                        />
                    </TouchableOpacity>

                    <View style={styles.viewText}>
                        <Text style={styles.textlogin}>Login</Text>

                        <Text style={styles.text}>Preencha as credenciais abaixo para logar em sua conta.</Text>
                    </View>

                    <View style={styles.viewLogin}>

                        <View style={styles.view}>
                            <Text style={styles.label}>Email</Text>

                            <View style={[styles.input, isFocused && styles.inputFocused]}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='Digite seu email'
                                    placeholderTextColor={Colors.light.grayOpacityBorder}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                />

                                <Ionicons
                                    style={styles.icon}
                                    name="mail"
                                    size={28}
                                    color={Colors.light.bluePrimary}
                                />
                            </View>
                        </View>

                        <View style={styles.view}>
                            <Text style={styles.label}>Senha</Text>

                            <View style={[styles.input, isFocusedPassword && styles.inputFocused]}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='Digite sua senha'
                                    placeholderTextColor={Colors.light.grayOpacityBorder}
                                    secureTextEntry={!senhaVisivel}
                                    onFocus={() => setIsFocusedPassword(true)}
                                    onBlur={() => setIsFocusedPassword(false)}
                                />

                                <TouchableOpacity style={styles.icon} onPress={() => setSenhaVisivel(!senhaVisivel)}>
                                    <Ionicons
                                        name={senhaVisivel ? 'eye' : 'eye-off'}
                                        size={28}
                                        color={Colors.light.bluePrimary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.viewForgotPassword}>
                            <TouchableOpacity onPress={() => router.push('../password/recuperarSenha')}>
                                <Text style={styles.textForgotPassword}>Esqueceu sua senha?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.viewBtn}>
                        <TouchableOpacity style={styles.btn} onPress={() => router.push('./')}>
                            <LinearGradient
                                colors={['#005EB7', '#CEECF5']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 3.8 }}
                                style={styles.btnGradient}
                            >
                                <Text style={styles.btnText}>Continuar</Text>
                            </LinearGradient>
                        </TouchableOpacity>
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
    seta: {
        margin: 45,
        resizeMode: 'contain',
        marginBottom: '15%'
    },
    viewText: {
        justifyContent: "center",
        alignItems: "center",
        gap: 25,
        marginBottom: '25%'
    },
    textlogin: {
        color: Colors.light.bluePrimary,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 35,
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        textAlign: 'center',
        width: 300
    },
    viewLogin: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    label: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 25,
        color: Colors.light.bluePrimary,
    },
    view: {
        justifyContent: "center",
    },
    input: {
        width: 350,
        height: 58,
        borderWidth: 4,
        borderColor: Colors.light.grayOpacityBorder,
        borderRadius: 15,
        marginTop: 10,
        paddingRight: 15,
        paddingLeft: 20,
        backgroundColor: Colors.light.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textInput: {
        fontFamily: 'Poppins-Regular',
        flex: 1,
    },
    inputFocused: {
        borderColor: Colors.light.bluePrimaryOpacity,
        borderWidth: 4,
        borderRadius: 15,
    },
    icon: {
        marginLeft: 10,
    },
    viewForgotPassword: {
        width: '80%',
        alignItems: 'flex-end',
        marginBottom: '20%',
    },
    textForgotPassword: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        color: Colors.light.bluePrimary,
        textDecorationLine: 'underline',
    },
    viewBtn: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    btn: {
        width: 280,
        height: 80,
        borderRadius: 50,
        overflow: 'hidden',
    },
    btnText: {
        color: Colors.light.white,
        fontFamily: 'Poppins-Medium',
        fontSize: 25,
    },
    btnGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
})