import { useTheme } from '@/hooks/useTheme';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const { width } = Dimensions.get('window');

const lembretesTypes = [
    { label: 'Medicamentos', value: 'Medicamentos' },
    { label: 'Exames', value: 'Exames' },
    { label: 'Hidrataçaõ', value: 'Hidrataçaõ' },
    { label: 'Pressão', value: 'Pressão' },
    { label: 'Glicemia', value: 'Glicemia' },
];

const Lembretes = () => {
    const router = useRouter();
    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLembreteType, setSelectedLembreteType] = React.useState('');

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
            resizeMode: 'contain',
            width: 25
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
        modalBackground: {
            flex: 1,
            backgroundColor: '#FFFFFF4D',
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
        backContent: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 15,
            marginBottom: '15%'
        },
        back: {
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            color: colors.bluePrimary
        },
        section: {
            width: '100%',
        },
        label: {
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            color: colors.black

        },
        dropdown: {
            height: 58,
            borderRadius: 15,
            paddingHorizontal: 20,
            borderWidth: 4,
            borderColor: colors.grayOpacityBorder,
            backgroundColor: colors.input,
            marginTop: 10,
        },
        placeholderStyle: {
            color: colors.dropdownPlaceholder,
            fontFamily: 'Poppins-Regular',
        },
        selectedTextStyle: {
            fontFamily: 'Poppins-Medium',
            backgroundColor: colors.dropdown,
            color: colors.black
        },
        dropdownContainer: {
            borderRadius: 10,
            marginTop: 5,
            backgroundColor: colors.background,
            borderColor: colors.background,
        },
        itemTextStyle: {
            fontFamily: 'Poppins-Regular',
            backgroundColor: colors.background,
            color: colors.black
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('./home')}>
                    <MaterialIcons
                        name='arrow-back-ios'
                        size={26}
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
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                    >
                        <AntDesign name="pluscircle" size={24} color={colors.bluePrimary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                <View style={styles.avisoView}>
                    <Text style={styles.aviso}>Você não tem nenhum lembrete adicionado</Text>
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
                        <View style={styles.backContent}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Image
                                    source={require('../../../assets/images/seta.png')}
                                    style={styles.seta}
                                />
                            </TouchableOpacity>
                            <Text style={styles.back}>Voltar</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.label}>Tipo:</Text>
                            <Dropdown
                                data={lembretesTypes}
                                labelField="label"
                                valueField="value"
                                placeholder='Selecione o lembrete'
                                value={selectedLembreteType}
                                onChange={item => setSelectedLembreteType(item.value)}
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.itemTextStyle}
                                activeColor={colors.background}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Lembretes;

/*
exame:  nome, data, horário,
medicamentos: nome, duração(dias) hInicio, intervalo
hidratação: quantidade, hInicio, intervalo,
pressão: hInicio, intervalo,
glicemia: hInicio, intervalo,
 */