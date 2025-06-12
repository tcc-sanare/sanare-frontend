import { useTheme } from '@/hooks/useTheme';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
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

type LembreteSalvo = {
    id: string;
    tipo: string;
    nomeExame?: string;
    medicamento?: string;
    quantidade?: string;
    intervalo?: string;
    duracao?: string;
    data: Date;
    horario: Date;
};

const lembretesTypes: LembreteType[] = [
    { label: 'Medicamentos', value: 'Medicamentos' },
    { label: 'Exames', value: 'Exames' },
    { label: 'Hidratação', value: 'Hidratação' },
    { label: 'Pressão', value: 'Pressão' },
    { label: 'Glicemia', value: 'Glicemia' },
];

const Lembretes = () => {
    const router = useRouter();
    const { colors } = useTheme();
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
    const [lembretes, setLembretes] = useState<LembreteSalvo[]>([]);

    useEffect(() => {
        const carregarLembretes = async () => {
            try {
                const salvos = await AsyncStorage.getItem('@lembretes');
                if (salvos) {
                    const parsed = JSON.parse(salvos);
                    const lembretesComDatas = parsed.map((lembrete: any) => ({
                        ...lembrete,
                        data: new Date(lembrete.data),
                        horario: new Date(lembrete.horario)
                    }));
                    setLembretes(lembretesComDatas);
                }
            } catch (e) {
                console.error('Erro ao carregar lembretes', e);
            }
        };
        carregarLembretes();
    }, []);

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

    const isFormValid = () => {
        switch (selectedLembreteType) {
            case 'Exames':
                return nomeExame.trim() !== '' && date && time;
            case 'Medicamentos':
                return medicamento.trim() !== '' && duracao.trim() !== '' && intervalo.trim() !== '' && time;
            case 'Hidratação':
                return quantidade.trim() !== '' && intervalo.trim() !== '' && time;
            case 'Pressão':
            case 'Glicemia':
                return intervalo.trim() !== '' && time;
            default:
                return false;
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedLembreteType('');
        setNomeExame('');
        setMedicamento('');
        setQuantidade('');
        setIntervalo('');
        setDuracao('');
        setDate(new Date());
        setTime(new Date());
    };

    const handleSave = async () => {
        if (isFormValid()) {
            const novoLembrete: LembreteSalvo = {
                id: Math.random().toString(36).substring(7),
                tipo: selectedLembreteType,
                data: date,
                horario: time,
                ...(selectedLembreteType === 'Exames' && { nomeExame }),
                ...(selectedLembreteType === 'Medicamentos' && { medicamento, duracao, intervalo }),
                ...(selectedLembreteType === 'Hidratação' && { quantidade, intervalo }),
                ...(selectedLembreteType === 'Pressão' && { intervalo }),
                ...(selectedLembreteType === 'Glicemia' && { intervalo }),
            };

            const novosLembretes = [...lembretes, novoLembrete];
            setLembretes(novosLembretes);

            try {
                await AsyncStorage.setItem('@lembretes', JSON.stringify(novosLembretes));
            } catch (e) {
                console.error('Erro ao salvar lembretes', e);
            }

            closeModal();
        }
    };

    const calcularProximaDose = (horarioInicial: Date, intervaloHoras: string): string => {
        const intervalo = parseInt(intervaloHoras) || 0;
        if (intervalo <= 0) return formatTime(horarioInicial);

        const agora = new Date();
        const horarioBase = new Date(horarioInicial);

        if (horarioBase > agora) return formatTime(horarioBase);

        const diffHoras = (agora.getTime() - horarioBase.getTime()) / (60 * 60 * 1000);
        const intervalosPassados = Math.floor(diffHoras / intervalo);
        const proximaDose = new Date(
            horarioBase.getTime() + (intervalosPassados + 1) * intervalo * 60 * 60 * 1000
        );

        return formatTime(proximaDose);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setLembretes([...lembretes]);
        }, 60000);

        return () => clearInterval(interval);
    }, [lembretes]);

    const calcularDiasRestantes = (dataInicio: Date, duracaoDias: string): string => {
        const duracao = parseInt(duracaoDias) || 0;
        if (duracao <= 0) return "0 dias";

        const dataFim = new Date(dataInicio);
        dataFim.setDate(dataFim.getDate() + duracao);

        const hoje = new Date();

        if (hoje < dataInicio) return `${duracao} dias`;

        if (hoje >= dataFim) return "Finalizado";

        const diffTempo = dataFim.getTime() - hoje.getTime();
        const diffDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24));

        return `${diffDias} ${diffDias === 1 ? 'dia' : 'dias'}`;
    };

    const removerLembrete = async (id: string) => {
        const novosLembretes = lembretes.filter(item => item.id !== id);
        setLembretes(novosLembretes);

        try {
            await AsyncStorage.setItem('@lembretes', JSON.stringify(novosLembretes));
        } catch (e) {
            console.error('Erro ao remover lembrete', e);
        }
    };

    const renderDetalhesLembrete = (lembrete: LembreteSalvo) => {
        const proximaDose = lembrete.intervalo ?
            calcularProximaDose(lembrete.horario, lembrete.intervalo) :
            formatTime(lembrete.horario);

        const diasRestantes = lembrete.duracao ?
            calcularDiasRestantes(new Date(lembrete.horario), lembrete.duracao) :
            null;

        switch (lembrete.tipo) {
            case 'Exames':
                return (
                    <>
                        <Text style={styles.lembreteDetalhe}>Exame: {lembrete.nomeExame}</Text>
                        <Text style={styles.lembreteDetalhe}>Data: {formatDate(lembrete.data)}</Text>
                        <Text style={styles.lembreteDetalhe}>Horário: {formatTime(lembrete.horario)}</Text>
                    </>
                );
            case 'Medicamentos':
                const diasRestantesText = diasRestantes === "Finalizado" ?
                    <Text style={[styles.lembreteDetalhe, styles.lembreteFinalizado]}>Duração: Finalizado</Text> :
                    <Text style={styles.lembreteDetalhe}>Duração: {lembrete.duracao} dias - restam {diasRestantes}</Text>;

                return (
                    <>
                        <Text style={styles.lembreteDetalhe}>Medicamento: {lembrete.medicamento}</Text>
                        {diasRestantesText}
                        <Text style={styles.lembreteDetalhe}>Intervalo: {lembrete.intervalo} horas</Text>
                        <Text style={styles.lembreteDetalhe}>Próxima dose: {proximaDose}</Text>
                    </>
                );
            case 'Hidratação':
                return (
                    <>
                        <Text style={styles.lembreteDetalhe}>Quantidade: {lembrete.quantidade} ml</Text>
                        <Text style={styles.lembreteDetalhe}>Intervalo: {lembrete.intervalo} horas</Text>
                        <Text style={styles.lembreteDetalhe}>Próxima hidratação: {proximaDose}</Text>
                    </>
                );
            case 'Pressão':
                return (
                    <>
                        <Text style={styles.lembreteDetalhe}>Intervalo: {lembrete.intervalo} horas</Text>
                        <Text style={styles.lembreteDetalhe}>Próxima medição: {proximaDose}</Text>
                    </>
                );
            case 'Glicemia':
                return (
                    <>
                        <Text style={styles.lembreteDetalhe}>Intervalo: {lembrete.intervalo} horas</Text>
                        <Text style={styles.lembreteDetalhe}>Próxima medição: {proximaDose}</Text>
                    </>
                );
            default:
                return null;
        }
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
        },
        saveBtn: {
            borderRadius: 15,
            paddingVertical: 15,
            paddingHorizontal: 30,
            marginTop: 20,
            width: '100%',
            alignItems: 'center',
        },
        saveBtnActive: {
            backgroundColor: colors.bluePrimary,
        },
        saveBtnInactive: {
            backgroundColor: colors.grayOpacity,
        },
        saveText: {
            color: colors.white,
            fontFamily: 'Poppins-Medium',
            fontSize: 18,
        },
        lembreteItem: {
            backgroundColor: colors.white,
            padding: 15,
            borderRadius: 10,
            marginBottom: 15,
            width: '100%',
            elevation: 2,
        },
        lembreteTitulo: {
            fontFamily: 'Poppins-Medium',
            fontSize: 18,
            color: colors.bluePrimary,
            marginBottom: 5,
        },
        lembreteDetalhe: {
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            color: '#000',
            marginBottom: 3,
        },
        lembreteHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
        },
        listaLembretes: {
            width: '100%',
            marginTop: 20,
        },
        lembreteStatus: {
            fontFamily: 'Poppins-Medium',
            color: colors.bluePrimary,
        },
        lembreteFinalizado: {
            color: 'red',
        },
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
                    {lembretes.length === 0 ? (
                        <Text style={styles.aviso}>Você não tem nenhum lembrete adicionado</Text>
                    ) : (
                        <View style={styles.listaLembretes}>
                            {lembretes.map(lembrete => (
                                <View key={lembrete.id} style={styles.lembreteItem}>
                                    <View style={styles.lembreteHeader}>
                                        <Text style={styles.lembreteTitulo}>{lembrete.tipo}</Text>
                                        <TouchableOpacity onPress={() => removerLembrete(lembrete.id)}>
                                            <FontAwesome5 name="trash" size={20} color={colors.bluePrimary} />
                                        </TouchableOpacity>
                                    </View>
                                    {renderDetalhesLembrete(lembrete)}
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>

            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalBox}>
                        <View style={styles.backContent}>
                            <TouchableOpacity onPress={closeModal} style={{ flexDirection: 'row' }}>
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

                        {selectedLembreteType && (
                            <TouchableOpacity
                                style={[
                                    styles.saveBtn,
                                    isFormValid() ? styles.saveBtnActive : styles.saveBtnInactive
                                ]}
                                onPress={handleSave}
                                disabled={!isFormValid()}
                            >
                                <Text style={styles.saveText}>Salvar</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Lembretes;