import DropdownList from '@/components/DropdownList';
import Fonts from '@/constants/Fonts';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function alergiasCadastroResponsavel() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.body}>
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
                                selected={anticonvulsivantes}
                                setSelected={setAnticonvulsivantes}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
})