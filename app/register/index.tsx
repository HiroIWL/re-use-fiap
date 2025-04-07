import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { UiTextInput } from "@/components/ui/UiTextInput";
import { useRouter } from "expo-router";
import { StyleSheet, Image, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
    const router = useRouter();


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <ScrollView style={styles.container}>
                <Image source={require('@/assets/images/reuse-logo-purple.png')} />
                <View style={styles.loginContainer}>
                    <UiTextInput
                        label="Nome"
                        placeholder="Digite o seu nome aqui"
                    />
                    <UiTextInput
                        label="E-mail"
                        placeholder="Digite o e-mail cadastrado aqui"
                    />
                    <UiTextInput
                        label="Telefone"
                        placeholder="(xx) xxxxx-xxxx"
                    />
                    <UiTextInput
                        label="Senha"
                        placeholder="Digite a sua melhor senha"
                    />
                    <UiTextInput
                        label="Confirme a senha"
                        placeholder="Digite a sua melhor senha"
                    />
                </View>
                <Button
                    text="Cadastrar"
                    onPress={() => {
                        router.push('/terms');
                    }}
                    type="primary"
                />
                <View style={{height: 32}} />
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
})