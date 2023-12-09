import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { RootStackScreenProps } from "../types/navigation";
import { useMagicSigner } from "../hooks/useMagicSigner";

const LoginScreen = ({ navigation }: RootStackScreenProps<"Login">) => {
  const { magic } = useMagicSigner();
  const handleGetStarted = async () => {
   try {
    const accounts = await magic.wallet.connectWithUI();
    console.log("this is accounts", accounts);
    magic.wallet.connectWithUI().on("done", (params: any) => {
      const {} = params;
      // console.log(idToken, 'token created');
      navigation.navigate("Root");
      // send to your resource server for validation
      // ...
    });
   } catch (error) {
    console.log('heres the error: ', error);
    
   }

    // navigation.navigate('Root');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/pattern.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.blackBackground}></View>
        <View style={styles.middleContainer}>
          <View style={styles.flexColumn}>
            <Text style={styles.title}>Ignite</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },
  blackBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    zIndex: 0.5,
  },
  middleContainer: {
    flex: 1,
    alignItems: "center",
    zIndex: 1,
  },
  flexColumn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 40,
    width: "80%",
    alignItems: "center",
    zIndex: 1,
    marginBottom: 50,
  },
  buttonText: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default LoginScreen;
