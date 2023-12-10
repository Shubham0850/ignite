import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigation";
import LoginScreen from "../screens/LoginScreen"; // Import your LoginScreen component
import { RootStackParamList } from "../types/navigation";
import Loader from "../screens/Loader";
import UserDetails1 from "../screens/UserDetails1";
import UserDetails2 from "../screens/UserDetails2";
import UserDetails3 from "../screens/UserDetails3";
import ChatUI from "../screens/Chat";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
      }}
      initialRouteName={"Loader"}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          animation: "default",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          animation: "default",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Loader"
        component={Loader}
        options={{
          headerShown: false,
          animation: "default",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="UserDetails1"
        component={UserDetails1}
        options={{
          headerShown: false,
          animation: "default",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="UserDetails2"
        component={UserDetails2}
        options={{
          headerShown: false,
          animation: "default",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="UserDetails3"
        component={UserDetails3}
        options={{
          headerShown: false,
          animation: "default",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatUI}
        options={{
          headerShown: false,
          animation: "default",
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
