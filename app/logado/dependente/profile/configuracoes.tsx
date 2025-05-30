import Colors from '@/constants/Colors';
import { useRouter } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConfigDependente() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/images/bgSanare.png')}
                style={styles.logoFooter}
            />

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity onPress={() => router.push('./profile')}>
                    <Image
                        source={require('../../../../assets/images/seta.png')}
                        style={styles.seta}
                    />
                </TouchableOpacity>

                <View style={styles.body}>
                    <View style={styles.tipoUser}>
                        <Text style={styles.text}>Perfil:</Text>

                        <View style={styles.typeUser}>
                            <Text style={styles.sectionTypeUser}> Dependente</Text>
                        </View>

                    </View>
                    <Pressable
                        onPress={() => router.replace('./edit-tipo-user')}

                    >
                        <Text style={styles.textTypeUser}>Alterar tipo de usuário</Text>
                    </Pressable>

                    {/* <View style={styles.sectionCod}>
                        <Text style={styles.text}>Código de responsável:</Text>

                        <View style={styles.codView}>
                            <Text style={styles.cod}>SANARE-123</Text>
                        </View>
                    </View> */}
                </View>

                <View style={styles.dependenteView}>
                    <Text style={styles.text}>Dependentes:</Text>

                    <View style={styles.cardView}>
                        <Image
                            source={require('../../../../assets/images/responsavel-photo.jpg')}
                            style={styles.photo}
                        />
                        <Text style={styles.name}>Nicolas Faustino</Text>
                    </View>
                    <Text style={styles.desvincular}>Desvincular</Text>
                </View>



            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        // alignItems: 'center'
    },
    logoFooter: {
        position: 'absolute',
        bottom: 0,
        top: '31%',
        resizeMode: 'contain',
        left: 0,
        right: 0,
        height: '100%',
        width: '100%'
    },
    seta: {
        margin: 45,
        resizeMode: 'contain',
        marginBottom: '15%',
        marginTop: '20%'
    },
    body: {
        marginHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center'

    },
    tipoUser: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginHorizontal: 25,
        marginBottom: 40
    },
    text: {
        fontFamily: 'Poppins-Medium',
        fontSize: 24
    },
    typeUser: {
        width: '80%',
        backgroundColor: Colors.light.white,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        elevation: 3,
    },
    sectionTypeUser: {
        fontFamily: 'Poppins-Regular',
        fontSize: 18
    },

    textTypeUser: {
        fontFamily: 'Poppins-Regular',
        fontSize: 20,
        color: Colors.light.bluePrimary
    },
    sectionCod: {
        marginTop: 50,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        width: '100%',
    },
    codView: {
        width: '85%',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: Colors.light.bluePrimary,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.white

    },
    cod: {
        fontFamily: 'Poppins-Medium',
        fontSize: 32,
        color: Colors.light.bluePrimary
    },
    dependenteView: {
        marginTop: 50,
        marginHorizontal: 25,

    },
    cardView: {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    photo: {
        width: 60,
        height: 60,
        borderRadius: 100,
        // borderColor: Colors.light.bluePrimary,
        // borderWidth: 8,
        resizeMode: 'cover'
    },
    name: {},
    desvincular: {}
})