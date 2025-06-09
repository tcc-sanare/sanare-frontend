import Colors from '@/constants/Colors';
import { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Lembretes = () => {
    const [hydrationEnabled, setHydrationEnabled] = useState(false);
    const [pressureEnabled, setPressureEnabled] = useState(true);

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <AntDesign name="left" size={24} color="white" style={{ position: 'absolute', left: 16 }} />
                <Text style={styles.headerText}>Lembretes</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.addTitle}>Adicionar lembretes</Text>

                <View style={styles.rowBetween}>
                    <Text style={styles.sectionLabel}>Adicionar</Text>
                    <TouchableOpacity>
                        <AntDesign name="pluscircle" size={24} color={Colors.light.bluePrimary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                {/* LEMBRETE */}
                <View>
                    <View style={styles.rowBetween}>
                        <Text style={styles.reminderTitle}>Exame</Text>
                        <TouchableOpacity>
                            <MaterialIcons name="delete" size={30} color={Colors.light.bluePrimary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.fieldRow}>
                        <Text style={styles.labelInline}>Horário:</Text>
                        <Dropdown placeholder="07:00" />
                    </View>
                    <View style={styles.fieldRow}>
                        <Text style={styles.labelInline}>Data:</Text>
                        <Dropdown placeholder="20/06/25" />
                    </View>
                </View>

                <View style={styles.separator} />

                {/* HIDRATAÇÃO */}
                <View>
                    <View style={styles.rowBetween}>
                        <Text style={styles.sectionTitle}>Hidratação</Text>
                        <Switch
                            value={hydrationEnabled}
                            onValueChange={setHydrationEnabled}
                            thumbColor={hydrationEnabled ? Colors.light.bluePrimary : '#ccc'}
                            trackColor={{ false: '#ccc', true: '#C2DCF2' }}
                        />
                    </View>

                    <View style={styles.fieldRow}>
                        <Text style={styles.labelInline}>Hora de início:</Text>
                        <Dropdown placeholder="07:00" />
                    </View>
                    <View style={styles.fieldRow}>
                        <Text style={styles.labelInline}>Hora de término:</Text>
                        <Dropdown placeholder="16:00" />
                    </View>
                    <View style={styles.fieldRow}>
                        <Text style={styles.labelInline}>Intervalo:</Text>
                        <Dropdown placeholder="3h" />
                    </View>

                    <Text style={styles.hint}>
                        Os lembretes serão exibidos dentro do intervalo escolhido.
                    </Text>
                </View>

                <View style={styles.separator} />
                {/* PRESSÃO */}
                <View>
                    <View style={styles.rowBetween}>
                        <Text style={styles.sectionTitle}>Pressão</Text>
                        <Switch
                            value={pressureEnabled}
                            onValueChange={setPressureEnabled}
                            thumbColor={pressureEnabled ? Colors.light.bluePrimary : '#ccc'}
                            trackColor={{ false: '#ccc', true: '#C2DCF2' }}
                        />
                    </View>

                    <View style={styles.fieldRow}>
                        <Text style={styles.labelInline}>Hora do lembrete:</Text>
                        <Dropdown placeholder="07:00" />
                    </View>
                    <View style={styles.fieldRow}>
                        <Text style={styles.labelInline}>Duração:</Text>
                        <Dropdown placeholder="Todos os dias" />
                    </View>
                </View>

                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveText}>Salvar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const Dropdown = ({ placeholder }: { placeholder: string }) => (
    <TouchableOpacity style={styles.dropdown}>
        <Text style={styles.dropdownText}>{placeholder}</Text>
        <AntDesign name="caretdown" size={12} color="#333" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    header: {
        backgroundColor: Colors.light.bluePrimary,
        paddingVertical: 26,
        // alignItems: 'left',
        justifyContent: 'center',
        position: 'relative',
    },
    headerText: {
        left: 60,
        fontSize: 28,
        fontFamily: 'Poppins-Medium',
        color: '#fff',
    },
    content: {
        padding: 28,
        paddingBottom: 80,
    },
    addTitle: {
        fontSize: 20,
        fontFamily: 'Poppins-Medium',
        color: Colors.light.bluePrimary,
        marginBottom: 8,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    fieldRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
        gap: 12,
    },
    labelInline: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#333',
        width: 145,
        marginRight: 8,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 16,
    },
    reminderTitle: {
        fontSize: 22,
        fontFamily: 'Poppins-Regular',
        color: Colors.light.bluePrimary,
        marginBottom: 40,
    },
    sectionLabel: {
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
        color: '#000',
    },
    label: {
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        color: '#333',
        marginBottom: 4,
    },
    hint: {
        fontSize: 12,
        fontFamily: 'Poppins-Regular',
        color: '#999',
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 22,
        fontFamily: 'Poppins-Regular',
        color: Colors.light.bluePrimary,
        marginBottom: 40,
    },
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 100,
        backgroundColor: '#D1E3F5',
        borderRadius: 6,
        paddingHorizontal: 10,
        paddingVertical: 8,
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    dropdownText: {
        fontSize: 13,
        fontFamily: 'Poppins-Regular',
        color: '#000',
    },
    saveButton: {
        marginTop: 32,
        alignSelf: 'center',
        backgroundColor: Colors.light.bluePrimary,
        borderRadius: 40,
        paddingHorizontal: 48,
        paddingVertical: 12,
    },
    saveText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    },
});

export default Lembretes;