import { ThemedView } from "@/components/ThemedView"
import { Button } from "@/components/ui/Button"
import { useRouter } from "expo-router"
import { StyleSheet, Text, View, Image, FlatList } from "react-native"
export default function ProductPhotosScreens() {
    const router = useRouter()

    return (
        <ThemedView style={styles.container}>
            <Text style={styles.title}>Criando o seu perfil</Text>
            <Text style={styles.subtitle}>Adicione pelo menos 2 fotos
                do seu produto</Text>
            <FlatList
                style={styles.imagesContainer}
                data={new Array(6).fill(0)}
                renderItem={({ item }) => (
                    <View style={styles.productImage}>
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                backgroundColor: '#00920A',
                                padding: 4,
                                borderRadius: 50,
                            }}
                            resizeMode="contain"
                            source={require('@/assets/images/check-green.png')}></Image>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
                columnWrapperStyle={{ gap: 8 }}
            />
            <Button 
                onPress={() => {
                    router.push("/productDetails")
                }}
            type="primary" text="Continuar" />
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

    productImage: {
        height: 180,
        width: 140,
        padding: 4,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        backgroundColor: '#ccc',
        borderRadius: 8,
    },

    imagesContainer: {
        width: "100%",
        flexGrow: 0,
    }
})