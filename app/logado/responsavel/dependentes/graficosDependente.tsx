import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function graficosDependente() {

    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    const router = useRouter();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1
        },
        seta: {
            margin: 45,
            resizeMode: 'contain',
            marginBottom: '12%',
            marginTop: '20%'
        },
        textView: {
            justifyContent: "center",
            alignItems: "center",
            marginBottom: '20%',
            width: '100%'
        },
        text: {
            textAlign: 'center',
            fontSize: 18,
            fontFamily: 'Poppins-Regular',
            color: colors.black,
            width: '85%'
        },
    })
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.push('./dependentes')}>
                <Image
                    source={require('../../../../assets/images/seta.png')}
                    style={styles.seta}
                />
            </TouchableOpacity>

            <View style={styles.textView}>
                <Text style={styles.text}>Visualize os registros de saúde ao longo do tempo.</Text>
            </View>
        </View>
    )
}