import Colors from '@/constants/Colors';
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function detalhesDependente() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.push('../home')}>
                <Image
                    source={require('../../../../assets/images/seta.png')}
                    style={styles.seta}
                />
            </TouchableOpacity>
            <Text> Detalhe Dependente Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    seta: {
        margin: 45,
        resizeMode: 'contain',
        marginBottom: '18%',
        marginTop: '20%'
    },
})

