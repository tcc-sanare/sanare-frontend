import DropdownListRegistro from '@/components/DropdownListRegistro';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function cadastroRegistro() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const router = useRouter();
    const [monitoramentosSelecionados, setMonitoramentosSelecionados] = useState<string[]>([]);

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
                <View style={styles.textView}>
                    <Text style={styles.text}>Selecione o que você deseja monitorar:</Text>
                </View>

                <View style={styles.viewRegistro}>
                    <DropdownListRegistro
                        title=""
                        items={[
                            'Humor',
                            'Sintomas',
                            'IMC',
                            'Hidratação',
                            'Pressão Arterial',
                            'Glicemia',
                        ]}
                        selected={monitoramentosSelecionados}
                        setSelected={setMonitoramentosSelecionados}
                    />
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => router.push('../../logado/user/home')}>
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
        marginBottom: '10%',
        width: '85%'
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
    },
    viewRegistro: {
        marginLeft: '25%',
        width: '100%',
        marginBottom: 30,
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