import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../types/navigation/index";
import React from "react";
import explore from "../screens/Explore";
import settings from "../screens/Settings";
import CustomTabBar from "../components/bottombar";
import Explore from "../assets/icons/explore";
import Settings from "../assets/icons/settings";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <BottomTab.Screen
        name="Explore"
        component={explore}
        options={{
          tabBarLabel: "Wallet",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Explore height={24} width={24} color={color} />
          ), // Specify the icon for this taba
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={settings}
        options={{
          headerShown: false,
          tabBarLabel: "Wallet",
          tabBarIcon: ({ color }) => (
            <Settings height={24} width={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
