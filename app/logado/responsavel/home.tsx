import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeResponsavel() {
    const router = useRouter();

    return (
        <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Olá Nicolas</Text>
                </View>
            <View style={styles.body}>

                <View style={styles.content}>
                    <Text onPress={() => router.push('./profile/profile')}>
                        Perfil Responsável
                    </Text>
                    <Text>TESTEEE</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.bluePrimary,
    },
    body: {
        backgroundColor: Colors.light.background,
        width: '100%',
        height: '100%',
        marginTop: '30%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15

    },
    header: {},
    headerText: {},
    content: {},
});