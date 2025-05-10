import MaskedView from '@react-native-masked-view/masked-view';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

export default function Welcome() {
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
                source={require('../assets/images/bgWelcome.png')}
                style={styles.logoFooter}
            />

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

            <View style={styles.viewText}>
                <Text style={styles.text}>Esteja</Text>

                <MaskedView
                    maskElement={<Text style={[styles.text, styles.gradientText]}>conectado</Text>}>
                    <LinearGradient
                        colors={['#005EB7', '#64AEEA']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <Text style={[styles.text, styles.gradientText, { opacity: 0 }]}>  conectado</Text>
                    </LinearGradient>
                </MaskedView>

                <Text style={styles.text}> com a sua saúde!</Text>
            </View>

            <View style={styles.containerBtns}>

                <TouchableOpacity style={styles.btn} onPress={() => router.push('./login/login')}>
                    <LinearGradient
                        colors={['#005EB7', '#4697E4']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.btnGradient}
                    >
                        <Text style={styles.btnText}>Login</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => router.push('./cadastro/cadastro')}>
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
        gap: 10,
        marginBottom: 50
    },
    logo: {
        resizeMode: 'contain',
    },
    sanare: {
        resizeMode: 'contain',
        width: 120
    },
    viewText: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 110
    },
    text: {
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        color: Colors.light.bluePrimary,
        fontSize: 30,
    },
    gradientText: {
        fontFamily: 'Poppins-Bold',
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
    logoFooter: {
        position: 'absolute',
        bottom: 0,
        top: '20%',
        resizeMode: 'contain',
        left: 0,
        right: 0,
        opacity: 0.7,
        height: '100%',
        width: '100%'
    }
});
