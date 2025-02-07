import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="registerScreen" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="add"
        options={{
          headerTitle: "Add Merch",
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          headerTitle: "Edit Merch",
        }}
      />
    </Stack>
  );
}
