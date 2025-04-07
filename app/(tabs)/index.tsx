import { Animated, Dimensions, Image, PanResponder, StyleSheet, Text, TouchableOpacity, View, Modal, FlatList, Touchable, Pressable } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { useRef, useState } from 'react';
import { Header } from '@/components/ui/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';


const items = [
  { id: 1, color: '#FFC1C1', name: 'Cachorro', breed: 'SRD', distance: 'A 5km de você!' },
  { id: 2, color: '#C1E1FF', name: 'Gato', breed: 'Persa', distance: 'A 3km de você!' },
  { id: 3, color: '#D1FFC1', name: 'Coelho', breed: 'Mini Lop', distance: 'A 8km de você!' },
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

  const SCREEN_WIDTH = Dimensions.get('window').width;

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

  const pet = items[currentIndex];




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header />
      <ThemedView
        style={styles.container}
      >
        <Animated.View
          style={[
            styles.card,
            { backgroundColor: pet.color },
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
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{pet.name}</Text>
            <Text style={styles.breed}>{pet.breed}</Text>
            <Text style={styles.distance}>{pet.distance}</Text>
          </View>
        </Animated.View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#FF5069' }]} onPress={goToNext}>
            <Image style={styles.buttonImage} source={require('@/assets/images/X.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { width: 75, height: 75, borderRadius: '50%', backgroundColor: '#426CD4' }]} onPress={() => setShowModal(true)}>
            <Image style={[styles.buttonImage, { width: 24, height: 24 }]} source={require('@/assets/images/likes.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#00920A' }]} onPress={goToNext}>
            <Image style={[styles.buttonImage]} source={require('@/assets/images/check-green.png')} />
          </TouchableOpacity>
        </View>

        <Modal animationType="slide" visible={showModal} transparent={true}>
          <Pressable style={styles.modalOverlay}
            onPress={() => setShowModal(false)}
          >
            <Pressable style={styles.modalContainer} onPress={() => { }}>
              <Text style={styles.modalTitle}>Qual produto você deseja propor para a troca?</Text>
              <FlatList
                data={mockProductImages}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalItem}>
                    <Image source={item} style={styles.modalImage} />
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.modalGrid}
              />
              <Button
                text='Enviar proposta'
                type='primary'
                onPress={() => setShowModal(false)}
              />
            </Pressable>
          </Pressable>
        </Modal>
      </ThemedView >
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  container: {
    gap: 8,
    marginBottom: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

  card: {
    width: '100%',
    height: '65%',
    borderRadius: 20,
    justifyContent: 'flex-end',
    padding: 16,
    elevation: 5,
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  breed: {
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
    objectFit: 'contain',
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
    resizeMode: 'cover',
  },
  sendButton: {
    marginTop: 16,
    backgroundColor: '#7400FF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

});
