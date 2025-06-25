import { useCadastro } from '@/contexts/cadastroContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { JSX, useEffect, useRef, useState } from 'react';
import { Animated, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import Colors from '../../constants/Colors';
import TipoUser from './tipoUser';

// RESPONSÁVEL
import AlergiasCadastroResponsavel from './responsavel/alergiasCadastroResponsavel';
import RegistroCadastroResponsavel from './responsavel/cadastroRegistroResponsavel';
import CadastroResponsavel from './responsavel/credentialsResponsavel';
import DoencasCadastroResponsavel from './responsavel/doencasCadastroResponsavel';
import ResponsavelCadastro from './responsavel/responsavelCadastro';

// DEPENDENTE
import AlergiasCadastroDependente from './dependente/alergiasCadastroDependente';
import RegistroCadastroDependente from './dependente/cadastroRegistroDependente';
import CodigoResponsavel from './dependente/codResponsavelDependente';
import CadastroDependente from './dependente/credentialsDependente';
import DoencasCadastroDependente from './dependente/doencasCadastroDependente';

// COMUM
import { User } from '@/contexts/UserContext';
import AlergiasCadastroUser from './user/alergiasCadastro';
import RegistroCadastroUser from './user/cadastroRegistro';
import CadastroUser from './user/credentialsUser';
import DoencasCadastroUser from './user/doencasCadastro';

export default function Cadastro() {
    const [stepIndex, setStepIndex] = useState(0);
    const [steps, setSteps] = useState<JSX.Element[]>([]);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const router = useRouter();
    const currentStepKey = steps[stepIndex]?.key;
    const [stepsReady, setStepsReady] = useState(true);
    const stepsRef = useRef<JSX.Element[]>([]);

    const {
        userData,
        responsavelData,
        dependenteData,
        resetAll
    } = useCadastro();


    const handleSubmit = async () => {
        // ver qual tipo de cadastro está ativo
        if (steps[stepIndex]?.key === 'u1') {
            console.log('Dados do usuário comum:', userData);
        } else if (steps[stepIndex]?.key === 'r1') {
            console.log('Dados do responsável:', responsavelData);
        } else if (steps[stepIndex]?.key === 'd1') {
            console.log('Dados do dependente:', dependenteData);
        }

        nextStep();
    };

    useEffect(() => {
        return () => resetAll();
    }, []);

    useEffect(() => {
        setSteps([
            <TipoUser key="tipo" onEscolha={handleTipoEscolhido} />,
        ]);
    }, []);

    const handleRespostaCadastroResponsavel = (resposta: "sim" | "nao") => {
        if (resposta === "sim") {
            setStepIndex((prev) => prev + 1);
            
        } else {
            router.push("./responsavel/responsavelCadastroConcluido");
        }
    };

    const handleTipoEscolhido = (tipo: 'responsavel' | 'dependente' | 'comum') => {

        const newSteps = {
            'responsavel': [
                <TipoUser key="tipo" onEscolha={handleTipoEscolhido} />,
                <CadastroResponsavel key="r1" />,
                <ResponsavelCadastro key="r2" onEscolha={handleRespostaCadastroResponsavel} />,
                <DoencasCadastroResponsavel key="r3" />,
                <AlergiasCadastroResponsavel key="r4" />,
                <RegistroCadastroResponsavel key="r5" />,
            ],
            'dependente': [
                <TipoUser key="tipo" onEscolha={handleTipoEscolhido} />,
                <CadastroDependente key="d1" />,
                <CodigoResponsavel key="d2" onCodigoValidado={(idx: any) => nextStepWithWait(3)} />,
                <DoencasCadastroDependente key="d3" />,
                <AlergiasCadastroDependente key="d4" />,
                <RegistroCadastroDependente key="d5" />,
            ],
            'comum': [
                <TipoUser key="tipo" onEscolha={handleTipoEscolhido} />,
                <CadastroUser key="u1" />,
                <DoencasCadastroUser key="u2" />,
                <AlergiasCadastroUser key="u3" />,
                <RegistroCadastroUser key="u4" />,
            ]
        }[tipo];

        stepsRef.current = newSteps;
        setSteps(newSteps);
        setStepIndex(1);
        setStepsReady(true);
    };

    const nextStep = () => {
        if (stepsRef.current.length === 0) {
            return;
        }

        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            const newIndex = Math.min(stepIndex + 1, stepsRef.current.length - 1);

            if (newIndex >= 0 && newIndex < stepsRef.current.length) {
                setStepIndex(newIndex);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            } else {
                console.log("Índice inválido, não atualizando");
            }
        });
    };

    const nextStepWithWait = (targetIndex?: number) => {
        const nextIndex = targetIndex !== undefined ? targetIndex : stepIndex + 1;

        if (stepsRef.current.length === 0) {
            const waitForSteps = setInterval(() => {
                if (stepsRef.current.length > 0) {
                    clearInterval(waitForSteps);
                    goToStep(nextIndex);
                }
            }, 100);
            return;
        }
        goToStep(nextIndex);
    };

    const goToStep = (index: number) => {
        const safeIndex = Math.max(0, Math.min(index, stepsRef.current.length - 1));

        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setStepIndex(safeIndex);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        });
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/Vector2.png')}
                style={styles.logoFooter}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainContainer}>
                        <Text style={styles.header}>Cadastro</Text>
                        <Progress.Bar
                            progress={steps.length > 1 ? (stepIndex + 1) / steps.length : 0.1}
                            width={250}
                            color={Colors.light.bluePrimary}
                            borderRadius={10}
                            animated
                        />
                    </View>

                    <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                        {steps[stepIndex]}
                    </Animated.View>

                    <View style={styles.viewBtn}>
                        {stepIndex !== 0 &&
                            stepIndex < steps.length - 1 &&
                            currentStepKey !== "d2" &&
                            currentStepKey !== "r2" &&
                            currentStepKey !== "r5" && (
                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={handleSubmit}>
                                    <LinearGradient
                                        colors={['#005EB7', '#CEECF5']}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 3.8 }}
                                        style={styles.btnGradient}
                                    >
                                        <Text style={styles.btnText}>Continuar</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 20,
        backgroundColor: Colors.light.background,
    },
    logoFooter: {
        position: 'absolute',
        bottom: 0,
        top: 90,
        resizeMode: 'cover',
        left: 0,
        right: 0,
        opacity: 0.7,
        height: 250,
        width: 429,
    },
    mainContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        marginTop: '30%',
        color: Colors.light.bluePrimary,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 35,
    },
    content: {
        justifyContent: 'center',
    },
    viewBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10%',
    },
    btn: {
        width: 280,
        height: 80,
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
function setIsLoading(arg0: boolean) {
    throw new Error('Function not implemented.');
}

function setUser(account: User) {
    throw new Error('Function not implemented.');
}

