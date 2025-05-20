import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import * as Font from 'expo-font';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

export default function DependenteCadastro() {
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
                source={require('../../assets/images/bgSanare.png')}
                style={styles.logoFooter}
            />

            <Text>Vincular responsavel-dependente screen</Text>
            <View style={styles.body}></View>
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
    }
})