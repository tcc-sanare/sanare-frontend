import React, { forwardRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Colors from '../../constants/Colors';

const screenHeight = Dimensions.get("window").height;

const CustomModal = forwardRef((_, ref) => {
    return (
        <Modalize
            ref={ref}
            // handleStyle={styles.handle}
            modalHeight={screenHeight * 0.7}
            overlayStyle={styles.overlay}
            modalStyle={styles.modal}
        >

            <View style={styles.modalContent}>
                <Text> TESTEEE</Text>
            </View>
        </Modalize>
    );
});
export default CustomModal;

const styles = StyleSheet.create({
    // handle: {
    //     backgroundColor: 'red',
    //     width: 40,
    //     height: '70%',
    // },
    overlay: {
        backgroundColor: Colors.light.backgroundOpacity,
    },
    modal: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 20,
        height: '70%',
        backgroundColor: Colors.light.background,
    },
    modalContent: {
        padding: 20,
        
        backgroundColor: 'purple'
    }
});
