import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
}

const UserDetails1: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
  });
  const navigation = useNavigation();

  const handleInputChange = (key: keyof ProfileData, value: string) => {
    setProfileData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleNext = () => {
    // Add validation logic if needed
    console.log("Profile created:", profileData);
    // Navigate to the next screen or perform other actions
    navigation.navigate("UserDetails2");
  };

  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.label}>Tell me your name</Text>
        <View style={styles.nameInputContainer}>
          <TextInput
            style={styles.nameInput}
            placeholder="First Name"
            placeholderTextColor="rgb(141,117,149)"
            value={profileData.firstName}
            onChangeText={(text) => handleInputChange("firstName", text)}
          />
          <TextInput
            style={styles.nameInput}
            placeholder="Last Name"
            placeholderTextColor="rgb(141,117,149)"
            value={profileData.lastName}
            onChangeText={(text) => handleInputChange("lastName", text)}
          />
        </View>
      </View>

      <Text style={styles.label}>Enter your email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="rgb(141,117,149)"
        value={profileData.email}
        onChangeText={(text) => handleInputChange("email", text)}
        keyboardType="email-address"
      />

      <Text style={styles.label}>How old are you?</Text>
      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="rgb(141,117,149)"
        value={profileData.age}
        onChangeText={(text) => handleInputChange("age", text)}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.nextButtonContainer} onPress={handleNext}>
        <Text style={{ color: "rgb(135,106,142)" }}>Next</Text>
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
  nameContainer: {
    marginBottom: 40,
    marginTop: -80,
  },
  nameInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameInput: {
    flex: 1,
    height: 42,
    borderColor: "gray",
    borderWidth: 0,
    borderRadius: 12,
    paddingLeft: 10,
    backgroundColor: "rgb(96,52,108)",
    margin: 5,
    color: "white",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0,
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

export default UserDetails1;
