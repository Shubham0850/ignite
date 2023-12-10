import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../types/navigation/index";
import React from "react";
import explore from "../screens/Explore";
import Profile from "../screens/Profile";
// import settings from "../screens/Settings";
import CustomTabBar from "../components/bottombar";
import Explore from "../assets/icons/explore";
import Settings from "../assets/icons/settings";
import ChatUI from "../screens/Chat";
import ChatIcon from "../assets/icons/chat";
import Messages from "../screens/Messages";


const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <BottomTab.Screen
        name="Explore"
        component={explore}
        options={{
          tabBarLabel: "Explore",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Explore height={24} width={24} color={color} />
          ), // Specify the icon for this taba
        }}
      />
      <BottomTab.Screen
        name="Message"
        component={Messages}
        options={{
          headerShown: false,
          tabBarLabel: "Message",
          tabBarIcon: ({ color }) => (
            <ChatIcon height={24} width={24} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Settings height={24} width={24} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
