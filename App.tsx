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

import { WagmiConfig, createConfig } from "wagmi";
import { createPublicClient, http } from "viem";
import { chain } from "./config/client";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: chain,
    transport: http(),
  }),
});

function App(): JSX.Element {
  const { magic } = useMagicSigner();
  return (
    <WagmiConfig config={config}>
      <SafeAreaProvider>
        <magic.Relayer />
        <Navigation />
      </SafeAreaProvider>
    </WagmiConfig>
  );
}

export default App;
