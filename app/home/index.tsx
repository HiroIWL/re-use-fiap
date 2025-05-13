import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const Page = () => {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>
        Troque o que não usa pelo que precisa conecte-se, renove e reutilize
      </Text>

      <Image
        source={require("@/assets/images/trade.png")}
        style={styles.image}
      />

      <Text style={styles.text}>
        Dê uma nova vida aos seus objetos parados e troque por algo útil para
        você. Na Re.use, acreditamos que sustentabilidade e economia podem andar
        juntas.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/register");
        }}
      >
        <Text style={styles.text}>Criar conta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: "transparent",
        }}
        onPress={() => {
          router.push("/login");
        }}
      >
        <Text style={styles.text}>Já tenho uma conta</Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#210838",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    padding: 12,
    gap: 8,
  },

  title: {
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 32,
    color: "#fff",
    textAlign: "center",
  },

  text: {
    fontWeight: "500",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#8700FF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },

  image: {
    width: "100%",
    aspectRatio: 1.5,
    resizeMode: "contain",
    marginBottom: 32,
  },
});

export default Page;
