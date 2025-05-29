import Colors from '@/constants/Colors';
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from 'react-native';

export default function EditTipoUser() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text >Edit tipo user screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        alignItems: 'center'
    }
})