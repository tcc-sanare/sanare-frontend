import Colors from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConfigUser() {
   const router = useRouter();
    const [selectedBtn, setSelectedBtn] = useState<string | null>(null);
    const opcoes = ['Dependente', 'Responsável'];
    const [modalVisible, setModalVisible] = useState(false);

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
                            <Text style={styles.sectionTypeUser}>Uso Pessoal</Text>
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

                    </View>
                    <View style={styles.viewBtn}>
                        <TouchableOpacity style={styles.btn}
                            onPress={() => setModalVisible(true)}
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
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>
                            Tem certeza de que deseja alterar seu tipo de usuário para <Text style={styles.typeUserText}> {selectedBtn}</Text> ?
                        </Text>

                        <Text style={styles.modalMessage}>
                            Ao alterar seu tipo de perfil, você deixará de ter acesso a funcionalidades específicas do perfil atual.
                        </Text>

                        <TouchableOpacity
                            style={styles.primaryBtn}
                            onPress={() => {
                                setModalVisible(false);
                                if (selectedBtn === 'Dependente') {
                                    router.push('../../dependente/profile/codResponsavelCadastro')
                                }
                                if (selectedBtn === 'Responsável') {
                                    router.push('./codResponsavel')
                                }
                            }}>
                            <Text style={styles.primaryText}>Prosseguir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    modalBackground: {
        flex: 1,
        backgroundColor: Colors.light.backgroundOpacity,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        backgroundColor: Colors.light.background,
        padding: 25,
        borderRadius: 12,
        width: '85%',
        // height: 360,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        marginBottom: 20,
    },
    typeUserText: {
        color: Colors.light.bluePrimary,
        fontFamily: 'Poppins-Regular',
    },
    modalMessage: {
        fontSize: 14,
        marginBottom: 40,
        fontFamily: 'Poppins-Regular',
        textAlign: 'justify',
        width: '90%'
    },
    primaryBtn: {
        backgroundColor: Colors.light.bluePrimaryOpacity,
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: 10,
        width: '90%',
        alignItems: 'center',
    },
    primaryText: {
        color: Colors.light.white,
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
    },
    cancelBtn: {
        backgroundColor: Colors.light.grayOpacity,
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginBottom: 10,
        width: '90%',
        alignItems: 'center',
    },
    cancelText: {
        fontSize: 18,
        fontFamily: 'Poppins-Medium',

    },
})