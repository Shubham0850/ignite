import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

interface Profile {
  id: number;
  profilePicture: string;
  name: string;
  age: number;
  description: string;
}

const Explore: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState<number>(0);

  // Fetch and set profiles when the component mounts
  useEffect(() => {
    // Dummy data for illustration purposes
    const dummyProfiles: Profile[] = [
      {
        id: 1,
        profilePicture: "https://placekitten.com/150/150",
        name: "John Doe",
        age: 25,
        description: "I love hiking and exploring new places.",
      },
      {
        id: 2,
        profilePicture: "https://placekitten.com/151/151",
        name: "Jane Smith",
        age: 28,
        description: "Passionate about photography and art.",
      },
      // Add more dummy profiles as needed
    ];

    setProfiles(dummyProfiles);
  }, []);

  // Function to handle swiping right on a profile
  const handleStackMoney = () => {
    console.log(
      `STACK money - Liked profile with ID ${profiles[currentProfileIndex].id}`
    );
    setCurrentProfileIndex(currentProfileIndex + 1);
  };

  // Function to handle swiping left on a profile
  const handleNotForMe = () => {
    console.log(
      `Not for me - Skipped profile with ID ${profiles[currentProfileIndex].id}`
    );
    setCurrentProfileIndex(currentProfileIndex + 1);
  };

  if (profiles.length === 0) {
    return <Text>Loading...</Text>;
  }

  const currentProfile: Profile = profiles[currentProfileIndex];

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={{ uri: currentProfile.profilePicture }}
          style={styles.profilePicture}
        />

        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>
            Hi,{"\n"}
            {currentProfile.name}
          </Text>
          <Text style={styles.userAge}>{currentProfile.age} years old</Text>
          <Text style={styles.userDescription}>
            {currentProfile.description}
          </Text>
          <Text style={styles.userAge}>{currentProfile.age} years old</Text>
          <Text style={styles.userDescription}>
            {currentProfile.description}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.stackMoneyButton}
            onPress={handleStackMoney}
          >
            <Text style={styles.buttonText}>STACK MONEY</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notForMeButton}
            onPress={handleNotForMe}
          >
            <Text style={styles.buttonText}>NOT FOR ME</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(29,26,28)", // Set background color
    padding: 10,
  },
  profilePicture: {
    width: 275,
    height: 275,
    borderRadius: 200,
    marginBottom: 20,
    position: "relative",
  },
  userInfoContainer: {
    // alignItems: "center",
  },
  userName: {
    marginTop: -30,
    fontSize: 50,
    fontWeight: "bold",
    color: "rgb(233,181,251)",
  },
  userAge: {
    fontSize: 25,
    color: "rgb(219,213,219)",
    marginBottom: 10,
    marginTop: 10,
  },
  userDescription: {
    // textAlign: "center",
    color: "rgb(219,213,219)",
    // paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 28,
  },
  buttonContainer: {
    // flexDirection: "row",
    marginTop: 10,
    width: "100%",
  },
  stackMoneyButton: {
    backgroundColor: "rgb(233,181,251)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    // borderRadius: 5,
  },
  notForMeButton: {
    backgroundColor: "rgb(201,201,201)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    // borderRadius: 5,
    color: "rgb(150,151,150)",
    marginTop: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Explore;
