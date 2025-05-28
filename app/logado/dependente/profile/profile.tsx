import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import React, { useRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Pressable, ScrollView, Switch } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import CustomModal from './modal-edit-photo';

export default function PerfilDependente() {
    const modalRef = useRef<Modalize>(null);
    const router = useRouter();

    const [isDarkMode, setIsDarkMode] = React.useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(previousState => !previousState);
    }

    const openModal = () => {
        modalRef.current?.open();
    };

    const handleLogout = () => {
        router.replace('../../../welcome')
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../../../../assets/images/bgSanare.png')}
                style={styles.logoFooter}
            />
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
                            source={require('../../../../assets/images/profile-photo.jpg')}
                            style={styles.profilePhoto}
                        />

                        <TouchableOpacity
                            style={styles.EditPhotoContainer}
                            onPress={() => {
                                openModal();
                            }}
                        >
                            <Ionicons
                                name='pencil'
                                color={Colors.light.white}
                                size={30}
                            />

                        </TouchableOpacity>
                    </View>

                    <Text style={styles.username}>Maria Santos</Text>
                    <Text style={styles.email}>mariaSantos@gmail.com</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.tittle}>Doenças</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.scroll}
                    >
                        <View style={styles.card}><Text style={styles.text}>Diabetes</Text></View>
                        <View style={styles.card}><Text style={styles.text}>Hipertensão</Text></View>
                        <View style={styles.card}><Text style={styles.text}>Asma</Text></View>
                    </ScrollView>
                </View>

                <View style={styles.section}>
                    <Text style={styles.tittle}>Alergias</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.scroll}
                    >
                        <View style={styles.card}><Text style={styles.text}>Amoxilina</Text></View>
                        <View style={styles.card}><Text style={styles.text}>Peniclina</Text></View>
                        <View style={styles.card}><Text style={styles.text}>Ibuprofeno</Text></View>
                    </ScrollView>
                </View>

                <View style={styles.sectionConfig}>
                    <Pressable 
                    style={styles.ConfigItem}
                        onPress={() => router.replace('./edit-dados')}

                    >
                        <Text style={styles.textConfig}>Editar Dados</Text>

                        <MaterialIcons
                            name='arrow-forward-ios'
                            size={24}
                        />
                    </Pressable>

                    <View style={styles.ConfigItem}>
                        <Text style={styles.textConfig}>Configurações</Text>

                        <MaterialIcons
                            name='arrow-forward-ios'
                            size={24}
                        />
                    </View>

                    <View style={styles.ConfigItem}>
                        <Text style={styles.textConfig}>Tema Escuro</Text>

                        <Switch
                            trackColor={{ false: Colors.light.grayOpacityBorder, true: Colors.light.bluePrimaryOpacity }}
                            thumbColor={isDarkMode ? Colors.light.bluePrimary : Colors.light.gray}
                            onValueChange={toggleDarkMode}
                            value={isDarkMode}
                        />

                    </View>

                    <Pressable
                        style={styles.ConfigItem}
                        onPress={() => router.replace('/welcome')}
                    >
                        <Text style={styles.logOut}>Sair</Text>
                        <MaterialIcons
                            name='logout'
                            size={30}
                            color={Colors.light.bluePrimary}
                        />
                    </Pressable>

                </View>
            </ScrollView>
            <CustomModal ref={modalRef} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    profilePhoto: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderColor: Colors.light.bluePrimary,
        borderWidth: 8,
        resizeMode: 'cover'
    },
    EditPhotoContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.light.blueDark,
        width: 55,
        height: 55,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.light.white,
    },
    username: {
        fontFamily: 'Poppins-Medium',
        fontSize: 30,
    },
    email: {
        fontFamily: 'Poppins-Regular',
        fontSize: 20,
        color: Colors.light.blackOpacity,
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
        fontSize: 25,
        color: Colors.light.bluePrimary,
        marginBottom: 20
    },
    scroll: {
        flexDirection: 'row',
    },
    card: {
        backgroundColor: Colors.light.bluePrimary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginRight: 15,
        minWidth: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: Colors.light.white,
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
        backgroundColor: Colors.light.white,
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
    },
    logOut: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        color: Colors.light.bluePrimary,
    }
})