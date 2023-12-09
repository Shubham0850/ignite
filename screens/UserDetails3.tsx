import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

interface LocationData {
  country: string;
  city: string;
}

const UserDetails3: React.FC = () => {
  const navigation = useNavigation();
  const [locationData, setLocationData] = useState<LocationData>({
    country: "",
    city: "",
  });

  const handleInputChange = (key: keyof LocationData, value: string) => {
    setLocationData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSave = () => {
    // Handle the submission of location data
    console.log("Location data:", locationData);
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
        value={locationData.country}
        onChangeText={(text) => handleInputChange("country", text)}
      />

      <Text style={styles.label}>Enter your city</Text>
      <TextInput
        style={styles.input}
        placeholder="City"
        placeholderTextColor="rgb(141,117,149)"
        value={locationData.city}
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
