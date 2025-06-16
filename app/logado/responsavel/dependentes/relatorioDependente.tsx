import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function relatorioDependente() {

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
    })
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.push('./dependentes')}>
                <Image
                    source={require('../../../../assets/images/seta.png')}
                    style={styles.seta}
                />
            </TouchableOpacity>
        </View>
    )
}