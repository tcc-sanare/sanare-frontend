import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Glicemia = () => {
    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    const router = useRouter();

    const handleSave = () => {
        console.log('Glicemia registrada!');
        router.push('./registro');
    };

    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: colors.background,
        },
        seta: {
            margin: 45,
            resizeMode: 'contain',
            marginTop: '20%'
        },
        title: {
            fontSize: 32,
            fontFamily: 'Poppins-Medium',
            color: colors.bluePrimary,
            marginBottom: 20,
        },
        subtitle: {
            fontSize: 16,
            fontFamily: 'Poppins-Regular',
            textAlign: 'center',
            color: colors.black,
            marginBottom: 50,
        },
        saveButton: {
            paddingVertical: 12,
            paddingHorizontal: 40,
            borderRadius: 30,
            marginTop: 35,
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            backgroundColor: colors.bluePrimary,
        },
        saveButtonText: {
            color: colors.white,
            fontSize: 20,
            fontFamily: 'Poppins-SemiBold',
        },
    });


    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableOpacity onPress={() => router.push('./registro')}>
                        <Image
                            source={require('../../../../assets/images/seta.png')}
                            style={styles.seta}
                        />
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 50 }}>
                        <Text style={styles.title}>Glicemia</Text>
                        <Text style={styles.subtitle}>Registre sua glicemia!</Text>

                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Glicemia;