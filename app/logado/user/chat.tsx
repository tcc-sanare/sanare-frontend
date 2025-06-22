import { useTheme } from '@/hooks/useTheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function Chat() {
    const { isDarkMode, toggleDarkMode, colors } = useTheme();
    const router = useRouter();

    const [messages, setMessages] = useState([
        { id: 1, text: 'Olá, aqui é o San, assistente virtual do Sanare.', type: 'bot', date: 'Hoje' },
        { id: 2, text: 'Como posso te ajudar?', type: 'bot', date: 'Hoje' }
    ]);
    const [inputText, setInputText] = useState('');
    const scrollRef = useRef<ScrollView>(null);

    const sendMessage = () => {
        if (inputText.trim() === '') return;
        const newMessage = {
            id: Date.now(),
            text: inputText,
            type: 'user',
            date: 'Hoje'
        };
        setMessages([...messages, newMessage]);
        setInputText('');
        setTimeout(() => {
            scrollRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        header: {
            width: '100%',
            height: 150,
        },
        seta: {
            margin: 30,
            resizeMode: 'contain',
            marginBottom: '12%',
            marginTop: '20%',
            width: 35,
            flexDirection: 'column'
        },
        san: {
            width: 50,
            height: 50,
            position: 'absolute',
            left: 120,
            top: 70,
        },
        section: {
            position: 'absolute',
            right: 50,
            bottom: 30,
        },
        sanText: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
            color: colors.bluePrimary,
        },
        subtittle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
            color: colors.black
        },
        mainContainer: {
            flex: 1,
        },
        chatContainer: {
            flex: 1,
        },
        chatContent: {
            paddingHorizontal: 20,
            paddingBottom: 20,
        },
        dateDivider: {
            textAlign: 'center',
            color: '#999',
            fontSize: 14,
            marginVertical: 10,
        },
        message: {
            maxWidth: '80%',
            borderRadius: 10,
            padding: 10,
            marginVertical: 5,
        },
        botMessage: {
            alignSelf: 'flex-start',
            backgroundColor: '#e0e0e0',
        },
        userMessage: {
            borderRadius: 10,
            alignSelf: 'flex-end',
            backgroundColor: '#d0e6ff',
        },
        messageText: {
            fontSize: 16,
            color: '#000',
        },
        inputContainer: {
            padding: 10,
            marginBottom: 20,
            backgroundColor: colors.background,
        },
        inputRow: {
            flexDirection: 'row',
        },
        input: {
            flex: 1,
            height: 55,
            borderRadius: 50,
            paddingHorizontal: 15,
            backgroundColor: '#f0f0f0',
            fontSize: 16,
        },
        sendButton: {
            height: 55,
            width: 55,
            marginLeft: 10,
            backgroundColor: '#0099ff',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    const renderMessages = () => {
        let lastDate = '';
        return messages.map((msg) => {
            const showDate = msg.date !== lastDate;
            lastDate = msg.date;

            return (
                <View key={msg.id}>
                    {showDate && <Text style={styles.dateDivider}>{msg.date}</Text>}
                    <View style={[styles.message, msg.type === 'user' ? styles.userMessage : styles.botMessage]}>
                        <Text style={styles.messageText}>{msg.text}</Text>
                    </View>
                </View>
            );
        });
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.mainContainer}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.push('./home')}>
                        <Image
                            source={require('../../../assets/images/seta.png')}
                            style={styles.seta}
                        />
                    </TouchableOpacity>

                    <Image
                        source={require('../../../assets/images/San.png')}
                        style={styles.san}
                        resizeMode="contain"
                    />

                    <View style={styles.section}>
                        <Text style={styles.sanText}>San</Text>
                        <Text style={styles.subtittle}>Assistente Virtual</Text>
                    </View>
                </View>

                <View style={styles.chatContainer}>
                    <ScrollView
                        contentContainerStyle={styles.chatContent}
                        ref={scrollRef}
                        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
                        keyboardShouldPersistTaps="handled"
                    >
                        {renderMessages()}
                    </ScrollView>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputRow}>
                        <TextInput
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="Pergunte alguma coisa..."
                            placeholderTextColor={'#D3D3D3'}
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                            <MaterialIcons name="send" size={22} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}