import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useContractRead } from "wagmi";
import ABI from "../lib/ConnectionProfileABI.json";
import { useAlchemyProvider } from "../hooks/useAlchemyProvider";
import { ConnectionProfile, chain } from "../config/client";
import { createPublicClient, encodeFunctionData, http } from "viem";

interface Profile {
  id: number;
  profilePicture: string;
  name: string;
  email: string;
  age: number;
  city: string;
  country: string;
  gender: string;
  bio: string;
  purpose: string;
}

const ProfileScreen: React.FC = () => {
  const [userProfile, setUserProfile] = useState<Profile>({
    id: 1,
    profilePicture: "https://placekitten.com/150/150",
    name: "John Doe",
    email: "john.doe@example.com",
    age: 12,
    bio: "",
    city: "",
    country: "",
    gender: "Male",
    purpose: "",
  });

  const { provider, sendSponsoredUserOperation } = useAlchemyProvider();

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfilePicture, setEditedProfilePicture] = useState(
    userProfile.profilePicture
  );
  const [editedName, setEditedName] = useState(userProfile.name);
  const [editedEmail, setEditedEmail] = useState(userProfile.email);

  const handleAddToWallet = () => {
    // Handle logic for adding USDC to wallet
    // For now, let's just log a message
    console.log("USDC added to wallet!");
  };

  const { data, isError, isLoading } = useContractRead({
    address: "0x8dEb80c6E770333A819E792e844bcCD02b3DAdc8",
    abi: ABI,
    functionName: "getUserById",
    args: ["0x87fd69cd543592ebf27258ade38c35f0f6ce3a8c"],
  });

  if (data) {
    fetch(`https://ipfs.io/ipfs/${data.cid}`).then((result) => {
      result.json().then((profile) => {
        console.log("this is user profile", profile);
        setUserProfile({
          ...userProfile,
          name: profile.firstname,
          profilePicture: profile.avatarCid,
          age: profile.age,
          bio: profile.bio,
          city: profile.city,
          gender: profile.gender,
          purpose: profile.purpose,
          country: profile.country,
        });
        // console.log(`https://ipfs.io/ipfs/${profile.avatarCid}`);
      });
    });
  }

  return (
    <View style={styles.container}>
      {/* Top Box with BALANCE and REWARDS */}
      <View style={styles.topBox}>
        <View style={styles.column}>
          <Text style={styles.columnTitle}>BALANCE</Text>
          <Text style={styles.columnValue}>32</Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.column}>
          <Text style={styles.columnTitle}>REWARDS</Text>
          <Text style={styles.columnValue}>45</Text>
        </View>
      </View>

      {/* Button to Add USDC to Wallet */}
      <TouchableOpacity
        style={styles.addToWalletButton}
        onPress={handleAddToWallet}
      >
        <Text style={styles.buttonText}>Add USDC to Wallet</Text>
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: userProfile.profilePicture
              ? userProfile.profilePicture
              : editedProfilePicture,
          }}
          style={styles.profilePicture}
        />
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>{userProfile.name}</Text>
        <Text style={styles.userEmail}>{userProfile.email}</Text>
        <Text style={styles.userName}>{userProfile.bio}</Text>
        <Text style={styles.userEmail}>{userProfile.purpose}</Text>
        <Text style={styles.userEmail}>{userProfile.gender}</Text>
        <Text style={styles.userEmail}>{userProfile.city}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgb(73,25,87)",
  },
  topBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgb(233,181,251)",
    padding: 10,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
    zIndex: 1,
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  line: {
    width: 1,
    height: "100%",
    backgroundColor: "#fff",
  },
  columnTitle: {
    fontSize: 18,
    color: "#fff",
  },
  columnValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  addToWalletButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 50,
    marginTop: 10,
  },
  profileContainer: {
    alignItems: "center",
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  userInfoContainer: {
    alignItems: "center",
  },
  userName: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  userEmail: {
    fontSize: 24,
    color: "#fff",
  },
  editContainer: {
    marginTop: 20,
    width: "80%",
  },
  editInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProfileScreen;
