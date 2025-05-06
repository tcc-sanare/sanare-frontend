import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';


export default function Welcome() {

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

            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.logo}
                />
                <Image
                    source={require('../assets/images/sanare.png')}
                    style={styles.sanare}
                />
            </View>

            <Text style={styles.text}>Esteja conectado com a sua saúde!</Text>

            <View style={styles.containerBtns}>
                <TouchableOpacity style={styles.btn}>

                    <LinearGradient
                        colors={['#005EB7', '#4697E4']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.btnGradient}
                    >
                        <Text style={styles.btnText}>Login</Text>
                    </LinearGradient>

                </TouchableOpacity>

                <TouchableOpacity style={styles.btn}>
                    <LinearGradient
                        colors={['#005EB7', '#4697E4']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.btnGradient}
                    >
                        <Text style={styles.btnText}>Cadastro</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <Image
                source={require('../assets/images/bgWelcome.png')}
                style={styles.logoFooter}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.light.background,
    },
    logoContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        gap: 5,
        marginBottom: 50
    },
    logo: {
        resizeMode: 'contain',
        height: 40
    },
    sanare: {
        resizeMode: 'contain',
        height: 30,
    },
    text: {
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        color: Colors.light.bluePrimary,
        fontSize: 30,
        width: '80%',
        marginBottom: 110
    },
    containerBtns: {
        gap: 30,
    },
    btn: {
        width: 280,
        height: 80,
        borderRadius: 50,
        overflow: 'hidden',
    },
    btnText: {
        color: Colors.light.textWhite,
        fontFamily: 'Poppins-Medium',
        fontSize: 25,
        // zIndex: 1,
    },
    btnGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    logoFooter: {
        position: 'absolute',
        bottom: 0,
        top: '20%',
        // zIndex: -1,
        resizeMode: 'contain',
        left: 0,
        right: 0,
        opacity: 0.7,
        height: '100%',
        width: '100%'
    }
});
