import Colors from '@/constants/Colors';
import { useTheme } from '@/hooks/useTheme';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Comentarios = () => {
    const [notaVisivel, setNotaVisivel] = useState(false);
    const navigation = useNavigation();
    const router = useRouter();
    const { colors } = useTheme();

    const [comentarios, setComentarios] = useState([
        {
            id: 1,
            nome: 'Marisa Nunes',
            texto: 'A conjuntivite que tive me ajudou a perder muitos quilos!',
            denunciado: true,
        },
    ]);

    const toggleNota = () => {
        setNotaVisivel(!notaVisivel);
    };

    const [novoComentario, setNovoComentario] = useState('');

    const adicionarComentario = () => {
        if (!novoComentario.trim()) return;
        setComentarios([
            ...comentarios,
            {
                id: Date.now(),
                nome: 'Wagner Gusmão',
                texto: novoComentario,
                denunciado: false,
            },
        ]);
        setNovoComentario('');
    };

    const removerComentario = (id: number) => {
        setComentarios(comentarios.filter((c) => c.id !== id));
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        scroll: {
            padding: 16,
            paddingBottom: 100,
        },
        header: {
            height: 100,
            flexDirection: 'row',
            alignItems: 'center',
        },
        headerInfo: {
            top: 30,
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
        },
        logo: {
            width: 45,
            height: 45,
            borderRadius: 18,
            marginRight: 8,
        },
        nomeSanare: {
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
            color: colors.black,
        },
        data: {
            top: -4,
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            color: '#aaa',
        },
        bookmark: {
            top: 30,
            width: 24,
            height: 24,
        },
        imagem: {
            width: 410,
            height: 200,
            marginTop: 12,
            resizeMode: 'cover',
            marginLeft: -18,
            marginRight: -18,
        },
        titulo: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 32,
            textAlign: 'center',
            color: '#fff',
            position: 'absolute',
            top: 180,
            alignSelf: 'center',
            zIndex: 2,
        },
        aviso: {
            marginTop: 16,
            height: 60,
            textAlign: 'center',
            fontFamily: 'Poppins-Regular',
            color: colors.black,
            fontSize: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
        },
        comentario: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: 24,
        },
        avatar: {
            width: 36,
            height: 36,
            borderRadius: 18,
            marginRight: 10,
        },
        nome: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 13,
            color: Colors.light.bluePrimary,
        },
        texto: {
            fontFamily: 'Poppins-Regular',
            fontSize: 13,
            color: colors.black,
            marginVertical: 2,
        },
        responder: {
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            color: '#888',
        },
        iconeAcao: {
            width: 20,
            height: 20,
        },
        flagContainer: {
            top: 20,
            width: 20,
            height: 20,
            position: 'relative',
            alignItems: 'center',
        },
        flagCircle: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#f6f6f6',
            borderWidth: 1,
            borderColor: '#ccc',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
        },
        notaContainer: {
            position: 'absolute',
            top: -40,
            left: -270,
            backgroundColor: '#f6f6f6',
            padding: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#ccc',
            width: 250,
            zIndex: 1,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
        },
        notaTitle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            color: Colors.light.bluePrimary,
            marginBottom: 4,
        },
        notaText: {
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            color: '#000',
        },
        inputContainer: {
            position: 'absolute',
            bottom: 0,
            paddingBottom: 20,
            backgroundColor: colors.home,
            width: '100%',
            padding: 12,
            flexDirection: 'row',
            alignItems: 'center',
        },
        inputBox: {
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: 20,
            paddingHorizontal: 16,
            marginHorizontal: 8,
        },
        input: {
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            height: 40,
            color: '#000',
        },
        enviar: {
            width: 24,
            height: 24,
        },
    });

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}>
                <ScrollView contentContainerStyle={styles.scroll}>
                    {/* Cabeçalho */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}></TouchableOpacity>
                        <View style={styles.headerInfo}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <AntDesign name="left" size={30} color='#0057b7' marginRight={14} />
                            </TouchableOpacity>
                            <Image source={require('../../../assets/images/Logocomunidade.png')} style={styles.logo} />
                            <View>
                                <Text style={styles.nomeSanare}>Sanare</Text>
                                <Text style={styles.data}>Postado em 16/05/25</Text>
                            </View>
                        </View>
                        <Image source={require('../../../assets/images/savevazio.png')} style={styles.bookmark} />
                    </View>
                    <Image source={require('../../../assets/images/post1.png')} style={styles.imagem} />
                    <Text style={styles.titulo}>Dicas para{'\n'}emagrecimento</Text>

                    {/* Aviso */}
                    <Text style={styles.aviso}>
                        Alguns comentários de índole duvidosa{'\n'}podem estar marcados, atente-se!
                    </Text>

                    {/* Comentários */}
                    {comentarios.map((comentario) => (
                        <View key={comentario.id} style={styles.comentario}>
                            <Image source={require('../../../assets/images/fotouser.png')} style={styles.avatar} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.nome}>{comentario.nome}</Text>
                                <Text style={styles.texto}>{comentario.texto}</Text>
                                <TouchableOpacity>
                                    <Text style={styles.responder}>Responder</Text>
                                </TouchableOpacity>
                            </View>

                            {comentario.nome === 'Wagner Gusmão' ? (
                                <TouchableOpacity onPress={() => removerComentario(comentario.id)}>
                                    <Image
                                        source={require('../../../assets/images/x.png')}
                                        style={styles.iconeAcao}
                                    />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={toggleNota}>
                                    <View style={styles.flagContainer}>
                                        {notaVisivel ? (
                                            <>
                                                <View style={styles.flagCircle}>
                                                    <Image
                                                        source={require('../../../assets/images/Flag.png')}
                                                        style={styles.iconeAcao}
                                                    />
                                                </View>
                                                <View style={styles.notaContainer}>
                                                    <Text style={styles.notaTitle}>Nota:</Text>
                                                    <Text style={styles.notaText}>Não, a conjuntivite não ajuda a emagrecer.</Text>
                                                    <Text style={styles.notaText}>Não há dados que comprovem isso.</Text>
                                                </View>
                                            </>
                                        ) : (
                                            <Image
                                                source={require('../../../assets/images/Flag.png')}
                                                style={styles.iconeAcao}
                                            />
                                        )}
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </ScrollView>

                {/* Campo de comentário */}
                <View style={styles.inputContainer}>
                    <Image source={require('../../../assets/images/fotouser.png')} style={styles.avatar} />
                    <View style={styles.inputBox}>
                        <TextInput
                            placeholder="Adicionar comentário"
                            placeholderTextColor="#999"
                            value={novoComentario}
                            onChangeText={setNovoComentario}
                            style={styles.input}
                        />
                    </View>
                    <TouchableOpacity onPress={adicionarComentario}>
                        <Image source={require('../../../assets/images/enviar.png')} style={styles.enviar} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Comentarios;