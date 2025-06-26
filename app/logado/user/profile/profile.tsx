import { useUser } from '@/contexts/UserContext';
import { useTheme } from '@/hooks/useTheme';
import { getAllergies } from '@/http/get-allergies';
import { getChronicDiseases } from '@/http/get-chronic-diseases';
import { getMedicalRecord } from '@/http/get-medical-record';
import { Allergy } from '@/interfaces/allergy';
import { ChronicDisease } from '@/interfaces/chronic-disease';
import { MedicalRecord } from '@/interfaces/medical-record';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Pressable, ScrollView, Switch } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import CustomModal from './modal-edit-photo';

export default function PerfilUser() {
    const modalRef = useRef<Modalize>(null);
    const router = useRouter();
    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null);
    const [allergies, setAllergies] = useState<Allergy[] | null>(null);
    const [chronicalDiseases, setChronicDiseases] = useState<ChronicDisease[] | null>(null);
    const { user, logout } = useUser();

    const [profilePhoto, setProfilePhoto] = useState(
        require('../../../../assets/images/user-photo.jpg')
    );

    useEffect(() => {
        AsyncStorage.getItem('token').then(token => {
            getMedicalRecord({ token: token || '' })
                .then((record) => {
                    setMedicalRecord(record.medicalRecord);
                });
        })
        getAllergies()
            .then((response) => {
                setAllergies(response.allergies);
            })

        getChronicDiseases()
            .then((response) => {
                setChronicDiseases(response.chronicDiseases);
            })
    }, []);
    console.log('Medical Record:', medicalRecord);

    const handleLogout = () => {
        logout()
        router.replace('/welcome')
    }

    const openModal = () => {
        modalRef.current?.open();
    };

    const handlePhotoSelected = (uri: string) => {
        setProfilePhoto({ uri });
        // salvar a foto no backend
    };

    const handlePhotoRemoved = () => {
        setProfilePhoto(require('../../../../assets/images/default-photo.png'));
        // remover a foto no backend
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background
        },
        seta: {
            margin: 45,
            resizeMode: 'contain',
            marginBottom: '15%',
            marginTop: '20%'
        },
        body: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        profilePhotoContainer: {
            position: 'relative',
            width: 180,
            height: 180,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 40,
        },
        profilePhoto: {
            width: 180,
            height: 180,
            borderRadius: 100,
            borderColor: colors.bluePrimary,
            borderWidth: 5,
            resizeMode: 'cover'
        },
        EditPhotoContainer: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: colors.blueDark,
            width: 55,
            height: 55,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: colors.white,
        },
        username: {
            fontFamily: 'Poppins-Medium',
            fontSize: 25,
            color: colors.black
        },
        email: {
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            color: colors.blackOpacity,
            marginTop: 10,
            textAlign: 'center',
            paddingHorizontal: 15
        },
        section: {
            marginTop: 70,
            alignItems: 'flex-start',
            marginHorizontal: 30,
        },
        tittle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
            color: colors.bluePrimaryTittles,
            marginBottom: 20
        },
        scroll: {
            flexDirection: 'row',
        },
        card: {
            backgroundColor: colors.bluePrimary,
            paddingVertical: 15,
            paddingHorizontal: 20,
            borderRadius: 15,
            marginRight: 15,
            minWidth: 120,
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            color: colors.white,
            fontFamily: 'Poppins-Regular',
            fontSize: 16
        },
        sectionConfig: {
            marginTop: 80,
            marginBottom: 80,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
        },
        ConfigItem: {
            width: '90%',
            backgroundColor: colors.ConfigItemcolor,
            height: 70,
            paddingHorizontal: 20,
            borderRadius: 15,
            elevation: 4,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        textConfig: {
            fontFamily: 'Poppins-Medium',
            fontSize: 20,
            color: colors.black
        },
        logOut: {
            fontFamily: 'Poppins-Medium',
            fontSize: 20,
            color: colors.logOut,
        }
    })

    return !(allergies && chronicalDiseases) ? (
        <Text></Text>
    ) : (
        <View style={styles.container}>

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity onPress={() => router.push('../home')}>
                    <Image
                        source={require('../../../../assets/images/seta.png')}
                        style={styles.seta}
                    />
                </TouchableOpacity>
                <View style={styles.body}>

                    <View style={styles.profilePhotoContainer}>
                        <Image
                            source={user?.profilePhotoUrl ? { uri: user.profilePhotoUrl } : profilePhoto}
                            style={styles.profilePhoto}
                        />
                        <TouchableOpacity
                            style={styles.EditPhotoContainer}
                            onPress={openModal}
                        >
                            <Ionicons
                                name='pencil'
                                color={colors.white}
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.username}>{user?.name}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.tittle}>Doenças</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.scroll}
                    >
                        {medicalRecord && medicalRecord?.chronicDiseases.map((disease, i) => {
                            const chronicDisease = chronicalDiseases?.find(d => d.id === disease);
                            return (
                                <View key={i} style={styles.card}>
                                    <Text style={styles.text}>{chronicDisease?.name}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <Text style={styles.tittle}>Alergias</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.scroll}
                    >
                        {medicalRecord && medicalRecord?.allergies.map((allergy, i) => {
                            const allergyItem = allergies?.find(a => a.id === allergy.allergyId);
                            return (
                                <View key={i} style={styles.card}>
                                    <Text style={styles.text}>{allergyItem?.name}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>

                <View style={styles.sectionConfig}>
                    <Pressable
                        style={styles.ConfigItem}
                        onPress={() => router.push({
                            pathname: './edit-dados',
                            params: {
                                nome: 'Nicolas Faustino',
                                email: 'nicolasFaustino@gmail.com',
                                senha: '12345678',
                                tipoSanguineo: 'A+'
                            }
                        })}
                    >
                        <Text style={styles.textConfig}>Editar Dados</Text>

                        <MaterialIcons
                            name='arrow-forward-ios'
                            size={24}
                            color={colors.black}
                        />
                    </Pressable>

                    <Pressable
                        style={styles.ConfigItem}
                        onPress={() => router.replace('./configuracoes')}

                    >
                        <Text style={styles.textConfig}>Configurações</Text>

                        <MaterialIcons
                            name='arrow-forward-ios'
                            size={24}
                            color={colors.black}
                        />
                    </Pressable>

                    <View style={styles.ConfigItem}>
                        <Text style={styles.textConfig}>Tema Escuro</Text>

                        <Switch
                            trackColor={{ false: colors.grayOpacityBorder, true: colors.bluePrimaryOpacity }}
                            thumbColor={isDarkMode ? colors.bluePrimary : colors.gray}
                            onValueChange={toggleDarkMode}
                            value={isDarkMode}
                        />

                    </View>

                    <Pressable
                        style={styles.ConfigItem}
                        onPress={handleLogout}
                    >
                        <Text style={styles.logOut}>Sair</Text>
                        <MaterialIcons
                            name='logout'
                            size={30}
                            color={colors.logOut}
                        />
                    </Pressable>

                </View>
            </ScrollView>
            <CustomModal
                ref={modalRef}
                onPhotoSelected={handlePhotoSelected}
                onPhotoRemoved={handlePhotoRemoved}
            />
        </View>
    );
}

