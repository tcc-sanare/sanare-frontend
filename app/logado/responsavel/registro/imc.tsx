import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';

const Imc = () => {
    const navigation = useNavigation();
    const [altura, setAltura] = useState('');
    const [peso, setPeso] = useState('');

    const handleSave = () => {
        console.log(`Altura: ${altura}`);
        console.log(`Peso: ${peso}`);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <AntDesign name="left" size={30} color={Colors.light.bluePrimary} />
            </TouchableOpacity>

            <Text style={styles.title}>IMC</Text>
            <Text style={styles.subtitle}>Registre seu IMC</Text>

            <Text style={styles.label}>Altura:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 1.80m"
                placeholderTextColor={Colors.light.gray}
                keyboardType="numeric"
                value={altura}
                onChangeText={setAltura}
            />

            <Text style={styles.label}>Peso:</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 80kg"
                placeholderTextColor={Colors.light.gray}
                keyboardType="numeric"
                value={peso}
                onChangeText={setPeso}
            />

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

export default Imc;