import Colors from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
    title: string;
    items: string[];
    selected: string[];
    setSelected: (value: string[]) => void;
}

const DropdownList: React.FC<Props> = ({ title, items, selected, setSelected }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [reactions, setReactions] = useState<{ [key: string]: string }>({});
    const { isDarkMode, toggleDarkMode, colors } = useTheme();


    const toggleItem = (item: string) => {
        if (selected.includes(item)) {
            setSelected(selected.filter(i => i !== item));
            setReactions(prev => {
                const newReactions = { ...prev };
                delete newReactions[item];
                return newReactions;
            });
        } else {
            setSelected([...selected, item]);
        }
    };

    const handleReactionChange = (item: string, text: string) => {
        setReactions(prev => ({ ...prev, [item]: text }));
    };

    const styles = StyleSheet.create({
        container: {
            marginBottom: 16,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        title: {
            fontFamily: 'Poppins-SemiBold',
            color: Colors.light.bluePrimary,
            fontSize: 24,
            marginLeft: 6,
        },
        item: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 6,
            paddingLeft: 26,
        },
        itemText: {
            fontSize: 18,
            fontFamily: 'Poppins-Regular',
            color: colors.black,
        },
        input: {
            marginTop: 4,
            marginLeft: 56,
            marginRight: 16,
            padding: 8,
            maxWidth: '60%',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.gray,
            backgroundColor: colors.inputDoencas,
            color: colors.inputDoencasText,
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={styles.header}>
                <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color={Colors.light.bluePrimary}
                />
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>

            {isExpanded && (
                <View>
                    {items.map((item) => (
                        <View key={item}>
                            <TouchableOpacity
                                onPress={() => toggleItem(item)}
                                style={styles.item}
                            >
                                <Ionicons
                                    name={selected.includes(item) ? 'checkmark-circle' : 'ellipse-outline'}
                                    size={30}
                                    color={Colors.light.bluePrimary}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={styles.itemText}>{item}</Text>
                            </TouchableOpacity>

                            {selected.includes(item) && (
                                <TextInput
                                    placeholder="Descreva a reação alérgica..."
                                    value={reactions[item] || ''}
                                    onChangeText={(text) => handleReactionChange(item, text)}
                                    style={styles.input}
                                    multiline
                                    placeholderTextColor={colors.dropdownPlaceholder}
                                />
                            )}
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

export default DropdownList;


