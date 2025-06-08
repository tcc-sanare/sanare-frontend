import Colors from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    name: string;
    description: string;
    selected: boolean;
    onToggle: () => void;
}

const DoencaItem: React.FC<Props> = ({ name, description, selected, onToggle }) => {
    const [expanded, setExpanded] = useState(false);
    const { isDarkMode, toggleDarkMode, colors } = useTheme();

    const styles = StyleSheet.create({
        selectedContainer: {
            backgroundColor: colors.doencaItem,
        },
        container: {
            borderWidth: 1.5,
            borderColor: colors.bluePrimary,
            borderRadius: 12,
            padding: 12,
            width: 350,
            marginBottom: 12,
            backgroundColor: colors.background,
            minHeight: 60,
            justifyContent: 'center',
        },

        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },

        title: {
            fontSize: 16,
            fontFamily: 'Poppins-SemiBold',
            color: colors.black
        },
        description: {
            marginTop: 10,
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            color: colors.description
        },

    });

    return (
        <TouchableOpacity
            onPress={onToggle}
            activeOpacity={0.9}
            style={[styles.container, selected && styles.selectedContainer]}
        >
            <View style={styles.header}>
                <Ionicons
                    name={selected ? 'checkmark-circle' : 'ellipse-outline'}
                    size={33}
                    color={Colors.light.bluePrimary}
                    style={{ marginRight: 8 }}
                />
                <Text style={styles.title}>{name}</Text>

                <TouchableOpacity
                    onPress={() => setExpanded(!expanded)}
                >
                    <Ionicons
                        name={expanded ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color={Colors.light.bluePrimary}
                    />
                </TouchableOpacity>
            </View>

            {expanded && (
                <Text style={styles.description}>{description}</Text>
            )}
        </TouchableOpacity>

    );
};

export default DoencaItem;
