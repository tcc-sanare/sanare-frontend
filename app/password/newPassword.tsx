import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function newPassword() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [ConfirmsenhaVisivel, setConfirmSenhaVisivel] = useState(false);
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const router = useRouter();
    const [isFocusedPasswordConfirm, setIsFocusedPasswordConfirm] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);

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
                    {/* <Image
                        source={require('../../assets/images/bgSanare.png')}
                        style={styles.logoFooter}
                    /> */}

                    <View style={styles.textView}>
                        <Text style={styles.titulo}>Nova Senha</Text>
                        <Text style={styles.text}>Insira uma nova senha abaixo</Text>
                    </View>

                    <View style={styles.containerPassword}>
                        <View>
                            <Text style={styles.label}>Senha</Text>

                            <View style={[styles.input, isFocusedPassword && styles.inputFocused]}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='Digite uma senha'
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

                        <View>
                            <Text style={styles.label}>Confirmar senha</Text>

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
                        {erroSenha !== '' && (
                            <Text style={styles.errorText}>
                                {erroSenha}
                            </Text>
                        )}

                    </View>

                    <View style={styles.viewBtn}>
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            if (!senha || !confirmarSenha) {
                                setErroSenha('Preencha os dois campos.');
                            } else if (senha !== confirmarSenha) {
                                setErroSenha('As senhas inseridas devem ser iguais.');
                            } else {
                                setErroSenha('');
                                router.push('../login/login');
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    // logoFooter: {
    //     position: 'absolute',
    //     bottom: 0,
    //     top: '31%',
    //     resizeMode: 'contain',
    //     left: 0,
    //     right: 0,
    //     height: '100%',
    //     width: '100%'
    // },
    textView: {
        alignItems: 'center',
        marginBottom: '20%'
    },
    titulo: {
        fontFamily: 'Poppins-SemiBold',
        color: Colors.light.bluePrimary,
        fontSize: 35,
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
    },
    containerPassword: {
        gap: 20,
        marginBottom: '20%'

    }, 
    label: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 25,
        color: Colors.light.bluePrimary,
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