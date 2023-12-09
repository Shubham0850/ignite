import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Back from '../../assets/icons/back';
import Menu from '../../assets/icons/menu';
import User from '../../assets/icons/user';
import { useNavigation } from '@react-navigation/native';

const TopBar = ({ }) => {
	const navigation = useNavigation()
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigation.navigate("Message")}>
				<Back width={25} height={25} />
			</TouchableOpacity>
			<Image
				source={require("../../assets/images/profile.png")}
				style={styles.avatar}
			/>
			<Text style={styles.title}>Rishi</Text>
			<TouchableOpacity>
				<Menu width={25} height={25} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 10,
		backgroundColor: 'white', 
		borderBottomColor: "#ededed",
		borderBottomWidth: 1,
	},
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20, 
		borderColor: 'purple', 
		borderWidth: 2,
		marginLeft: 10,
		justifyContent: 'center',
		alignItems: "center"
	},
	title: {
		flex: 1,
		marginLeft: 10,
		fontWeight: 'bold',
		fontSize: 18,
	},
	// ... other styles you may need
});

export default TopBar;
