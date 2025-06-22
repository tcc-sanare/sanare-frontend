import { useTheme } from '@/hooks/useTheme';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function Relatorio() {
    const { colors } = useTheme();
    const router = useRouter();
    const [anoSelecionado, setAnoSelecionado] = useState(null);
    const [mesSelecionado, setMesSelecionado] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [relatorioDisponivel, setRelatorioDisponivel] = useState(false);
    const [mostrarMensagem, setMostrarMensagem] = useState(false);

    // 5 anos atrás e 5 anos à frente
    const currentYear = new Date().getFullYear();
    const anos = Array.from({ length: 11 }, (_, i) => ({
        label: (currentYear - 5 + i).toString(),
        value: (currentYear - 5 + i).toString(),
    }));

    const meses = [
        { label: 'Janeiro', value: '1' },
        { label: 'Fevereiro', value: '2' },
        { label: 'Março', value: '3' },
        { label: 'Abril', value: '4' },
        { label: 'Maio', value: '5' },
        { label: 'Junho', value: '6' },
        { label: 'Julho', value: '7' },
        { label: 'Agosto', value: '8' },
        { label: 'Setembro', value: '9' },
        { label: 'Outubro', value: '10' },
        { label: 'Novembro', value: '11' },
        { label: 'Dezembro', value: '12' },
    ];

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1
        },
        seta: {
            margin: 45,
            resizeMode: 'contain',
            marginBottom: '15%',
            marginTop: '20%'
        },
        textView: {
            justifyContent: "center",
            alignItems: "center",
            marginBottom: '10%',
            width: '100%',
            gap: 30
        },
        titulo: {
            textAlign: 'center',
            fontSize: 18,
            fontFamily: 'Poppins-Medium',
            color: colors.black,
            width: '85%'
        },
        text: {
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            width: '85%',
            color: colors.black
        },
        dropdownContainer: {
            width: '85%',
            marginBottom: 20,
        },
        dropdownLabel: {
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
            marginBottom: 8,
            color: colors.black
        },
        dropdown: {
            height: 50,
            borderRadius: 10,
            paddingHorizontal: 20,
            borderWidth: 1,
            borderColor: colors.grayOpacityBorder,
            backgroundColor: colors.input,
        },
        placeholderStyle: {
            color: colors.dropdownPlaceholder,
            fontFamily: 'Poppins-Regular',
        },
        selectedTextStyle: {
            fontFamily: 'Poppins-Regular',
            color: colors.black
        },
        button: {
            backgroundColor: colors.bluePrimary,
            padding: 15,
            borderRadius: 10,
            width: '85%',
            alignItems: 'center',
            marginTop: 20
        },
        buttonText: {
            color: colors.white,
            fontFamily: 'Poppins-Medium',
            fontSize: 16
        },
        mensagem: {
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            color: colors.black,
            textAlign: 'center',
            marginTop: 20,
            width: '85%'
        },
        downloadButton: {
            backgroundColor: 'green',
            padding: 15,
            borderRadius: 10,
            width: '85%',
            alignItems: 'center',
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10
        }
    });

    const gerarRelatorio = () => {
        if (!anoSelecionado || !mesSelecionado) return;

        setCarregando(true);
        setMostrarMensagem(false);
        setRelatorioDisponivel(false);

        // Simulando uma requisição assíncrona
        setTimeout(() => {
            setCarregando(false);

            if (mesSelecionado === '4' && anoSelecionado === '2022') {
                setRelatorioDisponivel(true);
            }
            else {
                setMostrarMensagem(true);
            }
        }, 1500);
    };

    const baixarRelatorio = () => {
        // baixar o relatório - lógica de download
        alert('Relatório de abril/2022 baixado com sucesso!');
    };

    const getNomeMes = (valor: string | null) => {
        const mes = meses.find(m => m.value === valor);
        return mes ? mes.label : '';
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.push('./home')}>
                <Image
                    source={require('../../../assets/images/seta.png')}
                    style={styles.seta}
                />
            </TouchableOpacity>

            <View style={styles.textView}>
                <Text style={styles.titulo}>Acompanhe a evolução de saúde e compartilhe sempre que precisar.</Text>
                <Text style={styles.text}>Escolha um mês e ano para gerar o relatório de saúde.</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
                <View style={styles.dropdownContainer}>
                    <Text style={styles.dropdownLabel}>Ano</Text>
                    <Dropdown
                        data={anos}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecione o ano"
                        value={anoSelecionado}
                        onChange={item => {
                            setAnoSelecionado(item.value);
                            setRelatorioDisponivel(false);
                        }}
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        containerStyle={{
                            borderRadius: 10,
                            marginTop: -30,
                            backgroundColor: colors.background,
                        }}
                        itemTextStyle={{
                            fontFamily: 'Poppins-Regular',
                            color: colors.black
                        }}
                        activeColor={colors.grayOpacity}
                    />
                </View>

                <View style={styles.dropdownContainer}>
                    <Text style={styles.dropdownLabel}>Mês</Text>
                    <Dropdown
                        data={meses}
                        labelField="label"
                        valueField="value"
                        placeholder="Selecione o mês"
                        value={mesSelecionado}
                        onChange={item => {
                            setMesSelecionado(item.value);
                            setRelatorioDisponivel(false);
                        }}
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        containerStyle={{
                            borderRadius: 10,
                            marginTop: -30,
                            backgroundColor: colors.background,
                        }}
                        itemTextStyle={{
                            fontFamily: 'Poppins-Regular',
                            color: colors.black
                        }}
                        activeColor={colors.grayOpacity}
                    />
                </View>

                {anoSelecionado && mesSelecionado && (
                    <TouchableOpacity
                        style={[
                            styles.button,
                            carregando && { opacity: 0.7 }
                        ]}
                        onPress={gerarRelatorio}
                        disabled={carregando}
                    >
                        {carregando ? (
                            <ActivityIndicator color={colors.white} />
                        ) : (
                            <Text style={styles.buttonText}>Gerar Relatório</Text>
                        )}
                    </TouchableOpacity>
                )}

                {/* Botão desabilitado quando não há seleção */}
                {(!anoSelecionado || !mesSelecionado) && (
                    <TouchableOpacity
                        style={[styles.button, { opacity: 0.5 }]}
                        disabled
                    >
                        <Text style={styles.buttonText}>Gerar Relatório</Text>
                    </TouchableOpacity>
                )}

                {/* Mensagem de nenhum registro*/}
                {mostrarMensagem && (
                    <Text style={styles.mensagem}>
                        Nenhum registro encontrado para {getNomeMes(mesSelecionado)} de {anoSelecionado}
                    </Text>
                )}

                {/* Botão de download (aparece apenas para Fevereiro/2025) */}
                {relatorioDisponivel && (
                    <TouchableOpacity
                        style={styles.downloadButton}
                        onPress={baixarRelatorio}
                    >
                        <MaterialIcons name="file-download" size={20} color={colors.white} />
                        <Text style={styles.buttonText}>Baixar Relatório</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}