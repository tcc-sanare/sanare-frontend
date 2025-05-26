import Colors from '@/constants/Colors';
import { useRouter } from "expo-router";
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeResponsavel() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text onPress={() => router.push('./profile/profile')}>Perfil Responsavel</Text>
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