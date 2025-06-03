import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const bloodTypes = [
    { label: 'A+', value: 'A+' },
    { label: 'A-', value: 'A-' },
    { label: 'B+', value: 'B+' },
    { label: 'B-', value: 'B-' },
    { label: 'AB+', value: 'AB+' },
    { label: 'AB-', value: 'AB-' },
    { label: 'O+', value: 'O+' },
    { label: 'O-', value: 'O-' },
];

export default function editDadosResponsavel() {
    const router = useRouter();
    const [selectedBloodType, setSelectedBloodType] = React.useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedPasswordConfirm, setIsFocusedPasswordConfirm] = useState(false);
    const [ConfirmsenhaVisivel, setConfirmSenhaVisivel] = useState(false);
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => router.push('./profile')}>
                        <Image
                            source={require('../../../../assets/images/seta.png')}
                            style={styles.seta}
                        />
                    </TouchableOpacity>

                    <View style={styles.inputSection}>
                        <View>
                            <Text style={styles.text}>Nome</Text>
                            <View style={[styles.input, isFocusedName && styles.inputFocused]}>
                                <TextInput
                                    onFocus={() => setIsFocusedName(true)}
                                    onBlur={() => setIsFocusedName(false)}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={styles.text}>Email</Text>
                            <View style={[styles.input, isFocused && styles.inputFocused]}>
                                <TextInput
                                    style={styles.textInput}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                />

                                <Ionicons
                                    style={styles.icon}
                                    name="mail"
                                    size={28}
                                    color={Colors.light.bluePrimary}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={styles.text}>Senha</Text>
                            <View style={[styles.input, isFocusedPassword && styles.inputFocused]}>
                                <TextInput
                                    style={styles.textInput}
                                    secureTextEntry={!senhaVisivel}
                                    onFocus={() => setIsFocusedPassword(true)}
                                    onBlur={() => setIsFocusedPassword(false)}
                                />

                                <TouchableOpacity style={styles.icon} onPress={() => setSenhaVisivel(!senhaVisivel)}>
                                    <Ionicons
                                        name={senhaVisivel ? 'eye' : 'eye-off'}
                                        size={28}
                                        color={Colors.light.bluePrimary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.text}>Confirme sua senha</Text>
                            <View style={[styles.input, isFocusedPasswordConfirm && styles.inputFocused]}>
                                <TextInput
                                    style={styles.textInput}
                                    secureTextEntry={!ConfirmsenhaVisivel}
                                    onFocus={() => setIsFocusedPasswordConfirm(true)}
                                    onBlur={() => setIsFocusedPasswordConfirm(false)}
                                />

                                <TouchableOpacity style={styles.icon} onPress={() => setConfirmSenhaVisivel(!ConfirmsenhaVisivel)}>
                                    <Ionicons
                                        name={ConfirmsenhaVisivel ? 'eye' : 'eye-off'}
                                        size={28}
                                        color={Colors.light.bluePrimary}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.text}>Tipo sanguíneo</Text>

                            <Dropdown
                                data={bloodTypes}
                                labelField="label"
                                valueField="value"
                                placeholder='Selecione'
                                value={selectedBloodType}
                                onChange={item => setSelectedBloodType(item.value)}
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.itemTextStyle}
                            />
                        </View>
                    </View>

                    <View style={styles.sectionConfig}>
                        <Pressable
                            style={styles.ConfigItem}
                            onPress={() => router.replace('./doencasResponsavel')}
                        >
                            <Text style={styles.textConfig}>Doenças</Text>

                            <MaterialIcons
                                name='arrow-forward-ios'
                                size={24}
                            />
                        </Pressable>
                        <Pressable
                            style={styles.ConfigItem}
                            onPress={() => router.replace('./alergiasResponsavel')}
                        >
                            <Text style={styles.textConfig}>Alergias</Text>

                            <MaterialIcons
                                name='arrow-forward-ios'
                                size={24}
                            />
                        </Pressable>
                    </View>

                    <View style={styles.viewBtn}>
                        <TouchableOpacity style={styles.btn}
                            onPress={() => {
                                Keyboard.dismiss();
                                router.push('./profile')
                            }}
                        >
                            <LinearGradient
                                colors={['#005EB7', '#CEECF5']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 3.8 }}
                                style={styles.btnGradient}
                            >
                                <Text style={styles.btnText}>Salvar</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background
    },
    seta: {
        margin: 45,
        marginTop: '20%',
        resizeMode: 'contain',
        marginBottom: '15%'
    },
    inputSection: {
        marginHorizontal: 40,
        gap: 30
    },
    text: {
        fontFamily: 'Poppins-Medium',
        fontSize: 22

    },
    inputFocused: {
        borderColor: Colors.light.bluePrimaryOpacity,
        borderWidth: 4,
        borderRadius: 15,
    },
    input: {
        width: '100%',
        height: 58,
        borderWidth: 4,
        borderColor: Colors.light.grayOpacityBorder,
        borderRadius: 15,
        marginTop: 10,
        paddingRight: 15,
        paddingLeft: 20,
        backgroundColor: Colors.light.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textInput: {
        fontFamily: 'Poppins-Regular',
        flex: 1,
    },
    icon: {
        marginLeft: 10,
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
    dropdown: {
        backgroundColor: Colors.light.white,
        borderRadius: 10,
        padding: 16,
        width: '100%',
        elevation: 3,
        marginTop: 10
    },
    placeholderStyle: {
        color: Colors.light.gray,
        fontFamily: 'Poppins-Regular',
    },
    selectedTextStyle: {
        fontFamily: 'Poppins-Medium',
    },
    dropdownContainer: {
        borderRadius: 10,
        marginTop: 5,
    },
    itemTextStyle: {
        fontFamily: 'Poppins-Regular',
    },
    viewBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '10%'
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
})