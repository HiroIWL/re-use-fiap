import { Button } from "@/components/ui/Button";
import { UiTextInput } from "@/components/ui/UiTextInput";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Image, View, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterScreen() {
    const router = useRouter();
    const { register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(""); // opcional, pode ignorar no back
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        try {
            await register(name, email, password);
            router.push("/terms"); // ou direto pro app, ex: router.replace("/home")
        } catch (err: any) {
            Alert.alert("Erro no cadastro", err.message || "Tente novamente.");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView style={styles.container}>
                <Image source={require('@/assets/images/reuse-logo-purple.png')} />
                <View style={styles.loginContainer}>
                    <UiTextInput
                        label="Nome"
                        placeholder="Digite o seu nome aqui"
                        value={name}
                        onChangeText={setName}
                    />
                    <UiTextInput
                        label="E-mail"
                        placeholder="Digite o e-mail cadastrado aqui"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <UiTextInput
                        label="Telefone"
                        placeholder="(xx) xxxxx-xxxx"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                    <UiTextInput
                        label="Senha"
                        placeholder="Digite a sua melhor senha"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <UiTextInput
                        label="Confirme a senha"
                        placeholder="Digite a sua melhor senha"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>
                <Button
                    text="Cadastrar"
                    onPress={handleRegister}
                    type="primary"
                />
                <View style={{ height: 32 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        fontFamily: "sans-serif",
        gap: 32,
        padding: 40,
    },

    loginContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 16,
        marginBottom: 16,
    },

    highlight: {
        fontSize: 16,
        fontWeight: 'semibold',
        color: '#8F5BBD',
        textDecorationLine: 'underline',
    },

    loginButton: {
        width: "100%",
        height: 48,
        borderRadius: 8,
        backgroundColor: "#8700FF",
        justifyContent: "center",
        alignItems: "center",
    },

    loginButtonText: {
        color: "white",
        fontWeight: "bold",
    }
});
