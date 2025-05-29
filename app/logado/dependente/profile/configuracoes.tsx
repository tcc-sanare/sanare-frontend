import Colors from '@/constants/Colors';
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useState } from 'react';
// import { Dropdown } from 'react-native-element-dropdown';

const userTypes = [
    { label: 'Responsável', value: 'Responsável' },
    { label: 'Dependente', value: 'Dependente' },
    { label: 'Usuário comum', value: 'Usuário comum' },
];

export default function ConfigDependente() {
    const router = useRouter();
    // const [selectedUserType, setSelectedUserType] = React.useState('Dependente');


    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/images/bgSanare.png')}
                style={styles.logoFooter}
            />

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity onPress={() => router.push('./profile')}>
                    <Image
                        source={require('../../../../assets/images/seta.png')}
                        style={styles.seta}
                    />
                </TouchableOpacity>

                <View style={styles.tipoUser}>
                    <Text style={styles.text}>Perfil:</Text>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    logoFooter: {
        position: 'absolute',
        bottom: 0,
        top: '31%',
        resizeMode: 'contain',
        left: 0,
        right: 0,
        height: '100%',
        width: '100%'
    },
    seta: {
        margin: 45,
        resizeMode: 'contain',
        marginBottom: '15%',
        marginTop: '20%'
    },
    tipoUser: {

    },
    text: {

    },
})