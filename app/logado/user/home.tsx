import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

const carouselData = [
    {
        id: 1,
        title: 'Como está sua saúde?',
        subtitle: 'Registre seus dados hoje.',
        image: require('../../../assets/images/cardregistro.png'),
        label: 'Saúde',
        button: 'Registrar',
        route: './registrar',
    },
    {
        id: 2,
        title: 'Você tem (2) lembretes!',
        subtitle: 'Não esqueça de verificá-los.',
        image: require('../../../assets/images/cardlembretes.png'),
        label: 'Lembretes',
        button: 'Ver lembretes',
        route: './lembretes',
    },
];

export default function HomeUser() {
    const router = useRouter();
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef<ScrollView | null>(null);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (index + 1) % carouselData.length;
            setIndex(nextIndex);
            scrollRef.current?.scrollTo({ x: nextIndex * width * 0.85, animated: true });
        }, 4000);

        return () => clearInterval(interval);
    }, [index]);

    const floatAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(floatAnim, {
                    toValue: -10,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(floatAnim, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            {/* TOPO */}
            <View style={styles.header}>
                <Image
                    source={require('../../../assets/images/detalhe.png')}
                    style={styles.detalhe}
                    resizeMode="cover"
                />

                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.bomDia}>Bom dia!</Text>
                        <Text style={styles.nome}>Nicolas Faustino</Text>
                    </View>

                    <TouchableOpacity onPress={() => console.log('Notificações')}>
                        <Image
                            source={require('../../../assets/images/sino.png')}
                            style={styles.sino}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* CORPO */}
            <View style={styles.body}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.timeline}>
                        <Text style={styles.servicosTitle}>Nossos serviços</Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.servicosContainer}
                        >
                            <TouchableOpacity onPress={() => router.push('./saude')}>
                                <Image
                                    source={require('../../../assets/images/Saude.png')}
                                    style={styles.servicoCard}
                                />
                                <Text style={styles.cardText}>Saúde</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={() => router.push('./dependentes')}>
                                <Image
                                    source={require('../../../assets/images/Dependentes.png')}
                                    style={styles.servicoCard}
                                />
                                <Text style={styles.cardTextt}>Dependentes</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={() => router.push('./relatorios')}>
                                <Image
                                    source={require('../../../assets/images/Relatorios.png')}
                                    style={styles.servicoCard}
                                />
                                <Text style={styles.cardTextj}>Relatórios</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('./lembretes')}>
                                <Image
                                    source={require('../../../assets/images/Lembretes.png')}
                                    style={styles.servicoCard}
                                />
                                <Text style={styles.cardTextj}>Lembretes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('./dicas')}>
                                <Image
                                    source={require('../../../assets/images/Dicas.png')}
                                    style={styles.servicoCard}
                                />
                                <Text style={styles.cardText}>Dicas</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                    <View style={styles.hojeContainer}>
                        <Text style={styles.hojeTitle}>Para hoje:</Text>
                        <TouchableOpacity>
                            <Text style={styles.verTitle}>Ver tudo</Text>
                        </TouchableOpacity>
                    </View>

                    <Animated.ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        ref={scrollRef}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false }
                        )}
                        style={{ marginTop: 16 }}
                    >
                        {carouselData.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                activeOpacity={0.9}
                                style={styles.cardContainer}
                                onPress={() => router.push(item.route as any)}
                            >
                                <View style={styles.card}>
                                    <View style={styles.cardTop}>
                                        <Image source={item.image} style={styles.cardIcon} />
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.cardLabel}>{item.label}</Text>
                                            <Text style={styles.cardTitle}>{item.title}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                                    <TouchableOpacity style={styles.cardButton}>
                                        <Text style={styles.cardButtonText}>{item.button}</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </Animated.ScrollView>
                    <View style={styles.indicatorContainer}>
                        {carouselData.map((_, i) => {
                            const inputRange = [(i - 1) * width * 0.85, i * width * 0.85, (i + 1) * width * 0.85];

                            const backgroundColor = scrollX.interpolate({
                                inputRange,
                                outputRange: ['#D9D9D9', '#0057B0', '#D9D9D9'],
                                extrapolate: 'clamp',
                            });

                            return (
                                <Animated.View
                                    key={i}
                                    style={[styles.indicator, { backgroundColor }]}
                                />
                            );
                        })}
                    </View>
                    <View style={styles.destaques}>
                        <View style={styles.destaquesHeader}>
                            <Text style={styles.destaquesTitle}>Destaques:</Text>
                            <TouchableOpacity>
                                <Text style={styles.destaquesVer}>Ver tudo</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.destaqueItem}>
                            <Image
                                source={require('../../../assets/images/diabetes.png')}
                                style={styles.destaqueIcon}
                            />
                            <View>
                                <Text style={styles.destaqueTitulo}>Diabetes</Text>
                                <Text style={styles.destaqueTexto}>Você melhorou seu controle de glicose!</Text>
                            </View>
                        </View>

                        <View style={styles.destaqueItem}>
                            <Image
                                source={require('../../../assets/images/asma.png')}
                                style={styles.destaqueIcon}
                            />
                            <View>
                                <Text style={styles.destaqueTitulo}>Asma</Text>
                                <Text style={styles.destaqueTexto}>Suas crises de asma diminuíram!</Text>
                            </View>
                        </View>

                        <View style={styles.destaqueItem}>
                            <Image
                                source={require('../../../assets/images/pressao.png')}
                                style={styles.destaqueIcon}
                            />
                            <View>
                                <Text style={styles.destaqueTitulo}>Pressão Arterial</Text>
                                <Text style={styles.destaqueTexto}>A sua pressão está estabilizada.</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 80,
                        right: 10,
                        transform: [{ translateY: floatAnim }],
                        zIndex: 10,
                    }}
                >
                    <TouchableOpacity onPress={() => router.push('./chat')}>
                        <Image
                            source={require('../../../assets/images/San.png')}
                            style={{ width: 70, height: 70 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </Animated.View>
            </View>

            {/* NAV */}
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.push('./homeResponsavel')}>
                    <Image
                        source={require('../../../assets/images/inicio.png')}
                        style={[styles.navIcon, styles.navIconActive]}
                        resizeMode="contain"
                    />
                    <Text style={[styles.navText, styles.navTextActive]}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => router.push('./comunidade')}>
                    <Image
                        source={require('../../../assets/images/comunidade.png')}
                        style={styles.navIcon}
                        resizeMode="contain"
                    />
                    <Text style={styles.navText}>Comunidade</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => router.push('./profile/profile')}>
                    <Image
                        source={require('../../../assets/images/perfil.png')}
                        style={styles.navIcon}
                        resizeMode="contain"
                    />
                    <Text style={styles.navText}>Perfil</Text>
                </TouchableOpacity>
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
        width: '100%',
        height: '100%',
    },
    servicosTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: Colors.light.black,
        marginTop: 20,
        marginBottom: 40,
    },
    servicosContainer: {
        paddingRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    servicoCard: {
        width: 100,
        height: 120,
        marginRight: 0,
        resizeMode: 'contain',
    },
    cardText: {
        fontSize: 11,
        fontFamily: 'Poppins-Medium',
        color: Colors.light.black,
        position: 'absolute',
        top: 80,
        left: 29,
    },
    cardTextt: {
        fontSize: 11,
        fontFamily: 'Poppins-Medium',
        color: Colors.light.black,
        position: 'absolute',
        top: 80,
        left: 14,
        right: 0,
    },
    cardTextj: {
        fontSize: 11,
        fontFamily: 'Poppins-Medium',
        color: Colors.light.black,
        position: 'absolute',
        top: 80,
        left: 20,
    },
    hojeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 87,
    },
    hojeTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        color: Colors.light.black,
    },
    verTitle: {
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        color: Colors.light.bluePrimary,
    },
    cardContainer: {
        width: width * 0.85,
        marginRight: 16,
    },
    card: {
        backgroundColor: Colors.light.grayOpacity,
        borderRadius: 16,
        padding: 16,
        height: 160,
        justifyContent: 'space-between',
    },
    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    cardIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    cardLabel: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color: Colors.light.blackOpacity,
    },
    cardTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: Colors.light.black,
    },
    cardSubtitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: Colors.light.blackOpacity,
        left: 52,
        top: -10,
    },
    cardButton: {
        alignSelf: 'center',
        width: 185,
        backgroundColor: Colors.light.bluePrimary,
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 24,
        marginTop: 4,
    },
    cardButtonText: {
        alignSelf: 'center',
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: Colors.light.white,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 2,
    },
    indicator: {
        height: 3,
        width: 24,
        borderRadius: 3,
        backgroundColor: Colors.light.grayOpacity,
        marginHorizontal: 6,
    },
    destaques: {
        marginTop: 67,
        marginBottom: 35,
    },
    destaquesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    destaquesTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        color: Colors.light.black,
    },
    destaquesVer: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: Colors.light.bluePrimary
    },
    destaqueItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    destaqueIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        padding: 8,
        resizeMode: 'contain',
    },
    destaqueTitulo: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: Colors.light.black,
    },
    destaqueTexto: {
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        color: Colors.light.blackOpacity,
    },
    timeline: {
        marginBottom: 16,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 95,
        width: '100%',
        backgroundColor: Colors.light.grayOpacity,
        paddingBottom: 10,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navIcon: {
        width: 33,
        height: 38,
        marginBottom: 4,
    },
    navIconActive: {
        tintColor: Colors.light.bluePrimary,
    },
    navText: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: Colors.light.blackOpacity,
    },
    navTextActive: {
        fontFamily: 'Poppins-Medium',
        color: Colors.light.bluePrimary,
    },
});