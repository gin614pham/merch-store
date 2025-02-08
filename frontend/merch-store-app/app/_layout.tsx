import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="registerScreen" />
      <Stack.Screen name="home" />
      <Stack.Screen
        name="add"
        options={{
          headerTitle: "Add Merch",
          headerShown: true,
        }}
      />
      <Stack.Screen name="edit" />
    </Stack>
  );
}
