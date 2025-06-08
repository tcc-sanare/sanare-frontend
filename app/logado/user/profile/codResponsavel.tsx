import Colors from "@/constants/Colors";
import { useTheme } from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CodResponsavelUser() {
    const router = useRouter();
    const { isDarkMode, toggleDarkMode, colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            justifyContent: 'center',
            alignItems: "center",
        },
        textView: {
            marginBottom: '20%',
            width: '85%'
        },
        text: {
            textAlign: 'center',
            fontSize: 18,
            fontFamily: 'Poppins-Regular',
            color: colors.black,
        },
        CadastrotextView: {
            alignItems: "center",
            gap: 35,
        },
        titulo: {
            color: Colors.light.bluePrimary,
            fontFamily: 'Poppins-SemiBold',
            fontSize: 30
        },
        textCod: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 20,
            color: colors.black,
        },
        codigo: {
            fontFamily: 'Poppins-Medium',
            fontSize: 36,
            color: Colors.light.bluePrimary,
            textDecorationLine: 'underline'
        },
        btn: {
            width: 280,
            height: 70,
            borderRadius: 50,
            overflow: 'hidden',
            marginTop: '25%'
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

    return (
        <View style={styles.container}>

            <View style={styles.textView}>
                <Text style={styles.text}> Vincule-se a um dependente usando seu código de responsável.</Text>
            </View>

            <View style={styles.CadastrotextView}>
                <Text style={styles.textCod}>Seu código de responsável é:</Text>
                <Text style={styles.codigo}>SANARE-123</Text>
            </View>

            <TouchableOpacity style={styles.btn} onPress={() => router.push('../../responsavel/home')}>
                <LinearGradient
                    colors={['#005EB7', '#CEECF5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 3.8 }}
                    style={styles.btnGradient}
                >
                    <Text style={styles.btnText}>Prosseguir</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}