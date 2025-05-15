import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type StepBarProps = {
    totalSteps: number;
    currentStep: number;
};

const StepBar: React.FC<StepBarProps> = ({ totalSteps, currentStep }) => {
    return (
        <View style={styles.container}>
            {Array.from({ length: totalSteps }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.step,
                        index < currentStep ? styles.active : styles.inactive
                    ]}
                />
            ))}
        </View>
    );
};

export default StepBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    step: {
        height: 5,
        width: 50,
        borderRadius: 5,
    },
    active: {
        backgroundColor: Colors.light.bluePrimary,
    },
    inactive: {
        backgroundColor: Colors.light.gray,
    }
});
