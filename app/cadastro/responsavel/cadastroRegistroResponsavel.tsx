import DropdownListRegistro from '@/components/DropdownListRegistro';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function cadastroRegistroResponsavel() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const router = useRouter();
    const [monitoramentosSelecionados, setMonitoramentosSelecionados] = useState<string[]>([]);

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
                <View style={styles.cadastroContainer}>
                    <Text style={styles.textCadastro}>Cadastro</Text>
                    <Text>StepBar forms</Text>
                    {/* <StepBar totalSteps={5} currentStep={1} /> */}
                </View>

                <View style={styles.textView}>
                    <Text style={styles.text}>Selecione oque você deseja monitorar:</Text>
                </View>

                <View style={styles.viewRegistro}>
                    <DropdownListRegistro
                        title=""
                        items={[
                            'Humor',
                            'Sintomas',
                            'IMC',
                            'Hidratação',
                            'Pressão Arterial',
                            'Glicemia',
                        ]}
                        selected={monitoramentosSelecionados}
                        setSelected={setMonitoramentosSelecionados}
                    />
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => router.push('./responsavelCadastroConcluido')}>
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
        marginBottom: '15%',
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
        marginBottom: '10%',
        width: '85%'
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
    },
    viewRegistro: {
        marginLeft: '25%',
        width: '100%'
    },
    btn: {
        width: 280,
        height: 70,
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