import { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { UiTextInput } from "@/components/ui/UiTextInput";
import { useRouter } from "expo-router";
import React from "react";
import * as FileSystem from "expo-file-system";
import { useProducts } from "@/hooks/useProducts";

export default function ProductDetailsScreen() {
    const [photos, setPhotos] = useState<string[]>([]);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();
    const { addProduct } = useProducts();

    const handleAddPhoto = async () => {
        Alert.alert(
            "Adicionar foto",
            "Escolha uma opção",
            [
                {
                    text: "Galeria",
                    onPress: async () => {
                        const result = await ImagePicker.launchImageLibraryAsync({
                            allowsMultipleSelection: false,
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            quality: 1,
                            base64: true,
                        });

                        if (!result.canceled && result.assets) {
                            const asset = result.assets[0];
                            const base64 = await FileSystem.readAsStringAsync(asset.uri, { encoding: 'base64' });
                            const uri = `data:image/jpeg;base64,${base64}`;
                            if (photos.length < 6) {
                                setPhotos(prev => [...prev, uri]);
                            }
                        }
                    },
                },
                {
                    text: "Câmera",
                    onPress: async () => {
                        const permission = await ImagePicker.requestCameraPermissionsAsync();
                        if (!permission.granted) {
                            Alert.alert("Permissão necessária", "Permita o uso da câmera para continuar.");
                            return;
                        }

                        const result = await ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            quality: 1,
                            base64: true,
                        });

                        if (!result.canceled && result.assets) {
                            const asset = result.assets[0];
                            const base64 = await FileSystem.readAsStringAsync(asset.uri, { encoding: 'base64' });
                            const uri = `data:image/jpeg;base64,${base64}`;
                            if (photos.length < 6) {
                                setPhotos(prev => [...prev, uri]);
                            }
                        }
                    },
                },
                {
                    text: "Cancelar",
                    style: "cancel",
                },
            ],
            { cancelable: true }
        );
    };

    const handleRemovePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        const newProduct = {
            id: Date.now(),
            title,
            category,
            condition,
            description,
            photos,
        };

        try {
            await addProduct(newProduct);
            if (photos.length) {
                router.push("/(tabs)/likes");
            } else {
                router.push("/categories");
            }
        } catch (err) {
            Alert.alert("Erro ao salvar", "Não foi possível salvar o produto.");
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#fff" }} behavior="position">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <ThemedView style={styles.container}>
                    <Text style={styles.title}>Criando o seu produto</Text>
                    <AddPhotoInput photos={photos} onPress={handleAddPhoto} onRemove={handleRemovePhoto} />

                    <UiTextInput label="Título" placeholder="Digite o título do seu produto aqui" value={title} onChangeText={setTitle} />
                    <UiTextInput label="Condição do produto" placeholder="Escreva a condição do seu produto aqui" value={condition} onChangeText={setCondition} />
                    <UiTextInput label="Categoria" placeholder="Digite a categoria do seu produto aqui" value={category} onChangeText={setCategory} />
                    <UiTextInput label="Adicione a descrição" placeholder="Escreva a descrição do seu produto aqui" value={description} onChangeText={setDescription} />
                    <Button type="primary" text="Continuar" onPress={handleSave} />
                </ThemedView>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

type AddPhotoInputProps = {
    onPress: () => void;
    photos: string[];
    onRemove: (index: number) => void;
};

const AddPhotoInput = ({ onPress, photos, onRemove }: AddPhotoInputProps) => (
    <TouchableOpacity onPress={() => photos.length < 6 && onPress()} activeOpacity={0.9}>
        <View style={styles.photoInputDashedBox}>
            <View style={styles.photoInputDottedBox}>
                {photos.length > 0 ? (
                    <View style={{ gap: 8, alignItems: "center" }}>
                        <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                            {photos.map((uri, index) => (
                                <View key={index} style={styles.imageWrapper}>
                                    <Image source={{ uri }} style={styles.thumbnail} />
                                    <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(index)}>
                                        <Image source={require("@/assets/images/X.png")} style={{ width: 8, height: 8 }} resizeMode="contain" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        <Text style={styles.photoCount}>{photos.length} de 6 fotos selecionadas</Text>
                    </View>
                ) : (
                    <>
                        <Image source={require("@/assets/images/redpink-camera.png")} />
                        <Text style={styles.addLabel}>Incluir Fotos</Text>
                        <Text style={styles.photoCount}>{photos.length} de 6 fotos selecionadas</Text>
                    </>
                )}
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 48,
        gap: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: "normal",
        color: "#333",
        fontFamily: "SpaceMono",
    },
    photoInputDashedBox: {
        width: "100%",
        height: 180,
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: "#aaa",
        borderRadius: 16,
        padding: 8,
        backgroundColor: "#f9f9f9",
    },
    photoInputDottedBox: {
        padding: 8,
        borderRadius: 8,
        borderStyle: "dotted",
        borderWidth: 1,
        borderColor: "#aaa",
        flex: 1,
        backgroundColor: "#f9f9f9",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    addLabel: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#FF5252",
    },
    photoCount: {
        fontSize: 12,
        color: "#666",
    },
    imageWrapper: {
        position: "relative",
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    removeButton: {
        position: "absolute",
        top: -6,
        right: -6,
        backgroundColor: "#FF5252",
        borderRadius: 12,
        width: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
    },
});
