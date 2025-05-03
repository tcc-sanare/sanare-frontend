import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from '../constants/Colors';
import Fonts from '../constants/fonts';


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

            <View>
                <TouchableOpacity></TouchableOpacity>
                <TouchableOpacity></TouchableOpacity>
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
        color:  Colors.light.bluePrimary,
        fontSize: 30,
        width: '80%',  
    }
})
