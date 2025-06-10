import { useTheme } from '@/hooks/useTheme';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

const Lembretes = () => {
    const router = useRouter();
    const { isDarkMode, toggleDarkMode, colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        header: {
            backgroundColor: colors.bluePrimary,
            justifyContent: 'center',
            flexDirection: 'row',
            height: 150,
            alignItems: 'center',
        },
        seta: {
            margin: 45,
            resizeMode: 'contain',
            marginBottom: '15%',
            marginTop: '20%'
        },
        headerText: {
            fontSize: 28,
            marginTop: 25,
            fontFamily: 'Poppins-Medium',
            color: colors.white,
        },
        content: {
            padding: 28,
            paddingBottom: 80,
        },
        rowBetween: {
            justifyContent: 'center',
            backgroundColor: 'red',
            height: 70,
            paddingHorizontal: 20,
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
        },
        fieldAdd: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '10%'
        },
        textAdd: {
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            color: colors.black,
        },
        separator: {
            height: 1,
            backgroundColor: '#ccc',
            marginVertical: 16,
        },
        avisoView: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25
        },
        aviso: {
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            color: colors.description
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('./home')}>
                    <MaterialIcons
                        name='arrow-back-ios'
                        size={24}
                        color={colors.white}
                        style={{
                            position: 'absolute',
                            right: 60
                        }}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>Lembretes</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.fieldAdd}>
                    <Text style={styles.textAdd}>Adicionar</Text>
                    <TouchableOpacity>
                        <AntDesign name="pluscircle" size={24} color={colors.bluePrimary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                <View style={styles.avisoView}>
                    <Text style={styles.aviso}>Você não tem nenhum lembrete adicionado</Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default Lembretes;