import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    title: string;
    items: string[];
    selected: string[];
    setSelected: (value: string[]) => void;
}

const DropdownListRegistro: React.FC<Props> = ({ title, items, selected, setSelected }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleItem = (item: string) => {
        if (selected.includes(item)) {
            setSelected(selected.filter(i => i !== item));
        } else {
            setSelected([...selected, item]);
        }
    }

    return (
        <View style={styles.container}>

            {isExpanded && (
                <View style={styles.itemsContainer}>
                    {items.map((item) => (
                        <TouchableOpacity key={item} onPress={() => toggleItem(item)} style={styles.item}>
                            <Ionicons
                                name={selected.includes(item) ? 'checkmark-circle' : 'ellipse-outline'}
                                size={33}
                                color={Colors.light.bluePrimary}
                                style={{ marginRight: 12 }}
                            />
                            <Text style={styles.itemText}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

export default DropdownListRegistro;

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    headerText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 12,
    },
    itemsContainer: {
        paddingHorizontal: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    itemText: {
        fontSize: 22,
        fontFamily: 'Poppins-Regular',
    },
});
