import Colors from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
    title: string;
    items: {
        id: string;
        name: string;
    }[];
    selected: {
        id: string;
        description: string;
    }[];
    setSelected: (value: { id: string; description: string }[]) => void;
}

const DropdownList: React.FC<Props> = ({ title, items, selected, setSelected }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [reactions, setReactions] = useState<{ [key: string]: string }>({});
    const { isDarkMode, toggleDarkMode, colors } = useTheme();


    const toggleItem = (item: { id: string; description: string }) => {
        if (selected.find(i => i.id === item.id)) {
            setSelected(selected.filter(i => i.id !== item.id));
            setReactions(prev => {
                const newReactions = { ...prev };
                return newReactions;
            });
        } else {
            setSelected([...selected, item]);
        }
    };

    useEffect(() => {
        setSelected(
            selected.map(item => ({
                ...item,
                description: reactions[item.id] || item.description
            }))
        );
    }, [reactions]);

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
                        <View key={item.id}>
                            <TouchableOpacity
                                onPress={() => toggleItem({
                                    id: item.id,
                                    description: reactions[item.id] || ''
                                })}
                                style={styles.item}
                            >
                                <Ionicons
                                    name={selected.find(i => i.id === item.id) ? 'checkmark-circle' : 'ellipse-outline'}
                                    size={30}
                                    color={Colors.light.bluePrimary}
                                    style={{ marginRight: 10 }}
                                />
                                <Text style={styles.itemText}>{item.name}</Text>
                            </TouchableOpacity>

                            {selected.find(i => i.id === item.id) && (
                                <TextInput
                                    placeholder="Descreva a reação alérgica..."
                                    value={reactions[item.id] || ''}
                                    onChangeText={(text) => handleReactionChange(item.id, text)}
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


