import Colors from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from 'react';
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

export default function editDadosUser() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedPasswordConfirm, setIsFocusedPasswordConfirm] = useState(false);
    const [ConfirmsenhaVisivel, setConfirmSenhaVisivel] = useState(false);
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    const [isFocusedDropdown, setIsFocusedDropdown] = useState(false);

    const [nome, setNome] = useState(typeof params.nome === 'string' ? params.nome : '');
    const [senha, setSenha] = useState(typeof params.senha === 'string' ? params.senha : '');
    const [email, setEmail] = useState(typeof params.email === 'string' ? params.email : '');
    const [selectedBloodType, setSelectedBloodType] = useState(typeof params.tipoSanguineo === 'string' ? params.tipoSanguineo : '');

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background
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
            fontSize: 22,
            color: colors.black
        },
        inputFocused: {
            borderColor: colors.bluePrimaryOpacity,
            borderWidth: 4,
            borderRadius: 15,
        },
        input: {
            width: '100%',
            height: 58,
            borderWidth: 4,
            borderColor: colors.grayOpacityBorder,
            borderRadius: 15,
            marginTop: 10,
            paddingRight: 15,
            paddingLeft: 20,
            backgroundColor: colors.input,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        textInput: {
            fontFamily: 'Poppins-Regular',
            flex: 1,
            color: colors.black
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
        dropdown: {
            height: 58,
            borderRadius: 15,
            paddingHorizontal: 20,
            borderWidth: 4,
            borderColor: colors.grayOpacityBorder,
            backgroundColor: colors.input,
            marginTop: 10,
        },
        placeholderStyle: {
            color: colors.dropdownPlaceholder,
            fontFamily: 'Poppins-Regular',
        },
        selectedTextStyle: {
            fontFamily: 'Poppins-Medium',
            backgroundColor: colors.dropdown,
            color: colors.black
        },
        dropdownContainer: {
            borderRadius: 10,
            marginTop: 5,
            backgroundColor: colors.background,
            borderColor: colors.background,
        },
        itemTextStyle: {
            fontFamily: 'Poppins-Regular',
            backgroundColor: colors.background,
            color: colors.black
        },
        viewBtn: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '10%'
        },
        btn: {
            width: 250,
            height: 70,
            borderRadius: 50,
            overflow: 'hidden',
        },
        btnText: {
            color: colors.white,
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
                                    style={styles.textInput}
                                    value={nome}
                                    onChangeText={setNome}
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
                                    value={email}
                                    onChangeText={setEmail}
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
                                    value={senha}
                                    onChangeText={setSenha}
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
                                    value={senha}
                                    onChangeText={setSenha}
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
                                style={[styles.dropdown, isFocusedDropdown && styles.inputFocused]}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                containerStyle={styles.dropdownContainer}
                                itemTextStyle={styles.itemTextStyle}
                                onFocus={() => setIsFocusedDropdown(true)}
                                onBlur={() => setIsFocusedDropdown(false)}
                                activeColor={colors.background}
                            />
                        </View>
                    </View>

                    <View style={styles.sectionConfig}>
                        <Pressable
                            style={styles.ConfigItem}
                            onPress={() => router.replace('./doencasUser')}
                        >
                            <Text style={styles.textConfig}>Doenças</Text>

                            <MaterialIcons
                                name='arrow-forward-ios'
                                size={24}
                                color={colors.black}
                            />
                        </Pressable>
                        <Pressable
                            style={styles.ConfigItem}
                            onPress={() => router.replace('./alergiasUser')}
                        >
                            <Text style={styles.textConfig}>Alergias</Text>

                            <MaterialIcons
                                name='arrow-forward-ios'
                                color={colors.black}
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