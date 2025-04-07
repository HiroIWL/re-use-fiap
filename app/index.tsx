import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image } from "react-native";

export default function IndexPage() {
    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(async () => {
            router.replace('/home');
            await AsyncStorage.clear();
        }, 1500);

        return () => clearTimeout(timer);
    }, [])

    return (
        <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#210838' }}>
            <Image source={require('../assets/images/reuse-logo-white.png')} style={{ height: 200 }} />
        </ThemedView>
    )
}