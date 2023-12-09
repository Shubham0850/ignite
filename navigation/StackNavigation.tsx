import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigation";
import LoginScreen from "../screens/LoginScreen"; // Import your LoginScreen component
import { RootStackParamList } from "../types/navigation";
import Loader from "../screens/Loader";
import { OnrampScreen } from "../screens/OnRamp";

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
        name="Onramp"
        component={OnrampScreen}
        options={{
          headerShown: false,
          animation: "default",
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
