// CustomTabBar.tsx

import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Colors from '../utils/color';

const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const totalTabs = state.routes.length;
  const tabWidth = 100 / totalTabs;

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const tabBarIcon = options.tabBarIcon;
        const label = options.tabBarLabel;

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={[
              styles.tab,
              {width: `${tabWidth}%`, borderRadius: index === 1 ? 20 : 0},
            ]}>
            {tabBarIcon &&
              tabBarIcon({
                focused: isFocused,
                color: isFocused ? Colors.background : Colors.background,
                size: 20,
              })}
            <Text
              style={{
                color: isFocused ? Colors.background : Colors.background,
                fontSize: 12,
                marginTop: 4,
              }}>{`${label}`}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 1)', // Semi-transparent background
    borderRadius: 20, // Rounded corners
  },
  tab: {
    flex: 1,
    color: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 65,
  },
});

export default CustomTabBar;
