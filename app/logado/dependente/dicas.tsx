import Colors from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const icons = {
    saude: require('@/assets/images/saude (1).png'),
    energia: require('@/assets/images/energia.png'),
    relaxamento: require('@/assets/images/relaxamento.png'),
    prevencao: require('@/assets/images/prevencao.png'),
};

type TabKey = 'Hábitos' | 'Alimentação' | 'Prevenção';

type Dica = {
    tipo: string;
    texto: string;
    icone: any;
};

const DICAS: Record<TabKey, Dica[]> = {
    Hábitos: [
        { tipo: 'Saúde', texto: 'Beber água é essencial para o bom funcionamento do corpo!', icone: icons.saude },
        { tipo: 'Relaxamento', texto: 'Tirar alguns minutos para meditar pode ajudar no equilíbrio mental!', icone: icons.relaxamento },
        { tipo: 'Energia', texto: 'Acordar cedo ajuda o corpo a ter mais disposição durante o dia!', icone: icons.energia },
        { tipo: 'Saúde', texto: 'Um sono regulado auxilia na recuperação física e mental!', icone: icons.saude },
    ],
    Alimentação: [
        { tipo: 'Energia', texto: 'Coco e Maracujá são frutas ótimas para enriquecer o ferro no sangue!', icone: icons.energia },
        { tipo: 'Relaxamento', texto: 'Chá de camomila pode te ajudar a relaxar antes de dormir.', icone: icons.relaxamento },
        { tipo: 'Energia', texto: 'Bananas são ótimas para ajudar na disposição ao longo do dia!', icone: icons.energia },
        { tipo: 'Saúde', texto: 'Comer comidas gordurosas ou salgadas podem elevar a pressão!', icone: icons.saude },
    ],
    Prevenção: [
        { tipo: 'Coronavírus', texto: 'Vacine-se, lave as mãos e evite contato próximo com pessoas doentes!', icone: icons.prevencao },
        { tipo: 'Dengue', texto: 'Evite água parada em recipientes para eliminar o criadouro!', icone: icons.prevencao },
        { tipo: 'Gripe', texto: 'Evite contato com pessoas doentes e lave sempre as mãos!', icone: icons.prevencao },
        { tipo: 'HIV', texto: 'Faça o uso de preservativos em todas as relações sexuais!', icone: icons.prevencao },
    ],
};

const TABS: TabKey[] = ['Hábitos', 'Alimentação', 'Prevenção'];

const Dicas = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [tabSelecionada, setTabSelecionada] = useState<TabKey>('Hábitos');

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        header: {
            backgroundColor: Colors.light.bluePrimary,
            paddingTop: 50,
            paddingBottom: 20,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            marginBottom: 30,
            height: 120,
        },
        detalhe: {
            position: 'absolute',
            width: 417,
            height: 190,
            top: -90,
            left: 0,
        },
        headerTitle: {
            fontSize: 26,
            fontFamily: 'Poppins-Medium',
            color: '#fff',
            marginLeft: 119,
            marginRight: 20,
        },
        content: {
            paddingHorizontal: 20,
            paddingBottom: 40,
        },
        tabs: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: '15%',
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
        },
        tab: {
            paddingBottom: 10,
            alignItems: 'center',
        },
        tabText: {
            fontSize: 16,
            fontFamily: 'Poppins-SemiBold',
            color: '#888',
        },
        tabTextSelected: {
            color: Colors.light.bluePrimary,
        },
        tabUnderline: {
            height: 3,
            width: '100%',
            backgroundColor: Colors.light.bluePrimary,
            marginTop: 4,
            borderRadius: 2,
        },
        card: {
            backgroundColor: colors.saudeCard,
            padding: 16,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 12,
            marginBottom: 16,
        },
        icone: {
            width: 32,
            height: 32,
            marginTop: 4,
        },
        dicaTitulo: {
            fontFamily: 'Poppins-Bold',
            color: Colors.light.bluePrimary,
            fontSize: 13,
        },
        dicaTexto: {
            fontFamily: 'Poppins-Regular',
            fontSize: 13,
            color: Colors.light.black,
        },
    });

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <Image
                    source={require('../../../assets/images/detalhe.png')}
                    style={styles.detalhe}
                    resizeMode="cover"
                />
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Dicas</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.tabs}>
                    {TABS.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={styles.tab}
                            onPress={() => setTabSelecionada(tab)}
                        >
                            <Text style={[
                                styles.tabText,
                                tabSelecionada === tab && styles.tabTextSelected
                            ]}>
                                {tab}
                            </Text>
                            {tabSelecionada === tab && <View style={styles.tabUnderline} />}
                        </TouchableOpacity>
                    ))}
                </View>

                {DICAS[tabSelecionada].map((dica, index) => (
                    <View key={index} style={styles.card}>
                        <Image source={dica.icone} style={styles.icone} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.dicaTitulo}>{dica.tipo}</Text>
                            <Text style={styles.dicaTexto}>{dica.texto}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default Dicas;