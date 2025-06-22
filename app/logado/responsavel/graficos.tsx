import { useTheme } from '@/hooks/useTheme';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';

export default function Graficos() {
    const { colors } = useTheme();
    const router = useRouter();
    const [metricSelecionada, setMetricSelecionada] = useState('pressao');
    const windowWidth = Dimensions.get('window').width;

    const dadosSaude = {
        datas: ['01/01', '02/01', '03/01', '04/01', '05/01', '06/01'],
        pressao: {
            sistolica: [120, 118, 122, 119, 121, 120],
            diastolica: [80, 78, 82, 79, 81, 80]
        },
        glicemia: [95, 100, 98, 102, 99, 101],
        imc: [22.5, 22.7, 22.6, 22.8, 22.9, 22.8],
        hidratacao: [2.0, 1.8, 2.2, 1.9, 2.1, 2.0],

        humor: [
            {
                name: 'Feliz',
                percentage: 60,
                color: '#4CAF50',
                value: 180
            },
            {
                name: 'Ansioso',
                percentage: 22,
                color: '#FFC107',
                value: 66
            },
            {
                name: 'Pouca energia',
                percentage: 18,
                color: '#F44336',
                value: 54
            }
        ]
    };

    const metricas = [
        { id: 'pressao', nome: 'Pressão Arterial', icon: 'heart-pulse' },
        { id: 'glicemia', nome: 'Glicemia', icon: 'vial' },
        { id: 'imc', nome: 'IMC', icon: 'weight-scale' },
        { id: 'hidratacao', nome: 'Hidratação', icon: 'whiskey-glass' },
        { id: 'humor', nome: 'Humor', icon: 'face-smile' }
    ];

    const renderGrafico = () => {
        const chartConfig = {
            backgroundColor: colors.background,
            backgroundGradientFrom: colors.background,
            backgroundGradientTo: colors.background,
            decimalPlaces: 1,
            color: (opacity = 1) => colors.bluePrimary,
            labelColor: (opacity = 1) => colors.black,
            style: { borderRadius: 16 },
            propsForDots: { r: '5', strokeWidth: '2', stroke: colors.bluePrimary }
        };

        switch (metricSelecionada) {
            case 'pressao':
                return (
                    <LineChart
                        data={{
                            labels: dadosSaude.datas,
                            datasets: [
                                {
                                    data: dadosSaude.pressao.sistolica,
                                    color: (opacity = 1) => 'red',
                                    strokeWidth: 2
                                },
                                {
                                    data: dadosSaude.pressao.diastolica,
                                    color: (opacity = 1) => colors.bluePrimary,
                                    strokeWidth: 2
                                }
                            ],
                            legend: ['Sistólica (mmHg)', 'Diastólica (mmHg)']
                        }}
                        width={windowWidth * 1}
                        height={250}
                        chartConfig={chartConfig}
                        bezier
                        style={{ borderRadius: 16, marginVertical: 8 }}
                        yAxisInterval={1}
                    />
                );

            case 'glicemia':
                return (
                    <LineChart
                        data={{
                            labels: dadosSaude.datas,
                            datasets: [{ data: dadosSaude.glicemia }],
                            legend: ['Glicemia (mg/dL)']
                        }}
                        width={windowWidth * 1}
                        height={250}
                        chartConfig={chartConfig}
                        bezier
                        style={{ marginVertical: 8, borderRadius: 16 }}
                    />
                );

            case 'imc':
                return (
                    <LineChart
                        data={{
                            labels: dadosSaude.datas,
                            datasets: [{ data: dadosSaude.imc }],
                            legend: ['Índice de Massa Corporal']
                        }}
                        width={windowWidth * 1}
                        height={250}
                        chartConfig={chartConfig}
                        bezier
                        style={{ marginVertical: 8, borderRadius: 16 }}
                    />
                );

            case 'hidratacao':
                return (
                    <BarChart
                        data={{
                            labels: dadosSaude.datas,
                            datasets: [{ data: dadosSaude.hidratacao }]
                        }}
                        width={windowWidth * 1}
                        height={250}
                        chartConfig={chartConfig}
                        style={{ marginVertical: 8, borderRadius: 16 }}
                        yAxisSuffix=" L" yAxisLabel={''} />
                );

            case 'humor':
                const humorData = [
                    { name: 'Feliz', percentage: 50, color: '#005EB7' },
                    { name: 'Ansioso', percentage: 22, color: '#0074D9' },
                    { name: 'Pouca energia', percentage: 18, color: '#00A6ED' },
                    { name: 'Irritado', percentage: 10, color: '#00C7F2' }
                ];

                return (
                    <View style={styles.pieContainer}>
                        <PieChart
                            data={humorData.map(item => ({
                                ...item,
                                population: item.percentage,
                                legendFontColor: colors.black,
                                legendFontSize: 12
                            }))}
                            width={windowWidth * 0.85}
                            height={220}
                            chartConfig={{
                                color: (opacity = 1) => colors.black,
                                strokeWidth: 0
                            }}
                            accessor="population"
                            backgroundColor="transparent"
                            paddingLeft="80"
                            absolute
                            hasLegend={false}
                        />

                        <View style={styles.horizontalLegend}>
                            {humorData.map((item, index) => (
                                <View key={index} style={styles.legendItem}>
                                    <View style={[styles.legendBullet, { backgroundColor: item.color }]} />
                                    <Text style={styles.legendText}>
                                        {item.name} {item.percentage}%
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: colors.background,
            flex: 1,
            paddingBottom: 20
        },
        seta: {
            margin: 45,
            resizeMode: 'contain',
            marginBottom: '15%',
            marginTop: '20%'
        },
        header: {
            paddingHorizontal: 20,
            marginBottom: '10%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        titulo: {
            fontSize: 22,
            fontFamily: 'Poppins-SemiBold',
            color: colors.black,
            marginBottom: 5
        },
        subtitulo: {
            fontSize: 16,
            fontFamily: 'Poppins-Regular',
            color: colors.description,
            textAlign: 'center',
        },
        metricasContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: 20,
            paddingHorizontal: 10,
        },
        metricaItem: {
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
            height: 100,
            borderRadius: 10,
            backgroundColor: colors.cards
        },
        metricaSelecionada: {
            backgroundColor: colors.bluePrimary,
        },
        metricaTexto: {
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            color: colors.black,
            marginTop: 5,
            textAlign: 'center'
        },
        metricaTextoSelecionado: {
            color: colors.white
        },
        graficoContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
        },
        pieContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
            width: '100%',
        },
        horizontalLegend: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 15,
            flexWrap: 'wrap'
        },
        legendItemHorizontal: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 12,
            marginVertical: 5
        },
        legendItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
            marginVertical: 5,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
            backgroundColor: colors.item
        },
        legendBullet: {
            width: 14,
            height: 14,
            borderRadius: 7,
            marginRight: 6
        },
        legendText: {
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            color: 'black'
        }
    });

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => router.push('./home')}>
                    <Image
                        source={require('../../../assets/images/seta.png')}
                        style={styles.seta}
                    />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={styles.titulo}>Gráficos de Saúde</Text>
                    <Text style={styles.subtitulo}>Acompanhe a evolução ao longo do tempo</Text>
                </View>

                <View style={styles.metricasContainer}>
                    {metricas.map((metrica) => (
                        <TouchableOpacity
                            key={metrica.id}
                            style={[
                                styles.metricaItem,
                                metricSelecionada === metrica.id && styles.metricaSelecionada
                            ]}
                            onPress={() => setMetricSelecionada(metrica.id)}
                        >
                            <FontAwesome6
                                name={metrica.icon}
                                size={20}
                                color={metricSelecionada === metrica.id ? colors.white : colors.bluePrimary}
                            />
                            <Text style={[
                                styles.metricaTexto,
                                metricSelecionada === metrica.id && styles.metricaTextoSelecionado
                            ]}>
                                {metrica.nome}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.graficoContainer}>
                    {renderGrafico()}
                </View>
            </ScrollView>
        </View>
    );
}