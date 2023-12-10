import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IUserProfile, useStore } from "../store/userStore";
import uploadMetadataToIPFS from "../utils/uploadMetadataToIPFS";
import { ConnectionProfile } from "../config/client";
import { encodeFunctionData } from "viem";
import ABI from "../lib/ConnectionProfileABI.json";
import { useAlchemyProvider } from "../hooks/useAlchemyProvider";

const UserDetails3: React.FC = () => {
  const navigation = useNavigation();
  const { userProfile, setUserProfile } = useStore();
  const { sendSponsoredUserOperation, provider } = useAlchemyProvider();

  const handleInputChange = (key: keyof IUserProfile, value: string) => {
    setUserProfile(key, value);
  };

  const handleSave = async () => {
    // Handle the submission of location data
    console.log("Location data:", userProfile);
    const stringifiedProfile = JSON.stringify(userProfile);
    const cid = await uploadMetadataToIPFS(stringifiedProfile);

    const userOpHash = await sendSponsoredUserOperation({
      from: await provider.getAddress(),
      to: ConnectionProfile,
      data: encodeFunctionData({
        abi: ABI,
        functionName: "createUserProfile",
        args: [cid, userProfile.gender],
      }),
    });

    console.log("this is useroperation hash", userOpHash);

    const transactionHash = await provider.waitForUserOperationTransaction(
      userOpHash!
    );

    console.log("this is tx hash", transactionHash);

    // You can perform additional actions or navigate to the next screen
    navigation.navigate("Root");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your country</Text>
      <TextInput
        style={styles.input}
        placeholder="Country"
        placeholderTextColor="rgb(141,117,149)"
        value={userProfile.country}
        onChangeText={(text) => handleInputChange("country", text)}
      />

      <Text style={styles.label}>Enter your city</Text>
      <TextInput
        style={styles.input}
        placeholder="City"
        placeholderTextColor="rgb(141,117,149)"
        value={userProfile.city}
        onChangeText={(text) => handleInputChange("city", text)}
      />

      <TouchableOpacity style={styles.nextButtonContainer} onPress={handleSave}>
        <Text style={{ color: "rgb(135,106,142)" }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    backgroundColor: "rgb(73,25,87)",
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: "rgb(197,181,201)",
    zIndex: 2,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 10,
    backgroundColor: "rgb(96,52,108)",
    marginBottom: 30,
    color: "white",
  },
  nextButtonContainer: {
    position: "absolute",
    padding: 10,
    bottom: 30,
    right: 20,
    width: 100,
    backgroundColor: "rgb(233,180,250)",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UserDetails3;
