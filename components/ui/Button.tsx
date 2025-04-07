import { StyleSheet, TouchableOpacity, Text } from "react-native"


type ButtonProps = {
    type: "primary" | "text"
    text?: string,
    onPress?: () => void
}
export const Button = ({ type, text, onPress }: ButtonProps) => {
    return type === "primary" ? (
        <TouchableOpacity
            onPress={() => onPress && onPress()}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>{text}</Text>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity
            onPress={() => onPress && onPress()}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
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
    },

    text: {
        fontFamily: 'SpaceMono',
        fontSize: 16,
        fontWeight: 'semibold',
    },
})