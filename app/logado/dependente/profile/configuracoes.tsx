import Colors from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ConfigDependente() {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [secondModalVisible, setSecondModalVisible] = useState(false);
    const { isDarkMode, toggleDarkMode, colors } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
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
            fontSize: 24,
            color: colors.black
        },
        typeUser: {
            width: '80%',
            backgroundColor: colors.cards,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            elevation: 3,
        },
        sectionTypeUser: {
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            color: colors.black,
        },
        textTypeUser: {
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            color: Colors.light.bluePrimary
        },
        containerView: {
            justifyContent: 'center',
            width: '90%',
            height: 160,
            backgroundColor: colors.cards,
            elevation: 4,
            borderRadius: 25,
            gap: 15
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
            color: colors.black
        },
        desvincular: {
            fontFamily: 'Poppins-Medium',
            fontSize: 15,
            textDecorationLine: 'underline',
            color: colors.desvincular
        },
        modalBackground: {
            flex: 1,
            backgroundColor: Colors.light.backgroundOpacity,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalBox: {
            backgroundColor: colors.background,
            padding: 25,
            borderRadius: 12,
            width: '85%',
            alignItems: 'center',
        },
        modalTitle: {
            fontSize: 18,
            fontFamily: 'Poppins-Medium',
            textAlign: 'center',
            marginBottom: 20,
            color: colors.black
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
            width: '90%',
            color: colors.description,
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
                            <Text style={styles.sectionTypeUser}> Dependente</Text>
                        </View>

                    </View>
                    <Pressable
                        onPress={() => router.replace('./edit-tipo-user')}

                    >
                        <Text style={styles.textTypeUser}>Alterar tipo de usuário</Text>
                    </Pressable>
                </View>

                <View style={styles.SectionView}>
                    <Text style={styles.text}>Responsável:</Text>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                        <View style={styles.containerView}>
                            <View style={styles.cardView}>
                                <Image
                                    source={require('../../../../assets/images/responsavel-photo.jpg')}
                                    style={styles.photo}
                                />
                                <Text style={styles.name}>Nicolas Faustino</Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => setModalVisible(true)}
                                style={{ justifyContent: 'center', alignItems: 'center' }}
                            >
                                <Text style={styles.desvincular}>Desvincular</Text>
                            </TouchableOpacity>
                        </View>
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
                            Tem certeza de que deseja remover <Text style={styles.nameResponsavel}>Nicolas Faustino</Text> como responsável?
                        </Text>

                        <Text style={styles.modalMessage}>
                            Ao remover seu responsável, ele perderá acesso ao seu acompanhamento de saúde.
                        </Text>

                        <TouchableOpacity style={styles.primaryBtn} onPress={() => {
                            setModalVisible(false);
                            setSecondModalVisible(true);
                        }}>
                            <Text style={styles.primaryText}>Prosseguir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                animationType="fade"
                visible={secondModalVisible}
                onRequestClose={() => setSecondModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>
                            Deseja adicionar um novo responsável?
                        </Text>

                        <Text style={styles.modalMessage}>
                            Caso escolha por não adicionar um responsável seu perfil se tornará para uso pessoal.
                        </Text>

                        <TouchableOpacity
                            style={styles.primaryBtn}
                            onPress={() => {
                                setSecondModalVisible(false);
                                router.push('./codResponsavelCadastro');
                            }}
                        >
                            <Text style={styles.primaryText}>Sim</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={() => {
                                setSecondModalVisible(false);
                                // router.push('../../user/profile/configuracoes');

                            }}
                        >
                            <Text style={styles.cancelText}>Não</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
}