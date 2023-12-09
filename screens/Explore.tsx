import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { RootStackScreenProps, RootTabScreenProps } from "../types/navigation";

const Explore = ({ navigation }: RootTabScreenProps<"Explore">) => {
  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={() => navigation.navigate("Onramp")}>
        <Text style={styles.button}>Open On ramp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flex : 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    color: "black",
  },
});
