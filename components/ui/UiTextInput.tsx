import { StyleSheet, Text, TextInput, View } from "react-native"

type UiTextInputProps = {
    placeholder: string;
    label: string;
    value?: string;
    onChangeText?: (text: string) => void;
}

export const UiTextInput = ({ placeholder, label, value, onChangeText }: UiTextInputProps) => {

    return (
        <View style={{ width: "100%", gap: 8 }}>
            <Text style={styles.title}>{label}</Text>
            <TextInput
                style={styles.loginInput}
                placeholder={placeholder}
                placeholderTextColor={"#A0A0A0"}
                value={value}
                onChangeText={onChangeText}                
            ></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    loginInput: {
        width: "100%",
        height: 48,
        borderRadius: 8,
        padding: 16,
        fontFamily: "sans-serif",
        fontSize: 14,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#E5E5E5",
    },

    title: {
        fontFamily: 'SpaceMono',
        fontSize: 16,
        fontWeight: 'semibold',
    }
})