import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '@/constants/Colors';

const Pressao = () => {
    const navigation = useNavigation();
    const [sistolica, setSistolica] = useState('');
    const [diastolica, setDiastolica] = useState('');

    const handleSave = () => {
        console.log(`Sistólica: ${sistolica} mmHg`);
        console.log(`Diastólica: ${diastolica} mmHg`);

    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <AntDesign name="left" size={30} color={Colors.light.bluePrimary} />
            </TouchableOpacity>

            <Text style={styles.title}>Pressão Arterial</Text>
            <Text style={styles.subtitle}>Como está a sua Pressão Arterial?</Text>


            <Text style={styles.label}>Sistólica (maior):</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 123 mmHg"
                placeholderTextColor={Colors.light.gray}
                keyboardType="numeric"
                value={sistolica}
                onChangeText={setSistolica}
            />


            <Text style={styles.label}>Diastólica (menor):</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 86 mmHg"
                placeholderTextColor={Colors.light.gray}
                keyboardType="numeric"
                value={diastolica}
                onChangeText={setDiastolica}
            />

            <View style={styles.pagination}>
                <View style={styles.dot} />
                <View style={styles.dot} />
                <View style={[styles.dot, styles.activeDot]} />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        backgroundColor: Colors.light.background,
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    title: {
        fontSize: 32,
        top: 60,
        fontFamily: 'Poppins-Regular',
        color: Colors.light.bluePrimary,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        top: 90,
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        marginBottom: 24,
        color: Colors.light.black,
    },
    label: {
        top: 150,
        alignSelf: 'flex-start',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: Colors.light.bluePrimary,
        marginBottom: 4,
        marginTop: 12,
    },
    input: {
        top: 160,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.gray,
        fontSize: 16,
        width: '100%',
        fontFamily: 'Poppins-Regular',
        color: Colors.light.black,
        marginBottom: 16,
    },
    pagination: {
        top: 190,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 32,
    },
    dot: {
        width: 16,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#ccc',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: Colors.light.bluePrimary,
    },
    saveButton: {
        top: 200,
        width: 180,
        backgroundColor: Colors.light.bluePrimary,
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: Colors.light.white,
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
});

export default Pressao;