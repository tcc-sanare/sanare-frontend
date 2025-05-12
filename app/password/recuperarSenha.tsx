import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import CustomModal from './modal';

export default function recuperarSenha() {
    const [isFocused, setIsFocused] = useState(false);
    const modalRef = useRef<Modalize>(null);
    const router = useRouter();
    const navigation = useNavigation();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    const openModal = () => {
        modalRef.current?.open();
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

                    <View style={styles.body}>

                        <View style={styles.viewText}>
                            <Text style={styles.titulo}>Esqueceu sua senha?</Text>
                            <Text style={styles.text}>Digite seu e-mail para redefini-la.</Text>
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
                                />

                                <Ionicons
                                    style={styles.icon}
                                    name="mail"
                                    size={28}
                                    color={Colors.light.bluePrimary}
                                />
                            </View>
                        </View>

                        <View style={styles.viewBtn}>

                            <TouchableOpacity
                                style={styles.btn}
                                onPress={openModal}
                            >
                                <LinearGradient
                                    colors={['#005EB7', '#4697E4']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0.5 }}
                                    style={styles.btnGradient}
                                >
                                    <Text style={styles.btnText}>Continuar</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <CustomModal ref={modalRef} />
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
        marginBottom: '30%'
    },
    body: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewText: {
        justifyContent: "center",
        alignItems: "center",
        width: '65%',
        gap: 10,
        marginBottom: '25%'
    },
    titulo: {
        color: Colors.light.bluePrimary,
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'Poppins-SemiBold'
    },
    text: {
        textAlign: 'center',
        width: '80%',
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
    },
    label: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 25,
        color: Colors.light.bluePrimary,
    },
    view: {
        marginBottom: 100,
        justifyContent: "center",
    },
    input: {
        width: 350,
        height: 58,
        borderWidth: 4,
        borderColor: Colors.light.grayOpacityBorder,
        borderRadius: 15,
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 15,
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