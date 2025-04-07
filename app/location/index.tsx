import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { StyleSheet, Text, Image } from "react-native";

export default function LocationScreen() {
    const router = useRouter();
    
    return (
        <ThemedView style={styles.container}>
            <Image source={require("@/assets/images/map-pin-fill.png")} />
            <Text style={styles.title}>Ativar sua localização</Text>
            <Text style={styles.subtitle}>Você precisa permitir a localização para utilizar o ReUse.</Text>
            <Button onPress={() => {
                router.navigate("/productPhotos")
            }} type="primary" text="Ativar Localização" />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        padding: 40,
    },

    title: {
        fontSize: 24,
        fontWeight: "regular",
        fontFamily: "SpaceMono",
    },

    subtitle: {
        fontSize: 14,
        fontFamily: "SpaceMono",
        textAlign: "center",
    },
});