import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const screenHeight = Dimensions.get("window").height;

interface CustomModalProps {
    email: string;
}

const CustomModal = forwardRef<Modalize, CustomModalProps>(({ email }, ref) => {

    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [code, setCode] = useState(['', '', '', '']); const router = useRouter();
    const inputsRef = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync(Fonts);
            setFontsLoaded(true);
        }

        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const handleChange = (text: string, index: number) => {
        const newCode = [...code];
        newCode[index] = text;

        setCode(newCode);

        if (text && index < 3) {
            inputsRef.current[index + 1]?.focus(); //vai pro próximo input
        }
    }

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus(); // volta pro input anterior
        }
    }

    return (
        <Modalize
            ref={ref}
            modalHeight={screenHeight * 0.65}
            overlayStyle={styles.overlay}
            modalStyle={styles.modal}
            keyboardAvoidingBehavior="padding" avoidKeyboardLikeIOS
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.titulo}>Verifique seu e-mail</Text>
                    <Text style={styles.text}>Enviamos um código de 4 dígitos para <Text style={{ fontWeight: 'bold' }}>{email}</Text></Text>

                    <View style={styles.codeInputContainer}>
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={ref => { inputsRef.current[index] = ref; }}
                                style={styles.codeInput}
                                maxLength={1}
                                keyboardType="numeric"
                                onChangeText={text => handleChange(text, index)}
                                onKeyPress={e => handleKeyPress(e, index)}
                                value={digit}
                                textAlign="center"
                            />
                        ))}
                    </View>

                    <View style={styles.viewBtn}>
                        <TouchableOpacity style={styles.btn} onPress={() => router.push('./')}>
                            <LinearGradient
                                colors={['#005EB7', '#CEECF5']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 3.8 }}
                                style={styles.btnGradient}
                            >
                                <Text style={styles.btnText}>Enviar</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>

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
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        marginTop: '10%',
        marginBottom: '10%',
        fontFamily: 'Poppins-SemiBold',
        color: Colors.light.bluePrimary,
        fontSize: 28,
    },
    text: {
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        fontSize: 16
    },
    codeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        paddingHorizontal: 10,
        width: '100%',
        marginBottom: '20%',

    },
    codeInput: {
        width: 68,
        height: 80,
        borderWidth: 2,
        borderColor: Colors.light.grayOpacityBorder,
        borderRadius: 10,
        fontSize: 28,
        fontFamily: 'Poppins-SemiBold',
        color: Colors.light.bluePrimary,
        backgroundColor: Colors.light.white,
    },
    viewBtn: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    btn: {
        width: 220,
        height: 70,
        borderRadius: 50,
        overflow: 'hidden',
    },
    btnText: {
        color: Colors.light.white,
        fontFamily: 'Poppins-Medium',
        fontSize: 25,
    },
    btnGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },

});
