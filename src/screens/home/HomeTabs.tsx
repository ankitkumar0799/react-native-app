// src/screens/home/HomeTabs.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

function Dummy() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Placeholder</Text>
    </View>
  );
}

export default function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-variant" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={Dummy}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="dots-horizontal" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
