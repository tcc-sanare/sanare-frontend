import Colors from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

const Glicemia = () => {
    const navigation = useNavigation();

    const handleSave = () => {
        console.log('Glicemia registrada!');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <AntDesign name="left" size={30} color={Colors.light.bluePrimary} />
            </TouchableOpacity>

            <Text style={styles.title}>Glicemia</Text>
            <Text style={styles.subtitle}>Registre sua glicemia!</Text>

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

export default Glicemia;