import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const mockProductImages = [
    require('@/assets/images/produtos/camera.png'),
    require('@/assets/images/produtos/guitarra.png'),
    require('@/assets/images/produtos/microfone.png'),
    require('@/assets/images/produtos/snorkel.png'),
];

export default function LikesScreen() {
    const [tab, setTab] = useState<'propostas' | 'produtos'>('propostas');
    const [products, setProducts] = useState<any[]>([]);
    const router = useRouter();

    const loadProducts = async () => {
        const stored = await AsyncStorage.getItem('products');
        if (stored) {
            const parsed = JSON.parse(stored);
            setProducts(parsed);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <Header />
            <ThemedView style={{ flex: 1, padding: 16 }}>
                <Text style={styles.title}>Trocas</Text>

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tabButton, tab === 'propostas' && styles.tabButtonActive]}
                        onPress={() => setTab('propostas')}
                    >
                        <Image
                            source={require('@/assets/images/minhas-propostas.png')}
                            style={[styles.tabIcon, { tintColor: tab === 'propostas' ? '#7400FF' : '#B8B8B8' }]}
                        />
                        <Text style={[styles.tabText, tab === 'propostas' && styles.tabTextActive]}>
                            Meus produtos
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabButton, tab === 'produtos' && styles.tabButtonActive]}
                        onPress={() => setTab('produtos')}
                    >
                        <Image
                            source={require('@/assets/images/meus-produtos.png')}
                            style={[styles.tabIcon, { tintColor: tab === 'produtos' ? '#7400FF' : '#B8B8B8' }]}
                        />
                        <Text style={[styles.tabText, tab === 'produtos' && styles.tabTextActive]}>
                            Minhas propostas
                        </Text>
                    </TouchableOpacity>
                </View>

                {tab === 'propostas' && (
                    <ScrollView style={{ gap: 16, marginTop: 12 }}>
                        <Button text="Novo produto" type="primary" onPress={() => router.push('/productDetails')} />
                        {products.map((item, index) => (
                            <View key={index} style={styles.proposalCard}>
                                <Image
                                    source={{ uri: item.photos?.[0] }}
                                    resizeMode="cover"
                                    style={styles.proposalImage}
                                />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.proposalTitle}>{item.title}</Text>
                                    <Text style={styles.proposalSubtitle}>{item.description}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                )}

                {tab === 'produtos' && (
                    <View style={{ alignItems: 'center', gap: 16 }}>
                        <Text style={styles.infoText}>
                            As pessoas interessadas nos seus produtos estarão aqui
                        </Text>
                        <FlatList
                            data={mockProductImages}
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.gridItem}>
                                    <Image
                                        source={item}
                                        style={styles.gridImage}
                                    />
                                </TouchableOpacity>
                            )}
                            contentContainerStyle={{ gap: 8 }}
                            columnWrapperStyle={{ gap: 8 }}
                            scrollEnabled={false}
                        />
                    </View>
                )}
            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        padding: 8,
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 8,
    },
    tabButtonActive: {
        backgroundColor: 'white',
    },
    tabIcon: {
        width: 24,
        height: 24,
        marginBottom: 4,
        resizeMode: 'contain',
    },
    tabText: {
        color: '#B8B8B8',
        fontWeight: '500',
    },
    tabTextActive: {
        color: '#7400FF',
        fontWeight: '600',
    },
    infoText: {
        fontSize: 14,
        color: '#1E1E1E',
    },
    proposalCard: {
        flexDirection: 'row',
        backgroundColor: '#FAFAFF',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        gap: 12,
    },
    proposalImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    proposalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    proposalSubtitle: {
        color: '#888',
    },
    gridItem: {
        width: SCREEN_WIDTH / 2 - 12,
        height: 224,
        borderRadius: 12,
        overflow: 'hidden',
    },
    gridImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});
