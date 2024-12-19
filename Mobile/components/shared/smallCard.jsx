import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const SmallCard = ({ children, title, onPress }) => {
	return (
		<TouchableOpacity style={styles.optionButton} onPress={onPress}>
			<Text style={styles.optionText}>{title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	optionButton: {
		backgroundColor: "white",
		paddingVertical: 15,
		borderRadius: 10,
		marginBottom: 15,
		alignItems: "center",
		width: "100%",
	},
	optionText: {
		fontSize: 18,
		color: "#333",
	},
});

export default SmallCard;
