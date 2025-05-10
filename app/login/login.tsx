import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

export default function login() {
    const router = useRouter();
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

                <View style={styles.viewLabel}>
                    <Text style={styles.label}>Email</Text>

                    <View style={styles.input}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Digite seu email'
                            placeholderTextColor={Colors.light.grayOpacityBorder}
                        />

                        <Ionicons
                            style={styles.icon}
                            name="mail"
                            size={28}
                            color={Colors.light.bluePrimary}
                        />
                    </View>
                </View>

                <View style={styles.viewLabel}>
                    <Text style={styles.label}>Senha</Text>

                    <View style={styles.input}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Digite sua senha'
                            placeholderTextColor={Colors.light.grayOpacityBorder}
                            secureTextEntry={!senhaVisivel}
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

                <View style={styles.viewForgotPassword}></View>
            </View>

            <View style={styles.viewBtn}></View>
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
    input: {
        width: 320,
        height: 55,
        borderWidth: 4,
        borderColor: Colors.light.grayOpacityBorder,
        borderRadius: 15,
        marginTop: 10,
        paddingLeft: 20,
        backgroundColor: Colors.light.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    viewLabel: {
        justifyContent: "center",
    },
    textInput: {
        fontFamily: 'Poppins-Regular',
    },
    icon: {
        marginRight: 15,
    },
    viewForgotPassword: {},
    viewBtn: {},
})