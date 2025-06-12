import { useTheme } from '@/hooks/useTheme';
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function dependentesCadastrados() {
    const router = useRouter();
    const { isDarkMode, toggleDarkMode, colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background
        },
        seta: {
            margin: 45,
            resizeMode: 'contain',
            marginBottom: '18%',
            marginTop: '20%'
        },
        sectionText: {
            alignItems: 'center',
            gap: 40
        },
        textDependente: {
            fontFamily: 'Poppins-Medium',
            fontSize: 30,
            color: colors.black
        },
        text: {
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            textAlign: 'center',
            color: colors.black
        },
        sectionDependentes: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20%'
        },
        containerView: {
            justifyContent: 'center',
            width: '90%',
            height: 'auto',
            paddingVertical: 30,
            backgroundColor: colors.cards,
            elevation: 4,
            borderRadius: 25,
            gap: 15,
            marginBottom: 40
        },
        textRegistro: {
            textAlign: 'center',
            fontFamily: 'Poppins-Medium',
            fontSize: 17,
            color: colors.desvincular,
        },
        cardView: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 15,
            elevation: 4
        },
        photo: {
            width: 60,
            height: 60,
            borderRadius: 100,
            marginHorizontal: 25,
            resizeMode: 'cover'
        },
        name: {
            fontFamily: 'Poppins-Medium',
            fontSize: 18,
            width: '50%',
            flexWrap: 'nowrap',
            color: colors.black
        },
    })

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.push('../home')}>
                <Image
                    source={require('../../../../assets/images/seta.png')}
                    style={styles.seta}
                />
            </TouchableOpacity>

            <View style={styles.sectionText}>
                <Text style={styles.textDependente}>Dependentes</Text>
                <Text style={styles.text}>Monitore aqui seus dependentes cadastrados.</Text>
            </View>

            <View style={styles.sectionDependentes}>

                <TouchableOpacity
                    onPress={() => {
                        router.push({
                            pathname: './detalhes',
                            params: {
                                nome: 'Maria Santos',
                                foto: 'profile-photo.jpg',
                            }
                        })

                    }}
                    style={styles.containerView}>
                    <Text style={styles.textRegistro}>Fez um novo registro, venha conferir</Text>
                    <View style={styles.cardView}>
                        <Image
                            source={require('../../../../assets/images/profile-photo.jpg')}
                            style={styles.photo}
                        />
                        <Text style={styles.name}>Maria Santos</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        router.push({
                            pathname: './detalhes',
                            params: {
                                nome: 'Joice Soares',
                                foto: 'photo-dependente.jpg',
                            }
                        })
                    }}
                    style={styles.containerView}>
                    <View style={styles.cardView}>
                        <Image
                            source={require('../../../../assets/images/photo-dependente.jpg')}
                            style={styles.photo}
                        />
                        <Text style={styles.name}>Joice Soares</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    )
}