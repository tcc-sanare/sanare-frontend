import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { useCadastro } from '@/contexts/cadastroContext';
import { Caregiver, useUser } from '@/contexts/UserContext';
import { createAccount } from '@/http/create-account';
import { createCaregiver } from '@/http/create-caregiver';
import { createMedicalRecord } from '@/http/create-medical-record';
import { createSelfMonitor } from '@/http/create-self-monitor';
import { updateSelfMonitor } from '@/http/update-self-monitor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function responsavelCadastroConcluido() {
    const router = useRouter();
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [caregiver, setCaregiver] = useState<Caregiver | undefined>(undefined);
    const { reloadUser } = useUser();
    const { responsavelData } = useCadastro();

    console.log('Dados do Responsável:', JSON.stringify(responsavelData, null, 2));

    useEffect(() => {
        createAccount({
            name: responsavelData.nome,
            email: responsavelData.email,
            password: responsavelData.senha,
            confirmPassword: responsavelData.confirmarSenha,
        }).then(async (response) => {
            const token = response.access_token;

            await AsyncStorage.setItem('token', token);

            console.log('Account created with token:', token);
            
            const { caregiver } = await createCaregiver({
                token
            });

            console.log('Caregiver created:', caregiver);
            
            setCaregiver(caregiver);
            
            if (responsavelData.saude) {
                console.log('Creating self monitor with data:', responsavelData.saude.campos);
                await createSelfMonitor({ token }).then((selfMonitor) => {
                    console.log('Self Monitor created:', selfMonitor);
                });

                const { selfMonitor } = await updateSelfMonitor({
                    token,
                    logInputs: {
                        mood: responsavelData.saude.campos.humor,
                        symptoms: responsavelData.saude.campos.sintomas,
                        hydration: responsavelData.saude.campos.hidratacao,
                        bloodSugar: responsavelData.saude.campos.glicemia,
                        bloodPressure: responsavelData.saude.campos.pressaoArterial,
                        imc: responsavelData.saude.campos.imc,
                    }
                });

                const medicalRecord = await createMedicalRecord({
                    token,
                    chronicDiseases: responsavelData.saude.doencas,
                    allergies: responsavelData.saude.alergias.map(a => ({
                        allergyId: a.id,
                        description: a.description
                    })),
                    bloodType: 'o-'
                })
            }
            await reloadUser(token);
        });
    }, []);

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

    return !caregiver ? <Text></Text> : (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/images/bgSanare.png')}
                style={styles.logoFooter}
            />

            <View style={styles.body}>
                <View style={styles.CadastrotextView}>
                    <Text style={styles.titulo}>Cadastro Concluído</Text>

                    <View style={styles.textView}>
                        <Text style={styles.text}> Vincule-se a um dependente usando seu código de responsável.</Text>
                    </View>
                </View>

                <View style={styles.CadastrotextView}>
                    <Text style={styles.textCod}>Seu código de responsável é:</Text>
                    <Text style={styles.codigo}>{caregiver.code}</Text>
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => router.push('../../logado/responsavel/home')}>
                    <LinearGradient
                        colors={['#005EB7', '#CEECF5']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 3.8 }}
                        style={styles.btnGradient}
                    >
                        <Text style={styles.btnText}>Prosseguir</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: Colors.light.background

    },
    logoFooter: {
        position: 'absolute',
        bottom: 0,
        top: '31%',
        resizeMode: 'contain',
        left: 0,
        right: 0,
        height: '100%',
        width: '100%'
    },
    body: {
        justifyContent: 'center',
        alignItems: "center",
    },
    CadastrotextView: {
        alignItems: "center",
        gap: 35,
    },
    titulo: {
        color: Colors.light.bluePrimary,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 30
    },
    textView: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: '20%',
        width: '85%'
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Poppins-Regular',
    },
    textCod: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20
    },
    codigo: {
        fontFamily: 'Poppins-Medium',
        fontSize: 36,
        color: Colors.light.bluePrimary,
        textDecorationLine: 'underline'
    },
    btn: {
        width: 280,
        height: 70,
        borderRadius: 50,
        overflow: 'hidden',
        marginTop: '25%'
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
})