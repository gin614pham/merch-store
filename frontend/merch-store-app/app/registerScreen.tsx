import { register } from "@/api/auth";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";

const registerScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async () => {
    try {
      const response = await register(name, email, password);

      if (response.status === 201) {
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
        <Text variant="headlineMedium">Register</Text>
      </View>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        autoComplete="off"
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        autoComplete="off"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        autoComplete="off"
      />
      <Button mode="contained" onPress={handleRegister}>
        Register
      </Button>
      <View style={styles.linkContainer}>
        <Text>
          Have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => {
              router.push("/");
            }}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default registerScreen;

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
