/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import type { PropsWithChildren } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import Navigation from "./navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useMagicSigner } from "./hooks/useMagicSigner";

function App(): JSX.Element {
  const { magic } = useMagicSigner();
  return (
    <SafeAreaProvider>
      <magic.Relayer />
      <Navigation />
    </SafeAreaProvider>
  );
}

export default App;
