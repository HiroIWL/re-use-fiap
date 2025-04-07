import { Image, StyleSheet, StatusBar, View } from 'react-native';
import { ThemedView } from '../ThemedView';

export const Header = () => {
    return (
        <ThemedView style={styles.container}>
            <Image source={(require('@/assets/images/logoMini.png'))} />
            <View style={styles.user}>
                <Image source={(require('@/assets/images/selfie.jpeg'))} style={styles.userImage}/>
            </View>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16,
    },

    user: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },

    userImage: {
        width: 34,
        height: 34,
        borderRadius: '50%',
    },
});