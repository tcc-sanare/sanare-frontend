import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import * as Font from 'expo-font';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';

export default function ResponsavelCadastro() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const router = useRouter();


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
                    <Progress.Bar progress={0.4} width={250} color={Colors.light.bluePrimary} />

                </View>

                <View style={styles.textView}>
                    <Text style={styles.text}>Deseja usar o Sanare para monitorar a sua saúde também?</Text>
                </View>

                <View style={styles.viewBtn}>
                    <Pressable
                        onPress={() => router.push('./doencasCadastroResponsavel')}
                        style={({ pressed }) => [
                            styles.btn,
                            pressed && styles.botaoPressionado
                        ]}
                    >
                        <Text style={styles.textBtn}>Sim, vamos lá</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => router.push('./responsavelCadastroConcluido')}
                        style={({ pressed }) => [
                            styles.btn,
                            pressed && styles.botaoPressionado
                        ]}
                    >
                        <Text style={styles.textBtn}>Não, obrigado</Text>
                    </Pressable>
                </View>
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
        marginBottom: '20%',
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
        marginBottom: '20%',
        width: '85%'
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
    },
    viewBtn: {
        gap: 30
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