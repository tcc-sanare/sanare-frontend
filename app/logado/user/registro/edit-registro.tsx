import DropdownListRegistro from '@/components/DropdownListRegistro';
import { useTheme } from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EditRegistro() {
    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    const router = useRouter();
    const [monitoramentosSelecionados, setMonitoramentosSelecionados] = useState<string[]>([]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            alignItems: 'center'
        },
        tittle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 32,
            marginTop: '25%',
            color: colors.bluePrimary,
            marginBottom: '10%'
        },
        text: {
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            textAlign: 'center',
            color: colors.black
        },
        viewRegistro: {
            marginLeft: '35%',
            width: '100%',
            marginBottom: 30,
            marginTop: '15%'
        },
        btn: {
            width: 250,
            height: 70,
            borderRadius: 50,
            overflow: 'hidden',
        },
        btnText: {
            color: colors.white,
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
            <Text style={styles.tittle}>Registros</Text>

            <View style={{ justifyContent: 'center', alignItems: 'center', width: '85%' }}>
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

            <TouchableOpacity style={styles.btn} onPress={() => router.push('./registro')}>
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
    )
}