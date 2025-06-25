import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { useCadastro } from '@/contexts/cadastroContext';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function credentialsDependente() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [ConfirmsenhaVisivel, setConfirmSenhaVisivel] = useState(false);
    const [isFocusedPasswordConfirm, setIsFocusedPasswordConfirm] = useState(false);
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');

    const { dependenteData, setDependenteData } = useCadastro();

    const handleChange = (field: keyof typeof dependenteData, value: string) => {
        setDependenteData(prev => ({
            ...prev,
            [field]: value
        }));
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
                    <View style={styles.body}>
                        <View style={styles.viewCadastro}>

                            <View style={styles.view}>
                                <Text style={styles.label}>Nome</Text>

                                <View style={[styles.input, isFocusedName && styles.inputFocused]}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder='Digite seu nome'
                                        placeholderTextColor={Colors.light.grayOpacityBorder}
                                        onFocus={() => setIsFocusedName(true)}
                                        onBlur={() => setIsFocusedName(false)}
                                        value={dependenteData.nome}
                                        onChangeText={(text) => handleChange('nome', text)}
                                    />
                                </View>
                            </View>

                            <View style={styles.view}>
                                <Text style={styles.label}>Email</Text>

                                <View style={[styles.input, isFocused && styles.inputFocused]}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder='Digite seu email'
                                        placeholderTextColor={Colors.light.grayOpacityBorder}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        value={dependenteData.email}
                                        onChangeText={(text) => handleChange('email', text)}
                                        keyboardType='email-address'
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
                                        value={dependenteData.senha}
                                        onChangeText={(text) => handleChange('senha', text)}
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
                                        value={dependenteData.confirmarSenha}
                                        onChangeText={(text) => handleChange('confirmarSenha', text)}
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
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: '32%'
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
        marginBottom: '20%',
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
        marginTop: 5,
        marginLeft: 5,
    }
})