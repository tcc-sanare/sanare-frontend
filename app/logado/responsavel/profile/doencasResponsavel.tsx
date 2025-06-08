import DoencaItem from '@/components/doencaItem';
import { useTheme } from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const doencasData = [
    {
        name: 'Anemia Falciforme',
        description: 'Doença hereditária caracterizada por glóbulos vermelhos em forma de foice, que se rompem facilmente, causando anemia e obstruções nos vasos sanguíneos. ',
    },
    {
        name: 'Ansiedade',
        description: 'Transtorno mental caracterizado por preocupação excessiva, nervosismo e sintomas físicos como taquicardia e sudorese.',
    },
    {
        name: 'Asma',
        description: 'Doença respiratória crônica que causa inflamação das vias aéreas, resultando em dificuldade para respirar, chiado e aperto no peito.',
    },
    {
        name: 'Artrite Reumatóide',
        description: 'Doença autoimune crônica que inflama as articulações, levando à dor, inchaço e possível deformidade, afetando a qualidade de vida. ',
    },
    {
        name: 'Depressão',
        description: 'Transtorno mental caracterizado por tristeza profunda, perda de interesse e alterações no sono e apetite.',
    },
    {
        name: 'Diabetes',
        description: 'Condição crônica em que o corpo não produz ou utiliza adequadamente a insulina, levando a níveis elevados de glicose no sangue.',
    },
    {
        name: 'Doença de Crohn',
        description: 'Doença inflamatória intestinal crônica que pode afetar qualquer parte do trato gastrointestinal, causando diarreia, dor abdominal e perda de peso.',
    },
    {
        name: 'Doença Renal Crônica',
        description: 'Perda gradual e irreversível da função dos rins ao longo do tempo, podendo levar à insuficiência renal se não tratada adequadamente.',
    },
    {
        name: 'Fibromialgia',
        description: 'Síndrome crônica caracterizada por dor muscular generalizada, fadiga, distúrbios do sono e problemas de memória e humor. ',
    },
    {
        name: 'Hipertensão',
        description: 'Pressão arterial persistentemente elevada, aumentando o risco de doenças cardíacas, derrames e problemas renais. ',
    },
    {
        name: 'Obesidade',
        description: 'Acúmulo excessivo de gordura corporal, resultante de desequilíbrio entre ingestão e gasto de energia.',
    },
    {
        name: 'Osteoporose',
        description: 'Doença óssea caracterizada pela diminuição da densidade óssea, aumentando o risco de fraturas e lesões.',
    },
];

export default function DoencasResponsavel() {
    const router = useRouter();
    const [selectedDoencas, setSelectedDoencas] = useState<string[]>([]);
    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    
    const toggleDoenca = (name: string) => {
        setSelectedDoencas(prev =>
            prev.includes(name)
                ? prev.filter(d => d !== name)
                : [...prev, name]
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: '10%',
            backgroundColor: colors.background
        },
        seta: {
            margin: 45,
            resizeMode: 'contain',
            marginBottom: '15%'
        },
        body: {
            justifyContent: "center",
            alignItems: "center",
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
            color: colors.black
        },
        sectionDoenca: {
            marginBottom: '10%'
        },
        viewBtn: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10%'
        },
        btn: {
            width: 250,
            height: 70,
            borderRadius: 50,
            overflow: 'hidden',
        },
        btnText: {
            color: '#FFF',
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

    return (
        <View style={styles.container}>
            <ScrollView>
                <TouchableOpacity onPress={() => router.push('./edit-dados')}>
                    <Image
                        source={require('../../../../assets/images/seta.png')}
                        style={styles.seta}
                    />
                </TouchableOpacity>

                <View style={styles.body}>
                    <View style={styles.textView}>
                        <Text style={styles.text}>Selecione as doenças crônicas que possui.</Text>
                    </View>

                    <View style={styles.sectionDoenca}>
                        {doencasData.map(doenca => (
                            <DoencaItem
                                key={doenca.name}
                                name={doenca.name}
                                description={doenca.description}
                                selected={selectedDoencas.includes(doenca.name)}
                                onToggle={() => toggleDoenca(doenca.name)}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.viewBtn}>
                    <TouchableOpacity style={styles.btn}
                        onPress={() => {
                            Keyboard.dismiss();
                            router.push('./edit-dados')

                        }}
                    >
                        <LinearGradient
                            colors={['#005EB7', '#CEECF5']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 3.8 }}
                            style={styles.btnGradient}
                        >
                            <Text style={styles.btnText}>Salvar</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
