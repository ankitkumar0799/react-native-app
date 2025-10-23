import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../../lib/authProvider";
import LoginScreen from "../screens/auth/LoginScreen";
import OtpScreen from "../screens/auth/OtpScreen";
import HomeScreen from "../screens/home/HomeScreen";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0066FF" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // ✅ User logged in
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      ) : (
        // 🚪 User not logged in
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
