import { useTheme } from '@/hooks/useTheme';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";
import { useState } from 'react';
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const { width } = Dimensions.get('window');

type LembreteType = {
    label: string;
    value: string;
}

const lembretesTypes: LembreteType[] = [
    { label: 'Medicamentos', value: 'Medicamentos' },
    { label: 'Exames', value: 'Exames' },
    { label: 'Hidratação', value: 'Hidratação' },
    { label: 'Pressão', value: 'Pressão' },
    { label: 'Glicemia', value: 'Glicemia' },
];

const Lembretes = () => {
    const router = useRouter();
    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLembreteType, setSelectedLembreteType] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [quantidade, setQuantidade] = useState('');
    const [intervalo, setIntervalo] = useState('');
    const [duracao, setDuracao] = useState('');
    const [medicamento, setMedicamento] = useState('');
    const [nomeExame, setNomeExame] = useState('');

    const handleNumberChange = (text: string, setState: React.Dispatch<React.SetStateAction<string>>) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setState(numericValue);
    };

    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const onChangeTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
        const currentTime = selectedTime || time;
        setShowTimePicker(Platform.OS === 'ios');
        setTime(currentTime);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const showTimepicker = () => {
        setShowTimePicker(true);
    };

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('pt-BR');
    };

    const formatTime = (time: Date): string => {
        return time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        header: {
            backgroundColor: colors.bluePrimary,
            justifyContent: 'center',
            height: 150,
        },
        seta: {
            resizeMode: 'contain',
            width: 25
        },
        lembretes: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25,
            width: '100%'
        },
        headerText: {
            fontSize: 28,
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
            backgroundColor: '#0000004D',
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
            gap: 10,
            marginBottom: '15%'
        },
        back: {
            fontFamily: 'Poppins-Regular',
            fontSize: 18,
            color: colors.bluePrimary
        },
        section: {
            width: '100%',
            marginBottom: 25
        },
        label: {
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            color: colors.black,
            textAlign: 'left'
        },
        dropdown: {
            height: 58,
            borderRadius: 15,
            paddingHorizontal: 20,
            borderWidth: 4,
            borderColor: colors.grayOpacityBorder,
            backgroundColor: colors.input,
            marginTop: 10,
            color: colors.black,
            fontFamily: 'Poppins-Regular'
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
        inputLembrete: {
            width: '100%',
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        dateTimeButton: {
            borderWidth: 1,
            borderColor: colors.grayOpacityBorder,
            borderRadius: 15,
            padding: 15,
            backgroundColor: colors.input,
            flex: 1,
            marginHorizontal: 5,
        },
        dateTimeText: {
            fontFamily: 'Poppins-Regular',
            color: colors.black,
        },
        dateTimeContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: 15,
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('./home')} style={styles.lembretes}>
                    <MaterialIcons
                        name='arrow-back-ios'
                        size={26}
                        color={colors.white}
                        style={{
                            position: 'absolute',
                            left: 50
                        }}
                    />
                    <Text style={styles.headerText}>Lembretes</Text>
                </TouchableOpacity>
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
                            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ flexDirection: 'row' }}>
                                <Image
                                    source={require('../../../assets/images/seta.png')}
                                    style={styles.seta}
                                />
                                <Text style={styles.back}>Voltar</Text>
                            </TouchableOpacity>
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

                        {selectedLembreteType === 'Exames' && (
                            <>
                                <View style={styles.section}>
                                    <Text style={styles.label}>Nome do exame:</Text>
                                    <TextInput
                                        style={styles.dropdown}
                                        onChangeText={setNomeExame}
                                        value={nomeExame}
                                    />
                                </View>

                                <View style={styles.dateTimeContainer}>
                                    <TouchableOpacity onPress={showDatepicker} style={styles.dateTimeButton}>
                                        <Text style={styles.dateTimeText}>
                                            {formatDate(date) || 'Selecione a data'}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={showTimepicker} style={styles.dateTimeButton}>
                                        <Text style={styles.dateTimeText}>
                                            {formatTime(time) || 'Selecione o horário'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {(showDatePicker || showTimePicker) && (
                                    <>
                                        {showDatePicker && (
                                            <DateTimePicker
                                                value={date}
                                                mode="date"
                                                display="default"
                                                onChange={onChangeDate}
                                                minimumDate={new Date()}
                                                locale="pt-BR"
                                            />
                                        )}
                                        {showTimePicker && (
                                            <DateTimePicker
                                                value={time}
                                                mode="time"
                                                display="default"
                                                onChange={onChangeTime}
                                                locale="pt-BR"
                                            />
                                        )}
                                    </>
                                )}
                            </>
                        )}

                        {selectedLembreteType === 'Medicamentos' && (
                            <>
                                <View style={styles.section}>
                                    <Text style={styles.label}>Medicamento:</Text>
                                    <TextInput
                                        style={styles.dropdown}
                                        value={medicamento}
                                        onChangeText={setMedicamento}
                                    />
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.label}>Duração (dias):</Text>
                                    <TextInput
                                        keyboardType="numeric"
                                        style={styles.dropdown}
                                        value={duracao}
                                        onChangeText={(text) => handleNumberChange(text, setDuracao)}
                                    />
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.label}>Horário de início:</Text>
                                    <TouchableOpacity onPress={showTimepicker} style={styles.dateTimeButton}>
                                        <Text style={styles.dateTimeText}>
                                            {formatTime(time) || 'Selecione o horário'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.label}>Intervalo (horas):</Text>
                                    <TextInput
                                        keyboardType="numeric"
                                        style={styles.dropdown}
                                        value={intervalo}
                                        onChangeText={(text) => handleNumberChange(text, setIntervalo)}
                                    />
                                </View>
                            </>
                        )}

                        {selectedLembreteType === 'Hidratação' && (
                            <>
                                <View style={styles.section}>
                                    <Text style={styles.label}>Quantidade (ml):</Text>
                                    <TextInput
                                        keyboardType="numeric"
                                        style={styles.dropdown}
                                        value={quantidade}
                                        onChangeText={(text) => handleNumberChange(text, setQuantidade)}
                                    />
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.label}>Horário de início:</Text>
                                    <TouchableOpacity onPress={showTimepicker} style={styles.dateTimeButton}>
                                        <Text style={styles.dateTimeText}>
                                            {formatTime(time) || 'Selecione o horário'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.label}>Intervalo (horas):</Text>
                                    <TextInput
                                        keyboardType="numeric"
                                        style={styles.dropdown}
                                        value={intervalo}
                                        onChangeText={(text) => handleNumberChange(text, setIntervalo)}
                                    />
                                </View>
                            </>
                        )}

                        {selectedLembreteType === 'Pressão' && (
                            <>
                                <View style={styles.section}>
                                    <Text style={styles.label}>Horário de início:</Text>
                                    <TouchableOpacity onPress={showTimepicker} style={styles.dateTimeButton}>
                                        <Text style={styles.dateTimeText}>
                                            {formatTime(time) || 'Selecione o horário'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.label}>Intervalo (horas):</Text>
                                    <TextInput
                                        keyboardType="numeric"
                                        style={styles.dropdown}
                                        value={intervalo}
                                        onChangeText={(text) => handleNumberChange(text, setIntervalo)}
                                    />
                                </View>
                            </>
                        )}

                        {selectedLembreteType === 'Glicemia' && (
                            <>
                                <View style={styles.section}>
                                    <Text style={styles.label}>Horário de início:</Text>
                                    <TouchableOpacity onPress={showTimepicker} style={styles.dateTimeButton}>
                                        <Text style={styles.dateTimeText}>
                                            {formatTime(time) || 'Selecione o horário'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.section}>
                                    <Text style={styles.label}>Intervalo (horas):</Text>
                                    <TextInput
                                        keyboardType="numeric"
                                        style={styles.dropdown}
                                        value={intervalo}
                                        onChangeText={(text) => handleNumberChange(text, setIntervalo)}
                                    />
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Lembretes;