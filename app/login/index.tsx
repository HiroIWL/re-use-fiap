import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await login(email, password);
            router.navigate('/(tabs)');
        } catch (err: any) {
            Alert.alert("Erro ao fazer login", err.message || "Verifique suas credenciais");
        }
    };

    return (
        <ThemedView style={styles.container}>
            <Image source={require('@/assets/images/reuse-logo-purple.png')} />
            <View style={styles.welcomeContainer}>
                <Text style={styles.title}>Faça seu login ou&nbsp;</Text>
                <TouchableOpacity onPress={() => router.push('/register')}>
                    <Text style={styles.highlight}>crie sua conta</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.title}>E-mail</Text>
                <TextInput
                    style={styles.loginInput}
                    placeholder="Digite o e-mail cadastrado aqui"
                    placeholderTextColor="#A0A0A0"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.title}>Senha</Text>
                <TextInput
                    style={styles.loginInput}
                    placeholder="Digite a sua melhor senha"
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <Button onPress={handleLogin} type="primary" text="Entrar na conta" />
            <Button type="text" text="Esqueceu a sua senha" />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        fontFamily: "sans-serif",
        gap: 32,
        padding: 40,
    },
    welcomeContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    loginContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 16,
    },
    loginInput: {
        width: "100%",
        height: 48,
        borderRadius: 8,
        padding: 16,
        fontFamily: "sans-serif",
        fontSize: 14,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#E5E5E5",
    },
    title: {
        fontFamily: 'SpaceMono',
        fontSize: 16,
        fontWeight: 'semibold',
    },
    highlight: {
        fontSize: 16,
        fontWeight: 'semibold',
        color: '#8F5BBD',
        textDecorationLine: 'underline',
    },
});
