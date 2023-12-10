import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const chats = [
	{ name: "Rishi", message: "Ah okay! Tell me what you think about...", avatar: require('../assets/images/profile.png') },
	{ name: "Shreyas", message: "It has been a fun day so far. I would like...", avatar: require('../assets/images/profile.png') },
	{ name: "Akash", message: "Ah okay! Tell me what you think about...", avatar: require('../assets/images/profile.png') },
];

const ChatItem = ({ name, message, avatar, navigation }: any) => (
	<Pressable onPress={() => navigation.navigate('Chat')}>
		<View style={styles.chatItem}>
			<Image source={avatar} style={styles.avatar} />
			<View style={styles.textContainer}>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.message}>{message}</Text>
			</View>
		</View>
	</Pressable>
);

const Messages = () => {
	const navigation = useNavigation()
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Chats (3/3)</Text>
			<Text style={styles.subheader}>Unmatch to meet new people</Text>
			<FlatList
				data={chats}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => <ChatItem {...item} navigation={navigation} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		fontSize: 20,
		fontWeight: 'bold',
		padding: 10,
	},
	subheader: {
		fontSize: 14,
		color: 'grey',
		paddingLeft: 10,
		paddingBottom: 5,
	},
	chatItem: {
		flexDirection: 'row',
		padding: 10,
		alignItems: 'center',
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25,
		marginRight: 10,
	},
	textContainer: {
		justifyContent: 'center',
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	message: {
		fontSize: 14,
		color: 'grey',
	},
});

export default Messages;
