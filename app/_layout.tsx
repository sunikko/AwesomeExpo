import React from "react";
import { Stack } from "expo-router";
import LoginButton from "../compoments/LoginButton";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "black",
          },
          headerRight: LoginButton,
        }}
      />
      <Stack.Screen name="browser" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
        }}
      />
    </Stack>
  );
}
