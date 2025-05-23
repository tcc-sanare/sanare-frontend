import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';

export default function credentialsUser() {
    const router = useRouter();
    const [isFocused, setIsFocused] = useState(false);
    const [ConfirmsenhaVisivel, setConfirmSenhaVisivel] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedPasswordConfirm, setIsFocusedPasswordConfirm] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');

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

    const isValidEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

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
                        source={require('../../../assets/images/bgSanare.png')}
                        style={styles.logoFooter}
                    />

                    <View style={styles.body}>
                        <View style={styles.cadastroContainer}>
                            <Text style={styles.textCadastro}>Cadastro</Text>
                            <Progress.Bar progress={0.3} width={250} color={Colors.light.bluePrimary} />
                        </View>

                        <View style={styles.viewCadastro}>

                            <View style={styles.view}>
                                <Text style={styles.label}>Email</Text>

                                <View style={[styles.input, isFocused && styles.inputFocused]}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder='Digite seu email'
                                        placeholderTextColor={Colors.light.grayOpacityBorder}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        value={email}
                                        onChangeText={setEmail}
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
                                        value={senha}
                                        onChangeText={setSenha}
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

                            <View style={styles.view}>
                                <Text style={styles.label}>Confirme sua senha</Text>

                                <View style={[styles.input, isFocusedPasswordConfirm && styles.inputFocused]}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder='Confirme sua senha'
                                        placeholderTextColor={Colors.light.grayOpacityBorder}
                                        secureTextEntry={!ConfirmsenhaVisivel}
                                        onFocus={() => setIsFocusedPasswordConfirm(true)}
                                        onBlur={() => setIsFocusedPasswordConfirm(false)}
                                        value={confirmarSenha}
                                        onChangeText={setConfirmarSenha}
                                    />

                                    <TouchableOpacity style={styles.icon} onPress={() => setConfirmSenhaVisivel(!ConfirmsenhaVisivel)}>
                                        <Ionicons
                                            name={ConfirmsenhaVisivel ? 'eye' : 'eye-off'}
                                            size={28}
                                            color={Colors.light.bluePrimary}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {error !== '' && (
                                <Text style={styles.errorText}>
                                    {error}
                                </Text>
                            )}
                        </View>

                        <View style={styles.viewBtn}>
                            <TouchableOpacity style={styles.btn} onPress={() => {
                                Keyboard.dismiss();
                                if (!senha || !confirmarSenha || !email) {
                                    setError('Preencha todos os campos.');
                                } else if (senha !== confirmarSenha) {
                                    setError('As senhas inseridas devem ser iguais.');
                                } else if (!email.trim()) {
                                    setError('Por favor, preencha o campo de e-mail.');
                                    return;
                                } else if (!isValidEmail(email)) {
                                    setError('Digite um e-mail válido.');
                                    return;
                                } else {
                                    setError('');
                                    router.push('./doencasCadastro')
                                }
                            }}>
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
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        textAlign: 'center',
        width: 300
    },
    viewCadastro: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginBottom: '10%'
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
    errorText: {
        color: 'red',
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
        marginTop: 5,
        marginLeft: 5,
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