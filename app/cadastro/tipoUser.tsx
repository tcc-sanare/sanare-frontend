import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

interface TipoUserProps {
    onEscolha: (tipo: 'responsavel' | 'dependente' | 'comum') => void;
}

export default function TipoUser({ onEscolha }: TipoUserProps) {
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
            <View style={styles.body}>

                <View style={styles.viewText}>
                    <Text style={styles.text}>Escolha sua jornada no Sanare.</Text>
                </View>

                <View style={styles.viewBtn}>
                    <Pressable
                        onPress={() => onEscolha('responsavel')}
                        style={({ pressed }) => [
                            styles.btn,
                            pressed && styles.botaoPressionado
                        ]}
                    >
                        <Text style={styles.textBtn}>Acompanhar outra pessoa</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => onEscolha('dependente')}
                        style={({ pressed }) => [
                            styles.btn,
                            pressed && styles.botaoPressionado
                        ]}
                    >
                        <Text style={styles.textBtn}>Ser acompanhado</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => onEscolha('comum')}
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
    },
    body: {
        justifyContent: "center",
        alignItems: "center",
    },
    viewText: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: '20%',
        marginTop: '20%'
    },
    text: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18
    },
    viewBtn: {
        marginTop: '20%',
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