import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';

export default function TrocasScreen() {
    const navigation = useNavigation();
    const scrollViewRef = useRef<ScrollView>(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, text: 'Estou interessado', author: 'other' }
    ]);

    const handleSend = () => {
        if (message.trim()) {
            const newMessage = { id: Date.now(), text: message, author: 'user' };
            setMessages([...messages, newMessage]);
            setMessage('');
            setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
        }
    };

    const isFirstOfGroup = (index: number) => {
        if (index === 0) return true;
        return messages[index].author !== messages[index - 1].author;
    };

    const isLastOfGroup = (index: number) => {
        if (index === messages.length - 1) return true;
        return messages[index].author !== messages[index + 1].author;
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Header />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.container}>
                    <View style={styles.chatHeader}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <View style={styles.backIcon}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>{'←'}</Text>
                            </View>
                        </TouchableOpacity>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/100' }}
                            style={styles.avatar}
                        />
                        <View>
                            <Text style={styles.title}>Tenis azul</Text>
                            <Text style={styles.subtitle}>Inicie a conversa</Text>
                        </View>
                    </View>

                    <ScrollView
                        ref={scrollViewRef}
                        style={styles.messagesContainer}
                        contentContainerStyle={styles.messagesContent}
                        onContentSizeChange={() =>
                            scrollViewRef.current?.scrollToEnd({ animated: true })
                        }
                    >
                        {messages.map((msg, index) => {
                            const isUser = msg.author === 'user';
                            const first = isFirstOfGroup(index);
                            const last = isLastOfGroup(index);

                            return (
                                <View
                                    key={msg.id}
                                    style={[
                                        styles.bubble,
                                        {
                                            alignSelf: isUser ? 'flex-end' : 'flex-start',
                                            backgroundColor: isUser ? '#47305B' : '#888',
                                            borderTopLeftRadius: isUser ? 16 : first ? 24 : 4,
                                            borderTopRightRadius: isUser ? first ? 24 : 4 : 16,
                                            borderBottomRightRadius: isUser ? last ? 24 : 4 : 16,
                                            borderBottomLeftRadius: isUser ? 16 : last ? 24 : 4,
                                            marginTop: first ? 12 : 2,
                                            marginBottom: last ? 12 : 2,
                                        }
                                    ]}
                                >
                                    <Text style={styles.bubbleText}>{msg.text}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite sua mensagem"
                            value={message}
                            onChangeText={setMessage}
                            multiline
                            onSubmitEditing={handleSend}
                        />
                        <Button type="primary" text="Enviar mensagem" onPress={handleSend} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: 'white',
    },
    chatHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
        paddingTop: 8,
    },
    backButton: {
        marginRight: 4,
    },
    backIcon: {
        width: 32,
        height: 32,
        backgroundColor: '#8A2BE2',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#888',
    },
    messagesContainer: {
        flex: 1,
    },
    messagesContent: {
        paddingBottom: 20,
        paddingTop: 8,
    },
    bubble: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        maxWidth: '80%',
    },
    bubbleText: {
        color: 'white',
    },
    inputContainer: {
        gap: 12,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        minHeight: 80,
        padding: 12,
        textAlignVertical: 'top',
    },
});
