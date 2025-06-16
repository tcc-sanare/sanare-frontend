import { useTheme } from '@/hooks/useTheme';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function detalhesDependente() {
    const router = useRouter();
    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    const { nome, foto } = useLocalSearchParams()

    const fotoSource = () => {
        switch (foto) {
            case 'profile-photo.jpg':
                return require('../../../../assets/images/profile-photo.jpg');
            case 'photo-dependente.jpg':
                return require('../../../../assets/images/photo-dependente.jpg');
            default:
                return require('../../../../assets/images/default-photo.png');
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingBottom: 60
        },
        seta: {
            margin: 45,
            resizeMode: 'contain',
            marginBottom: '12%',
            marginTop: '20%'
        },
        section: {
            alignItems: 'center',
            flexDirection: 'row',
            gap: 20,
            marginHorizontal: 35,
        },
        containerView: {
            marginHorizontal: 35,
            marginTop: 50,
            gap: 20,
        },
        foto: {
            width: 60,
            height: 60,
            borderRadius: 100,
            resizeMode: 'cover'
        },
        nome: {
            fontFamily: 'Poppins-Medium',
            fontSize: 20,
            color: colors.black,
        },
        scroll: {
            flexDirection: 'row',
        },
        card: {
            backgroundColor: colors.bluePrimary,
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 15,
            marginRight: 15,
            minWidth: 120,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            color: colors.white,
            fontFamily: 'Poppins-Regular',
            fontSize: 16
        },
        tittle: {
            color: colors.bluePrimaryTittles,
            fontFamily: 'Poppins-SemiBold',
            fontSize: 24
        },
        sectionConfig: {
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
        },
        ConfigItem: {
            width: '90%',
            backgroundColor: colors.ConfigItemcolor,
            height: 80,
            borderRadius: 15,
            elevation: 4,
            justifyContent: 'center',
            alignItems: 'center',
        },
        textConfig: {
            fontFamily: 'Poppins-Medium',
            fontSize: 22,
            color: colors.black
        },
    })

    return (
        <View style={styles.container}>

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity onPress={() => router.push('./dependentes')}>
                    <Image
                        source={require('../../../../assets/images/seta.png')}
                        style={styles.seta}
                    />
                </TouchableOpacity>
                <View style={styles.section}>
                    <Image source={fotoSource()} style={styles.foto} />
                    <Text style={styles.nome}>{nome}</Text>
                </View>

                <View style={styles.containerView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image
                            source={require('../../../../assets/images/decoration.png')}
                            style={{ width: 21, height: 21, resizeMode: 'contain' }}
                        />

                        <Text style={styles.tittle}>Doenças</Text>

                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.scroll}
                    >
                        <View style={styles.card}><Text style={styles.text}>Diabetes</Text></View>
                        <View style={styles.card}><Text style={styles.text}>Hipertensão</Text></View>
                        <View style={styles.card}><Text style={styles.text}>Asma</Text></View>
                    </ScrollView>
                </View>

                <View style={styles.containerView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image
                            source={require('../../../../assets/images/decoration.png')}
                            style={{ width: 21, height: 21, resizeMode: 'contain' }}
                        />

                        <Text style={styles.tittle}>Alergias</Text>

                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.scroll}
                    >
                        <View style={styles.card}><Text style={styles.text}>Amoxilina</Text></View>
                        <View style={styles.card}><Text style={styles.text}>Peniclina</Text></View>
                        <View style={styles.card}><Text style={styles.text}>Ibuprofeno</Text></View>
                    </ScrollView>
                </View>

                <View style={styles.containerView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Image
                            source={require('../../../../assets/images/decoration.png')}
                            style={{ width: 21, height: 21, resizeMode: 'contain' }}
                        />

                        <Text style={styles.tittle}>Acompanhamento</Text>

                    </View>
                    <View style={styles.sectionConfig}>
                        <Pressable
                            style={styles.ConfigItem}
                            onPress={() => router.replace('./graficosDependente')}

                        >
                            <Text style={styles.textConfig}>Gráficos</Text>
                        </Pressable>

                        <Pressable
                            style={styles.ConfigItem}
                            onPress={() => router.replace('./relatorioDependente')}

                        >
                            <Text style={styles.textConfig}>Relatórios</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </View >
    );
}