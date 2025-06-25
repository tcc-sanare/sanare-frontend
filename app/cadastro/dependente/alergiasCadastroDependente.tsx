import DropdownList from '@/components/DropdownList';
import Fonts from '@/constants/Fonts';
import { useCadastro } from '@/contexts/cadastroContext';
import { getAllergies } from '@/http/get-allergies';
import { Allergy } from '@/interfaces/allergy';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function alergiasCadastroDependente() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [antiInflamatorios, setAntiInflamatorios] = useState<{ id: string; description: string }[]>([]);
    const [analgesicos, setAnalgesicos] = useState<{ id: string; description: string }[]>([]);
    const [antibioticos, setAntibioticos] = useState<{ id: string; description: string }[]>([]);
    const [anticonvulsivantes, setAnticonvulsivantes] = useState<{ id: string; description: string }[]>([]);
    const [alergias, setAlergias] = useState<Allergy[] | undefined>(undefined);
    const { setDependenteData } = useCadastro();

    useEffect(() => {
        getAllergies()
            .then(response => {
                setAlergias(response.allergies);
            })
            .catch(error => {
                console.error('Erro ao carregar alergias:', error);
            });
    }, []);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync(Fonts);
            setFontsLoaded(true);
        }

        loadFonts();
    }, []);

    useEffect(() => {
        setDependenteData(prev => ({
            ...prev,
            saude: {
                ...prev.saude,
                alergias: [
                    ...analgesicos,
                    ...antiInflamatorios,
                    ...antibioticos,
                    ...anticonvulsivantes
                ],
                doencas: prev.saude!.doencas ?? [],
                campos: prev.saude!.campos
            }
        }))
    }, [analgesicos, antiInflamatorios, antibioticos, anticonvulsivantes]);

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

                        <View>
                            {alergias && (
                                <>
                                    <DropdownList
                                        title="Antibióticos"
                                        items={alergias.filter(a => a.type === "antibiotic").map(a => ({
                                            id: a.id,
                                            name: a.name
                                        }))}
                                        selected={antibioticos}
                                        setSelected={setAntibioticos}
                                    />

                                    <DropdownList
                                        title="Anti-inflamatórios"
                                        items={alergias.filter(a => a.type === "anti-inflammatory").map(a => ({
                                            id: a.id,
                                            name: a.name
                                        }))}
                                        selected={antiInflamatorios}
                                        setSelected={setAntiInflamatorios}
                                    />

                                    <DropdownList
                                        title="Analgésicos"
                                        items={alergias.filter(a => a.type === "analgesic").map(a => ({
                                            id: a.id,
                                            name: a.name
                                        }))}
                                        selected={analgesicos}
                                        setSelected={setAnalgesicos}
                                    />

                                    <DropdownList
                                        title="Anticonvulsivantes"
                                        items={alergias.filter(a => a.type === "anticonvulsant").map(a => ({
                                            id: a.id,
                                            name: a.name
                                        }))}
                                        selected={anticonvulsivantes}
                                        setSelected={setAnticonvulsivantes}
                                    />
                                </>
                            )}
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
    }
})