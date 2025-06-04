import Colors from '@/constants/Colors';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConfigDependente() {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDependente, setSelectedDependente] = useState<string | null>(null);

    return (
        <View style={styles.container}>
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
                            <Text style={styles.sectionTypeUser}>Responsável</Text>
                        </View>

                    </View>
                    <Pressable
                        onPress={() => router.replace('./edit-tipo-user')}

                    >
                        <Text style={styles.textTypeUser}>Alterar tipo de usuário</Text>
                    </Pressable>

                    <View style={styles.sectionCod}>
                        <Text style={styles.text}>Código de responsável:</Text>

                        <View style={styles.codView}>
                            <Text style={styles.cod}>SANARE-123</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.SectionView}>
                    <Text style={styles.text}>Dependentes:</Text>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                        <View style={styles.containerView}>
                            <View style={styles.cardView}>
                                <Image
                                    source={require('../../../../assets/images/profile-photo.jpg')}
                                    style={styles.photo}
                                />
                                <Text style={styles.name}>Maria Santos</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedDependente("Maria Santos")
                                    setModalVisible(true)
                                }}
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Text style={styles.desvincular}>Desvincular</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.containerView}>
                            <View style={styles.cardView}>
                                <Image
                                    source={require('../../../../assets/images/photo-dependente.jpg')}
                                    style={styles.photo}
                                />
                                <Text style={styles.name}>Joice Soares de Almeida</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedDependente("Joice Soares de Almeida")
                                    setModalVisible(true)
                                }}
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Text style={styles.desvincular}>Desvincular</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView >

            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>
                            Tem certeza de que deseja remover <Text style={styles.nameResponsavel}>{selectedDependente}</Text> como dependente?
                        </Text>

                        <Text style={styles.modalMessage}>
                            Ao remover um dependente, você perderá o acesso ao acompanhamento de sua saúde.
                        </Text>

                        <TouchableOpacity style={styles.primaryBtn} onPress={() => {
                            setModalVisible(false);
                        }}>
                            <Text style={styles.primaryText}>Prosseguir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        // alignItems: 'center'
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
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        width: '100%',
    },
    containerView: {
        justifyContent: 'center',
        width: '90%',
        height: 160,
        backgroundColor: Colors.light.white,
        elevation: 4,
        borderRadius: 25,
        gap: 15,
        marginBottom: 40
    },
    codView: {
        width: '85%',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: Colors.light.bluePrimary,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%'
    },
    cod: {
        fontFamily: 'Poppins-Medium',
        fontSize: 32,
        color: Colors.light.bluePrimary
    },
    SectionView: {
        marginTop: 80,
        marginHorizontal: 25,
        gap: 25
    },
    cardView: {
        flexDirection: 'row',
        alignItems: 'center',
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
    },
    desvincular: {
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        textDecorationLine: 'underline',
        color: Colors.light.bluePrimary
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
    nameResponsavel: {
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