import DoencaItem from '@/components/doencaItem';
import Fonts from '@/constants/Fonts';
import { useCadastro } from '@/contexts/cadastroContext';
import { getChronicDiseases } from '@/http/get-chronic-diseases';
import { ChronicDisease } from '@/interfaces/chronic-disease';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function doencasCadastro() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [selectedDoencas, setSelectedDoencas] = useState<string[]>([]);
    const [doencas, setDoencas] = useState<ChronicDisease[] | undefined>(undefined);
    const { setUserData } = useCadastro();

    useEffect(() => {
        setUserData(prev => ({
            ...prev,
            saude: prev.saude ?? {
                doencas: [],
                alergias: [],
                campos: {
                    humor: false,
                    sintomas: false,
                    hidratacao: false,
                    glicemia: false,
                    pressaoArterial: false,
                    imc: false
                }
            }
        }));

        getChronicDiseases().then(response => {
            setDoencas(response.chronicDiseases);
        })
            .catch(error => {
                console.error('Erro ao carregar doenças crônicas:', error);
            });
    }, []);
    const toggleDoenca = (name: string) => {
        setSelectedDoencas(prev =>
            prev.includes(name)
                ? prev.filter(d => d !== name)
                : [...prev, name]
        );
    };

    useEffect(() => {
        setUserData(prev => ({
            ...prev,
            saude: {
                ...prev.saude,
                doencas: selectedDoencas,
                alergias: prev.saude?.alergias ?? [],
                campos: prev.saude?.campos ?? {
                    humor: false,
                    sintomas: false,
                    hidratacao: false,
                    glicemia: false,
                    pressaoArterial: false,
                    imc: false
                }
            }
        }));
    }, [selectedDoencas]);

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
            <ScrollView style={{ padding: 16 }}>
                <View style={styles.body}>
                    <View style={styles.textView}>
                        <Text style={styles.text}>Selecione as doenças crônicas que possui.</Text>
                    </View>

                    {doencas && <View style={styles.containerDoencas}>
                        {doencas.map(doenca => (
                            <DoencaItem
                                key={doenca.id}
                                name={doenca.name}
                                description={doenca.description}
                                selected={selectedDoencas.includes(doenca.id)}
                                onToggle={() => toggleDoenca(doenca.id)}
                            />
                        ))}
                    </View>
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        justifyContent: "center",
        alignItems: "center",
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
    containerDoencas: {
        marginBottom: '20%',
    },
})