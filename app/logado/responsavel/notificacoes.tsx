import { useTheme } from '@/hooks/useTheme';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Notificacoes() {
    const router = useRouter();
    const { colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        header: {
            backgroundColor: colors.bluePrimary,
            justifyContent: 'center',
            height: 150,
        },
        seta: {
            resizeMode: 'contain',
            width: 25
        },
        notificacoes: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25,
            width: '100%'
        },
        headerText: {
            fontSize: 28,
            fontFamily: 'Poppins-Medium',
            color: colors.white,
        },
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('./home')} style={styles.notificacoes}>
                    <MaterialIcons
                        name='arrow-back-ios'
                        size={26}
                        color={colors.white}
                        style={{
                            position: 'absolute',
                            left: 50
                        }}
                    />
                    <Text style={styles.headerText}>Notificações</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}