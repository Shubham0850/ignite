import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

interface Profile {
  id: number;
  profilePicture: string;
  name: string;
  email: string;
}

const ProfileScreen: React.FC = () => {
  const [userProfile, setUserProfile] = useState<Profile>({
    id: 1,
    profilePicture: "https://placekitten.com/150/150",
    name: "John Doe",
    email: "john.doe@example.com",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfilePicture, setEditedProfilePicture] = useState(
    userProfile.profilePicture
  );
  const [editedName, setEditedName] = useState(userProfile.name);
  const [editedEmail, setEditedEmail] = useState(userProfile.email);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveEdits = () => {
    // Save the edited profile information
    setUserProfile({
      ...userProfile,
      profilePicture: editedProfilePicture,
      name: editedName,
      email: editedEmail,
    });

    // Exit edit mode
    setIsEditing(false);
  };

  const handleCancelEdits = () => {
    // Reset the edited values and exit edit mode
    setEditedProfilePicture(userProfile.profilePicture);
    setEditedName(userProfile.name);
    setEditedEmail(userProfile.email);
    setIsEditing(false);
  };

  const handleAddToWallet = () => {
    // Handle logic for adding USDC to wallet
    // For now, let's just log a message
    console.log("USDC added to wallet!");
  };

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
        <TouchableOpacity onPress={handleEditProfile} disabled={isEditing}>
          <Image
            source={{ uri: editedProfilePicture }}
            style={styles.profilePicture}
          />
        </TouchableOpacity>
        {isEditing && (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.editInput}
              value={editedProfilePicture}
              onChangeText={setEditedProfilePicture}
              placeholder="Edit Profile Picture URL"
            />
          </View>
        )}
      </View>

      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editedName}
            onChangeText={setEditedName}
            placeholder="Edit Name"
          />
          <TextInput
            style={styles.editInput}
            value={editedEmail}
            onChangeText={setEditedEmail}
            placeholder="Edit Email"
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdits}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelEdits}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{userProfile.name}</Text>
          <Text style={styles.userEmail}>{userProfile.email}</Text>
        </View>
      )}
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
