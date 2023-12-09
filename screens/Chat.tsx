import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import User from '../assets/icons/user';
import Send from '../assets/icons/send';
import TopBar from '../components/Chat/TopBar';
import { useMagicSigner } from '../hooks/useMagicSigner';

const ChatUI = () => {
	const [message, setMessage] = useState('');
	const { signer } = useMagicSigner();

	// Placeholder for messages list and send function
	const messages = [{ text: "Hey i'm there how are you ?", me: true }, { text: "I'm doing good how about you ?", me: false }];

	const sendMessage = () => {
		// Logic to send message
		
	};

	// Render each message item
	const renderMessageItem = ({ item }) => (
		<View style={[
			styles.messageRow,
			item.me ? styles.rowReverse : styles.rowNormal
		]}>
			<User width={25} height={25} />

			<View style={[
				styles.messageBubble,
				item.me ? styles.senderMessage : styles.receiverMessage
			]}>
				<Text style={[
					styles.messageText,
					item.me ? styles.senderText : styles.receiverText
				]}>
					{item.text}
				</Text>
			</View>
		</View>
	);

	return (
		<View style={{ flex: 1 }}>
			<TopBar />
			<View style={styles.container}>

				<FlatList
					data={messages}
					renderItem={renderMessageItem}
					keyExtractor={(item, index) => index.toString()}
				/>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						value={message}
						onChangeText={setMessage}
						placeholder="Send a message"
					/>
					<TouchableOpacity onPress={sendMessage}>
						<Send width={25} height={25} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
	},
	input: {
		flex: 1,
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 20,
		padding: 10,
		marginRight: 10,
		backgroundColor: '#f0f0f0',
	},
	senderMessage: {
		padding: 10,
		backgroundColor: '#dbf4ff',
		alignSelf: 'flex-end',
		borderRadius: 20,
		margin: 5,
	},
	receiverMessage: {
		padding: 10,
		backgroundColor: '#f0f0f0',
		alignSelf: 'flex-start',
		borderRadius: 20,
		margin: 5,
	},
	messageText: {
		color: 'black',
	},
	messageBubble: {
		padding: 10,
		borderRadius: 20,
		margin: 5,
		maxWidth: '80%', // To ensure the bubble doesn't stretch full width
	},
	senderText: {
		textAlign: 'right',
	},
	receiverText: {
		textAlign: 'left',
	},
	messageRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 4,

	},
	rowReverse: {
		flexDirection: 'row-reverse',
	},
	icon: {
		width: 40,
		height: 40,
		tintColor: "#000",
		borderColor: "#000",
		borderRadius: 25,
	},
	iconRight: {
		marginLeft: 2,
		marginRight: 5,
	},
	iconLeft: {
		marginLeft: 5,
		marginRight: 2,
	},
	rowNormal: {},

});

export default ChatUI;
