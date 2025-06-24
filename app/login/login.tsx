import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { useUser } from '@/contexts/UserContext';
import { getAccount } from '@/http/get-account';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function login() {
    const router = useRouter();
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { user, setUser } = useUser();

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

    const handleLogin = async () => {
        Keyboard.dismiss();

        if (!senha || !email) {
            setError('Preencha todos os campos.');
            return;
        } else if (!isValidEmail(email)) {
            setError('Digite um e-mail válido.');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('https://sanare-api.vercel.app/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: senha
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login bem-sucedido
                // armazenar token de autenticação aqui
                await AsyncStorage.setItem('token', data.access_token);

                const { account, selfMonitor } = await getAccount(data.access_token);

                setUser(account);
                router.push(selfMonitor ? '../../logado/user/home' : '../../logado/responsavel/home');
            } else {
                // Login falhou
                setError(data.message || 'Erro ao fazer login. Verifique suas credenciais.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Erro de conexão. Tente novamente mais tarde.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/Vector2.png')}
                style={styles.logoFooter}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <TouchableOpacity onPress={() => router.push('../welcome')}>
                        <Image
                            source={require('../../assets/images/seta.png')}
                            style={styles.seta}
                        />
                    </TouchableOpacity>

                    <View style={styles.viewText}>
                        <Text style={styles.textlogin}>Login</Text>
                        <Text style={styles.text}>Preencha as credenciais abaixo para logar em sua conta.</Text>

                        {error !== '' && (
                            <Text style={styles.errorText}>
                                {error}
                            </Text>
                        )}
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
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
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

                        <View style={styles.viewForgotPassword}>
                            <TouchableOpacity onPress={() => router.push('../password/recuperarSenha')}>
                                <Text style={styles.textForgotPassword}>Esqueceu sua senha?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.viewBtn}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={handleLogin}
                            disabled={isLoading}
                        >
                            <LinearGradient
                                colors={['#005EB7', '#CEECF5']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 3.8 }}
                                style={styles.btnGradient}
                            >
                                {isLoading ? (
                                    <ActivityIndicator size="small" color={Colors.light.white} />
                                ) : (
                                    <Text style={styles.btnText}>Continuar</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
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
        top: 90,
        resizeMode: 'cover',
        left: 0,
        right: 0,
        opacity: 0.7,
        height: 250,
        width: 429,
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
        marginBottom: '10%'
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
        width: 320,
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
        marginLeft: 5,
        marginTop: 20,
    },
    viewForgotPassword: {
        width: '80%',
        alignItems: 'flex-end',
        marginBottom: '10%',
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