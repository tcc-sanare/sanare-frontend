import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
// import StepBar from './StepBar';

// type UserRole = 'dependente' | 'responsavel' | 'responsavelNao' | 'comum';

// const stepCountByRole: Record<UserRole, number> = {
//     dependente: 5,
//     responsavel: 6,
//     responsavelNao: 5,
//     comum: 5,
// };

export default function Cadastro() {
    const router = useRouter();
    const navigation = useNavigation();
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
                source={require('./../../assets/images/bgSanare.png')}
                style={styles.logoFooter}
            />

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={require('./../../assets/images/seta.png')}
                    style={styles.seta}
                />
            </TouchableOpacity>

            <View style={styles.body}>
                <View style={styles.cadastroContainer}>
                    <Text style={styles.textCadastro}>Cadastro</Text>
                    <Text>StepBar forms</Text>
                    {/* <StepBar totalSteps={5} currentStep={1} /> */}
                </View>

                <View style={styles.viewText}>
                    <Text style={styles.text}>Escolha sua jornada no Sanare.</Text>
                </View>

                <View style={styles.viewBtn}>
                    <Pressable
                        onPress={() => router.push('./responsavel/credentialsResponsavel')}
                        style={({ pressed }) => [
                            styles.btn,
                            pressed && styles.botaoPressionado
                        ]}
                    >
                        <Text style={styles.textBtn}>Acompanhar outra pessoa</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => router.push('./dependente/credentialsDependente')}
                        style={({ pressed }) => [
                            styles.btn,
                            pressed && styles.botaoPressionado
                        ]}
                    >
                        <Text style={styles.textBtn}>Ser acompanhado</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => router.push('./user/credentialsUser')}
                        style={({ pressed }) => [
                            styles.btn,
                            pressed && styles.botaoPressionado
                        ]}
                    >
                        <Text style={styles.textBtn}>Apenas para meu autocuidado</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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
        marginBottom: '15%',
        marginTop: '20%',
    },
    body: {
        justifyContent: "center",
        alignItems: "center",
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
    viewText: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: '20%'
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18
    },
    viewBtn: {
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
    },
    btn: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 5,
        borderColor: Colors.light.gray,
        backgroundColor: Colors.light.background,
        width: 330,
        borderRadius: 25,
        height: 70,
    },
    botaoPressionado: {
        borderColor: Colors.light.bluePrimaryOpacity,
    },
    textBtn: {
        fontFamily: 'Poppins-Regular',
        fontSize: 17,
    }
})