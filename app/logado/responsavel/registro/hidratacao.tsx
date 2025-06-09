import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const Hidratacao = () => {
    const navigation = useNavigation();
    const [litros, setLitros] = useState('');

    const handleSave = () => {
        console.log(`Litros consumidos: ${litros}`);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <AntDesign name="left" size={30} color={Colors.light.bluePrimary} />
            </TouchableOpacity>

            <Text style={styles.title}>Hidratação</Text>
            <Text style={styles.subtitle}>Como está a sua hidratação?</Text>


            <Image
                source={require('../../../../assets/images/agua.png')}
                style={styles.image}
                resizeMode="contain"
            />


            <TextInput
                style={styles.input}
                placeholder="Litros"
                placeholderTextColor={Colors.light.gray}
                keyboardType="numeric"
                value={litros}
                onChangeText={setLitros}
            />

            <View style={styles.pagination}>
                <View style={styles.dot} />
                <View style={[styles.dot, styles.activeDot]} />
                <View style={styles.dot} />
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
    image: {
        top: 120,
        width: 360,
        height: 160,
        marginBottom: 10,
    },
    input: {
        top: 140,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.gray,
        fontSize: 16,
        width: '60%',
        marginBottom: 40,
        fontFamily: 'Poppins-Regular',
        color: Colors.light.black,
        textAlign: 'left',
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
    pagination: {
        top: 190,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 32,
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

export default Hidratacao;