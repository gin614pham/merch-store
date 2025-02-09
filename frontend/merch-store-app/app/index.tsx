import { router } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { login } from "@/api/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login(email, password);

      if (response.status === 200) {
        const token = response.data.token;
        console.log(token);
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="headlineMedium">Login</Text>
      </View>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
      <View style={styles.linkContainer}>
        <Text>
          Don't have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => router.push("/registerScreen")}
          >
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
    gap: 10,
    flexDirection: "column",
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
  },
  input: {
    marginBottom: 10,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: "blue",
  },
});
