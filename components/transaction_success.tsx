import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const TransactionSuccessScreen: React.FC = () => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/checkmark.png")}
          style={styles.image}
        />
        <Text style={styles.text}>Wallet loaded succesfully!</Text>
      </View>
      <LottieView
        ref={animationRef}
        source={require("../assets/images/confetti.json")}
        autoPlay={true}
        loop={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default TransactionSuccessScreen;
