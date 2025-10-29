

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "./src/screens/auth/LoginScreen";
// import OtpScreen from "./src/screens/auth/OtpScreen";
// import HomeTabs from "./src/screens/home/HomeTabs";
// import { AuthProvider, useAuth } from "./lib/auth";

// const Stack = createNativeStackNavigator();

// function RootNav() {
//   const { loading, isAuthed } = useAuth();
//   if (loading) return null;

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {isAuthed ? (
//         <Stack.Screen name="HomeTabs" component={HomeTabs} />
//       ) : (
//         <>
//           <Stack.Screen name="LoginScreen" component={LoginScreen} />
//           <Stack.Screen name="OtpScreen" component={OtpScreen} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <RootNav />
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }









import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/auth/LoginScreen";
import OtpScreen from "./src/screens/auth/OtpScreen";
import HomeScreen from "./src/screens/home/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* 👇 Start with login screen */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
