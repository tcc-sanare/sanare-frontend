import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function HomeResponsavel() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* TOPO */}
            <View style={styles.header}>
                <Image
                    style={styles.detalhe}
                    // source={require('../../../../assets/images/detalhe.png')}
                    source={require('../../../assets/images/detalhe.svg')}
                    resizeMode="cover"
                />

                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.bomDia}>Bom dia!</Text>
                        <Text style={styles.nome}>Nicolas Faustino</Text>
                    </View>

                    <TouchableOpacity onPress={() => console.log('Notificações')}>
                        <Image
                            source={require('../../../assets/images/sino.svg')}
                            style={styles.sino}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* CORPO */}
            <View style={styles.body}>
                <Text style={styles.servicosTitle}>Nossos serviços</Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.servicosContainer}
                >
                    <TouchableOpacity onPress={() => router.push('./saude')}>
                        <Image
                            source={require('../../../assets/images/Saude.svg')}
                            style={styles.servicoCard}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('./dependentes')}>
                        <Image
                            source={require('../../../assets/images/Dependentes.svg')}
                            style={styles.servicoCard}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('./relatorios')}>
                        <Image
                            source={require('../../../assets/images/Relatorios.svg')}
                            style={styles.servicoCard}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('./lembretes')}>
                        <Image
                            source={require('../../../assets/images/Lembretes.svg')}
                            style={styles.servicoCard}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('./dicas')}>
                        <Image
                            source={require('@/assets/images/Dicas.svg')}
                            style={styles.servicoCard}
                        />
                    </TouchableOpacity>
                </ScrollView>

                <Text style={styles.hojeTitle}>Para hoje:</Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.bluePrimary,
    },
    header: {
        position: 'relative',
        height: 118,
        paddingHorizontal: 24,
        justifyContent: 'flex-end',
        paddingBottom: 20,
    },
    detalhe: {
        position: 'absolute',
        width: 417,
        height: 155,
        top: 0,
        left: 0,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2,
    },
    bomDia: {
        color: Colors.light.white,
        fontSize: 14,
        fontFamily: 'Poppins-Regular',
    },
    nome: {
        color: Colors.light.white,
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
    },
    sino: {
        width: 40,
        height: 40,
    },
    body: {
        flex: 1,
        backgroundColor: Colors.light.white,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 24,
        paddingHorizontal: 20,
    },
    servicosTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: '#000',
        marginBottom: 16,
    },
    servicosContainer: {
        paddingRight: 12,
    },
    servicoCard: {
        width: 100,
        height: 100,
        marginRight: 0,
        resizeMode: 'contain',
    },
    hojeTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: '#000',
        marginBottom: 310,
    },
});