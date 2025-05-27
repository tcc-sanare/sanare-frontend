import Colors from '@/constants/Colors';
// import { forwardRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

const screenHeight = Dimensions.get("window").height;

// const modalEditPhoto = forwardRef<Modalize>((ref)) => {
export default function modalEditPhoto() {

    return (
        <Modalize
            // ref={ref}
            modalHeight={screenHeight * 0.30}
            overlayStyle={styles.overlay}
            modalStyle={styles.modal}
            keyboardAvoidingBehavior="padding"
        >

            <View style={styles.modalContent}>


                <Text>TESTE MODAL</Text>


            </View>

        </Modalize>
    )
}

// export default modalEditPhoto

const styles = StyleSheet.create({
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
        justifyContent: 'center',
        alignItems: 'center',
    }
})