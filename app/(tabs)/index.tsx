import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Header } from '@/components/ui/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';

const SCREEN_WIDTH = Dimensions.get('window').width;

const items = [
  {
    id: 1,
    color: '#FFC1C1',
    name: 'Aspirador',
    marca: 'Philco',
    distance: 'A 5km de você!',
    image: 'https://images.colombo.com.br/produtos/4419724/4419724_Aspirador_de_Po_Philco_Smart_Turbo_1800W_12248997_z.jpg',
  },
  {
    id: 2,
    color: '#C1E1FF',
    name: 'Microfone',
    marca: 'Shure',
    distance: 'A 3km de você!',
    image: 'https://mlb-s2-p.mlstatic.com/microfone-profissional-shure-beta58a-sm58-original-5265-MLB4949332291_092013-F.jpg',
  },
  {
    id: 3,
    color: '#D1FFC1',
    name: 'Headphone',
    marca: 'Sennheiser',
    distance: 'A 8km de você!',
    image: 'https://www.bhphotovideo.com/images/images2500x2500/sennheiser_504583_universal_head_band_headset_with_980447.jpg',
  },
];

const mockProductImages = [
  require('@/assets/images/produtos/camera.png'),
  require('@/assets/images/produtos/guitarra.png'),
  require('@/assets/images/produtos/microfone.png'),
  require('@/assets/images/produtos/snorkel.png'),
];

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const position = useRef(new Animated.ValueXY()).current;

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    position.setValue({ x: 0, y: 0 });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          Animated.timing(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gesture.dy },
            duration: 200,
            useNativeDriver: false,
          }).start(goToNext);
          return;
        }

        if (gesture.dx < -120) {
          Animated.timing(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy },
            duration: 200,
            useNativeDriver: false,
          }).start(goToNext);
          return;
        }

        if (gesture.dy < -220) {
          Animated.timing(position, {
            toValue: { x: gesture.dx, y: SCREEN_WIDTH + 100 },
            duration: 200,
            useNativeDriver: false,
          }).start(goToNext);
          setShowModal(true);
          return;
        }

        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  const item = items[currentIndex];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header />
      <ThemedView style={styles.container}>
        <Animated.View
          style={[
            styles.card,
            { backgroundColor: item.color },
            {
              transform: [
                { translateX: position.x },
                { translateY: position.y },
                {
                  rotate: position.x.interpolate({
                    inputRange: [-200, 0, 200],
                    outputRange: ['-10deg', '0deg', '10deg'],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.marca}>{item.marca}</Text>
            <Text style={styles.distance}>{item.distance}</Text>
          </View>
        </Animated.View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FF5069' }]}
            onPress={goToNext}
          >
            <Image
              style={styles.buttonImage}
              source={require('@/assets/images/X.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                width: 75,
                height: 75,
                borderRadius: 37.5,
                backgroundColor: '#426CD4',
              },
            ]}
            onPress={() => setShowModal(true)}
          >
            <Image
              style={[styles.buttonImage, { width: 24, height: 24 }]}
              source={require('@/assets/images/likes.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#00920A' }]}
            onPress={goToNext}
          >
            <Image
              style={[styles.buttonImage]}
              source={require('@/assets/images/check-green.png')}
            />
          </TouchableOpacity>
        </View>

        <Modal animationType="slide" visible={showModal} transparent={true}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setShowModal(false)}
          >
            <Pressable style={styles.modalContainer} onPress={() => { }}>
              <Text style={styles.modalTitle}>
                Qual produto você deseja propor para a troca?
              </Text>
              <FlatList
                data={mockProductImages}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalItem}>
                    <Image
                      source={{ uri: item }}
                      style={styles.modalImage}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.modalGrid}
              />
              <Button
                text="Enviar proposta"
                type="primary"
                onPress={() => setShowModal(false)}
              />
            </Pressable>
          </Pressable>
        </Modal>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    height: '65%',
    borderRadius: 20,
    justifyContent: 'flex-end',
    padding: 16,
    elevation: 5,
    alignItems: 'center',
  },
  productImage: {
    width: '80%',
    height: '60%',
    marginBottom: 16,
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  marca: {
    fontSize: 16,
    color: '#555',
  },
  distance: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: '500',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    width: '60%',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '90%',
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  modalGrid: {
    gap: 12,
  },
  modalItem: {
    width: 140,
    height: 140,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
});
