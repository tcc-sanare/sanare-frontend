import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function responsavelCadastroConcluido() {
    const router = useRouter();
    const [fontsLoaded, setFontsLoaded] = useState(false);

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
                source={require('../../../assets/images/bgSanare.png')}
                style={styles.logoFooter}
            />

            <View style={styles.body}>
                <View style={styles.CadastrotextView}>
                    <Text style={styles.titulo}>Cadastro Concluído</Text>

                    <View style={styles.textView}>
                        <Text style={styles.text}> Vincule-se a um dependente usando seu código de responsável.</Text>
                    </View>
                </View>

                <View style={styles.CadastrotextView}>
                    <Text style={styles.textCod}>Seu código de responsável é:</Text>
                    <Text style={styles.codigo}>SANARE-123</Text>
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => router.push('../../logado/responsavel/home')}>
                    <LinearGradient
                        colors={['#005EB7', '#CEECF5']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 3.8 }}
                        style={styles.btnGradient}
                    >
                        <Text style={styles.btnText}>Prosseguir</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
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
        justifyContent: 'center',
        alignItems: "center",
    },
    CadastrotextView: {
        alignItems: "center",
        gap: 35,
    },
    titulo: {
        color: Colors.light.bluePrimary,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 30
    },
    textView: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: '20%',
        width: '85%'
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
    },
    textCod: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20
    },
    codigo: {
        fontFamily: 'Poppins-Medium',
        fontSize: 36,
        color: Colors.light.bluePrimary,
        textDecorationLine: 'underline'
    },
    btn: {
        width: 280,
        height: 70,
        borderRadius: 50,
        overflow: 'hidden',
        marginTop: '25%'
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