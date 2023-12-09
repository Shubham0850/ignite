import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import ImagePicker from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";

interface AdditionalDetails {
  profilePicture: string | null;
  description: string;
  designation: string;
}

const UserDetails2: React.FC = () => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [additionalDetails, setAdditionalDetails] = useState<AdditionalDetails>(
    {
      profilePicture: null,
      description: "",
      designation: "",
    }
  );

  const handleInputChange = (key: keyof AdditionalDetails, value: string) => {
    setAdditionalDetails((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleChooseImage = () => {
    ImagePicker.showImagePicker(
      {
        title: "Select Image",
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else if (response.uri) {
          setImageUri(response.uri);
        }
      }
    );
  };

  const handleNext = () => {
    // Handle the submission of additional details
    console.log("Additional details:", additionalDetails);
    // You can perform additional actions or navigate to the next screen
    navigation.navigate("UserDetails3");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChooseImage}>
        {additionalDetails.profilePicture ? (
          <Image
            source={{ uri: additionalDetails.profilePicture }}
            style={styles.profilePicture}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.label}>Choose Profile Picture</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Enter a description about yourself</Text>
      <TextInput
        style={styles.inputForDescription}
        placeholder="Description"
        placeholderTextColor="rgb(141,117,149)"
        value={additionalDetails.description}
        onChangeText={(text) => handleInputChange("description", text)}
        multiline={true} // Allow multiline input
        numberOfLines={4} // Set the number of lines you want to show initially
      />

      <Text style={styles.label}>Enter your designation</Text>
      <TextInput
        style={styles.inputForDesignation}
        placeholder="Designation"
        placeholderTextColor="rgb(141,117,149)"
        value={additionalDetails.designation}
        onChangeText={(text) => handleInputChange("designation", text)}
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
  inputForDesignation: {
    height: 40, // Adjust the height as needed
    borderColor: "gray",
    borderWidth: 0,
    borderRadius: 12,
    paddingLeft: 10,
    backgroundColor: "rgb(96,52,108)",
    marginBottom: 30,
    color: "white",
    textAlignVertical: "top", // Set text alignment to top for multiline input
  },
  inputForDescription: {
    height: 80, // Adjust the height as needed
    borderColor: "gray",
    borderWidth: 0,
    borderRadius: 12,
    paddingLeft: 10,
    backgroundColor: "rgb(96,52,108)",
    marginBottom: 30,
    color: "white",
    textAlignVertical: "top", // Set text alignment to top for multiline input
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
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
  placeholderContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "rgba(96,52,108,0.7)", // Adjust the opacity as needed
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default UserDetails2;
