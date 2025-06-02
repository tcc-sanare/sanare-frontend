import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EditTipoUser() {
    const router = useRouter();
    const [selectedBtn, setSelectedBtn] = useState<string | null>(null);
    const opcoes = ['Responsável', 'Uso pessoal'];

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >

                <TouchableOpacity onPress={() => router.push('./configuracoes')}>
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
                    <Text style={styles.text}>Trocar para:</Text>

                    <View style={styles.viewPresable}>
                        {opcoes.map((opcao, index) => (
                            <Pressable
                                key={index}
                                onPress={() => setSelectedBtn(opcao)}
                                style={[
                                    styles.pressable,
                                    selectedBtn === opcao && styles.botaoSelecionado
                                ]}
                            >
                                <Text style={styles.textPressable}>{opcao}</Text>
                            </Pressable>
                        ))}
                        {/* <Text style={styles.text}>Perfil escolhido: {selectedBtn}</Text> */}

                    </View>
                    <View style={styles.viewBtn}>
                        <TouchableOpacity style={styles.btn}
                            onPress={() => {
                                router.push('./configuracoes')
                            }}
                        >
                            <LinearGradient
                                colors={['#005EB7', '#CEECF5']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 3.8 }}
                                style={styles.btnGradient}
                            >
                                <Text style={styles.btnText}>Alterar</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

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
    },
    seta: {
        margin: 45,
        resizeMode: 'contain',
        marginBottom: '25%',
        marginTop: '20%'
    },
    body: {
        marginHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50
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
    viewPresable: {
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
    },
    pressable: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 5,
        borderColor: Colors.light.gray,
        backgroundColor: Colors.light.background,
        width: 330,
        borderRadius: 25,
        height: 70,
    },
    textPressable: {
        fontFamily: 'Poppins-Regular',
        fontSize: 17,
    },
    botaoSelecionado: {
        borderColor: Colors.light.bluePrimaryOpacity,
    },
    viewBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%'
    },
    btn: {
        width: 280,
        height: 80,
        borderRadius: 50,
        overflow: 'hidden',
    },
    btnText: {
        color: Colors.light.white,
        fontFamily: 'Poppins-Medium',
        fontSize: 25,
    },
    btnGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
})