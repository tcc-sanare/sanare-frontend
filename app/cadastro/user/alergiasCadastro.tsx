import DropdownList from '@/components/DropdownList';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function alergiasCadastro() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const router = useRouter();

    const [antiInflamatorios, setAntiInflamatorios] = useState<string[]>([]);
    const [analgesicos, setAnalgesicos] = useState<string[]>([]);
    const [antibioticos, setAntibioticos] = useState<string[]>([]);
    const [anticonvulsivantes, setAnticonvulsivantes] = useState<string[]>([]);

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

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.body}>
                        <View style={styles.cadastroContainer}>
                            <Text style={styles.textCadastro}>Cadastro</Text>
                            <Text>StepBar forms</Text>
                        </View>

                        <View style={styles.textView}>
                            <Text style={styles.text}>Selecione as alergias que possui.</Text>
                        </View>

                        <View style={styles.containerAlergias}>
                            <DropdownList
                                title="Antibióticos"
                                items={['Penicilina', 'Amoxilina', 'Ampicilina', 'Cefalexina', 'Ceftriaxona', 'Eritromicina', 'Azitromicina', 'Sulfonamida']}
                                selected={antibioticos}
                                setSelected={setAntibioticos}
                            />

                            <DropdownList
                                title="Anti-inflamatórios"
                                items={['Ibuprofeno', 'Dipirona', 'Nimesulida', 'Naproxeno', 'Diclofenaco',
                                    'Aspirina (AAS)', 'Indometacina', 'Piroxicam', 'Meloxicam', 'Etodolaco', 'Ketoprofeno']}
                                selected={antiInflamatorios}
                                setSelected={setAntiInflamatorios}
                            />

                            <DropdownList
                                title="Analgésicos"
                                items={['Paracetamol', 'Codeína', 'Tramadol', 'Morfina']}
                                selected={analgesicos}
                                setSelected={setAnalgesicos}
                            />

                            <DropdownList
                                title="Anticonvulsivantes"
                                items={['Fenitoína', 'Carbamazepina', 'Lamotrigina', 'Ácido Valproico', 'Fenobarbital']}
                                selected={analgesicos}
                                setSelected={setAnalgesicos}
                            />
                        </View>

                        <TouchableOpacity style={styles.btn} onPress={() => router.push('./cadastroRegistro')}>
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
                </ScrollView>
            </KeyboardAvoidingView>
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
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 50,
        alignItems: 'center',
    },
    body: {
        justifyContent: "center",
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
    containerAlergias: {
        marginBottom: '20%',
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