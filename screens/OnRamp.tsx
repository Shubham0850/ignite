import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
} from "react-native";
import TransactionSuccessScreen from "../components/transaction_success";
import { upiID } from "../secrets";

export const OnrampScreen: React.FC = () => {
  const [rupee, setRupee] = useState("");
  const [usdc, setUsdc] = useState("");
  const [showSuccessScreen, setSuccesScreen] = useState(false);

  const handleRupeeChange = (value: string) => {
    setRupee(value);

    // Convert rupee to usdc (assuming a fixed conversion rate of 1/88)
    const usdcValue = value
      ? (parseFloat(value) / 88).toFixed(2).toString()
      : "";
    setUsdc(usdcValue);
  };

  const handleUSDCChange = (value: string) => {
    setUsdc(value);

    // Convert rupee to usdc (assuming a fixed conversion rate of 1/88)
    const usdcValue = value
      ? (parseFloat(value) * 88).toFixed(2).toString()
      : "";
    setRupee(usdcValue);
  };

  const handleOpenDeepLink = async () => {
    const deepLink = `upi://pay?pa=${upiID}&pn=Connection+LLC&mc=1234&tr=123456789&tn=test+transaction+note&am=${rupee}&cu=INR&url=https%3A%2F%2Ftest.merchant.website`;
    const supported = await Linking.canOpenURL(deepLink);

    if (supported) {
      const done = await Linking.openURL(deepLink);
      setTimeout(() => {
        setSuccesScreen(true);
      }, 5000);
      console.log({ done });
    } else {
      console.error(`Deep linking is not supported for the URL: ${deepLink}`);
    }
  };

  return (
    <View style={styles.container}>
      {showSuccessScreen ? (
        <TransactionSuccessScreen />
      ) : (
        <>
          <Text style={styles.title}>Add money to your wallet</Text>
          <View style={styles.card}>
            <View style={styles.rowContainer}>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor="gray"
                keyboardType="numeric"
                value={rupee}
                onChangeText={handleRupeeChange}
              />
              <Text style={{ color: "black", fontSize: 32, paddingLeft: 6 }}>
                INR
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor="gray"
                keyboardType="numeric"
                value={usdc}
                onChangeText={handleUSDCChange}
              />
              <Image
                source={require("../assets/images/usdc.png")} // Provide the actual path to your INR image
                style={styles.currencyImage}
              />
            </View>

            <Text style={{ color: "black", fontSize: 14, marginTop: 60 }}>
              Your payments are safetly processed.
            </Text>
            <Text style={{ color: "black", fontSize: 14 }}>
              USDC will be loaded to your wallet.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleOpenDeepLink()}
            >
              <Text style={styles.buttonText}>Pay with UPI</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

// Define styles using StyleSheet
const styles = StyleSheet.create({
  currencyImage: {
    width: 35,
    height: 35,
    marginLeft: 10,
  },
  title: {
    fontSize: 46,
    fontWeight: "700",
    color: "white",
    marginHorizontal: 50,
    marginBottom: 100,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3D1961", // Deep purple background
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
    padding: 20,
    paddingTop: 60,
    width: "80%",
    alignItems: "center",
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    fontSize: 40,
    height: 70,
    width: "80%",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 30,
    textAlign: "left",
    color: "black",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#3D1961", // Deep purple button color
    borderRadius: 10,
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

// Export the component
export default OnrampScreen;
