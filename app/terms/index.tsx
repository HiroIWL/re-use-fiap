import { ThemedView } from "@/components/ThemedView"
import { Button } from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View, Image } from "react-native"

export default function TermsScreen() {
    const dicas = [
        'Cadastre produtos em bom estado, isso podete ajudar a encontrar as melhores trocas.',
        'Especifique marca, modelo e material do produto.',
        'Informe tamanho/dimensões caso relevante (roupas, móveis, eletrônicos etc.).',
        'Informe sua cidade/bairro (caso o app tenha essa funcionalidade) para facilitar a logística da troca.'
    ]
    const router = useRouter();
    return (
        <ThemedView style={styles.container}>
            <View style={{ justifyContent: "center", alignItems: "center", gap: 4 }}>
                <View style={styles.rowContainer}>
                    <Text style={styles.title}>Bem-vindo(a) ao</Text>
                    <Image source={require("@/assets/images/logoMini.png")} style={styles.logo} />
                </View>
                <Text style={styles.subtitle}>Concorde com nossas dicas</Text>
            </View>
            <View style={{ gap: 8, alignItems: 'flex-start', justifyContent: 'flex-start', }}>
                {
                    dicas.map((dica, index) => (
                        <Dica key={index} dica={dica} />
                    ))
                }
            </View>
            <Button onPress={() => {
                router.navigate('/location');
            }} type="primary" text="Eu Concordo" />
            <Button onPress={() => {
                router.navigate('/home');
            }} type="text" text="Não Concordo" />

        </ThemedView>
    )
}

interface DicaProps {
    dica: string;
}

const Dica = ({ dica }: DicaProps) => {
    return (
        <View style={[styles.rowContainer, { gap: 8 }]}>
            <Image
                style={{ width: 16, height: 16 }}
                source={require("@/assets/images/check-line.png")}
            ></Image>
            <Text style={styles.subtitle}>{dica}</Text>
        </View>
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
    },

    rowContainer: {
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        width: "100%",
    },

    logo: {
        width: 113,
        height: 36,
        objectFit: "contain",
    },

    tipText: {
        flex: 1,
        fontSize: 14,
        fontFamily: "sans-serif",
        marginLeft: 10,
    }
})