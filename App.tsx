import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/auth/LoginScreen";
import OtpScreen from "./src/screens/auth/OtpScreen"; // we'll create next
import HomeScreen from "./src/screens/home/HomeScreen";
import { AuthProvider } from "./lib/authProvider";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 👇 Ye tumhara first screen hoga */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />

        {/* 👇 Ye next screen OTP verification ke liye */}
        <Stack.Screen name="OtpScreen" component={OtpScreen} />

        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
