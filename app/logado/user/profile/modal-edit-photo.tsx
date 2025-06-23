import { useTheme } from '@/hooks/useTheme';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import * as ImagePicker from 'expo-image-picker';
import { forwardRef } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';

const screenHeight = Dimensions.get("window").height;

interface ModalEditPhotoProps {
    onPhotoSelected: (uri: string) => void;
    onPhotoRemoved: () => void;
}

const ModalEditPhoto = forwardRef<Modalize, ModalEditPhotoProps>(({ onPhotoSelected, onPhotoRemoved }, ref) => {
    const { isDarkMode, toggleDarkMode, colors } = useTheme();

    const pickImageFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar sua galeria.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            onPhotoSelected(result.assets[0].uri);
            // @ts-ignore 
            ref.current?.close();
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar sua câmera.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            onPhotoSelected(result.assets[0].uri);
            // @ts-ignore
            ref.current?.close();
        }
    };

    const handleRemovePhoto = () => {
        Alert.alert(
            'Remover foto',
            'Tem certeza que deseja remover sua foto de perfil?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Remover',
                    onPress: () => {
                        onPhotoRemoved();
                        // @ts-ignore
                        ref.current?.close();
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    const styles = StyleSheet.create({
        overlay: {
            backgroundColor: '#0000004D',
        },
        modal: {
            borderTopLeftRadius: 50,
            backgroundColor: colors.background,
            borderTopRightRadius: 50,
            padding: 30,
        },
        container: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontFamily: 'Poppins-Regular',
            fontSize: 22,
            marginTop: 20,
            color: colors.black
        },
        section: {
            marginTop: 40,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
        },
        card: {
            alignItems: 'center',
            gap: 10,
        },
        icon: {
            alignItems: 'center',
            height: 70,
            width: 70,
            borderRadius: 35,
            borderColor: colors.gray,
            borderWidth: 3,
            justifyContent: 'center',
        },
        textCard: {
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            color: colors.black
        }
    });
    return (
        <Modalize
            ref={ref}
            overlayStyle={styles.overlay}
            modalStyle={styles.modal}
            keyboardAvoidingBehavior="padding"
            modalHeight={screenHeight * 0.35}
        >
            <View style={styles.container}>
                <Text style={styles.text}>Foto de Perfil</Text>

                <View style={styles.section}>
                    <TouchableOpacity style={styles.card} onPress={takePhoto}>
                        <View style={styles.icon}><Entypo name="camera" size={30} color={colors.bluePrimary} /></View>
                        <Text style={styles.textCard}>Câmera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={pickImageFromGallery}>
                        <View style={styles.icon}>
                            <FontAwesome6 name="image" size={30} color={colors.bluePrimary} />
                        </View>
                        <Text style={styles.textCard}>Galeria</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={handleRemovePhoto}>
                        <View style={styles.icon}><FontAwesome5 name="trash" size={30} color={colors.bluePrimary} /></View>
                        <Text style={styles.textCard}>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modalize>
    );
});

export default ModalEditPhoto;