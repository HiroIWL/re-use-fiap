import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CategoriesScreen() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const router = useRouter();

    const handleSaveCategory = async () => {
        router.push("/(tabs)");
    };

    return (
        <ThemedView style={styles.container}>
            <Text style={styles.title}>Selecione as categorias de produto que lhe interessam</Text>
            <Text style={styles.subtitle}>Seleciona pelo menos uma categoria</Text>
            <CategoriesList selected={selectedCategory} onSelect={setSelectedCategory} />
            <Button type="primary" text="Continuar" onPress={handleSaveCategory} />
        </ThemedView>
    );
}

type CategoriesListProps = {
    selected: string | null;
    onSelect: (value: string) => void;
};

const CategoriesList = ({ selected, onSelect }: CategoriesListProps) => {
    const categories: string[] = [
        'Ferramentas',
        'Calçado',
        'Decoração',
        'Eletrodomésticos',
        'Roupas',
        'Eletrônicos',
        'Casa e Decoração',
        'Beleza e Saúde',
        'Esportes e Lazer',
        'Brinquedos e Games',
        'Automotivo',
        'Livros e Papelaria',
        'Pets'
    ];

    return (
        <FlatList
            data={categories}
            style={{ flexGrow: 0 }}
            renderItem={({ item }) => (
                <Category
                    category={item}
                    selected={selected === item}
                    onPress={() => onSelect(item)}
                />
            )}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap' }}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

type CategoryProps = {
    category: string;
    selected: boolean;
    onPress: () => void;
};

const Category = ({ category, selected, onPress }: CategoryProps) => {
    return (
        <TouchableOpacity
            style={[styles.category, { borderColor: selected ? '#ff5252' : '#aaa' }]}
            onPress={onPress}
        >
            <Text style={[styles.categoryText, { color: selected ? '#ff5252' : '#999' }]}>
                {category}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#fff",
        alignItems: 'center',
        padding: 48,
        gap: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: "normal",
        color: "#333",
        fontFamily: "SpaceMono",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        fontWeight: "normal",
        color: "#333",
        fontFamily: "SpaceMono",
    },
    category: {
        borderWidth: 1,
        backgroundColor: '#f3f3f3',
        borderRadius: 32,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    categoryText: {
        color: '#999',
        fontSize: 12,
    },
});
