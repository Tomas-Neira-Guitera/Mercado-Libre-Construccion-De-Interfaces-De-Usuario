import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import SmallCard from "../components/shared/smallCard";

export default function Profile({navigation}) {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.optionsContainer}>
				<SmallCard
				title="Liked"/> 
				<SmallCard
				title="Sales"/>
				<SmallCard
				title="Purchases"/>
				<SmallCard
				title="My products"/>
			</View>
			<TouchableOpacity style={styles.logoutButton}>
				<Text style={styles.logoutText}>Logout</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f0f0f0",
		justifyContent: "space-between", 
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	optionsContainer: {
		width: "100%",
		paddingTop : 30,
	},
	logoutButton: {
		backgroundColor: "#3483FA",
		paddingVertical: 12,
		borderRadius: 8,
		width: "100%",
		alignItems: "center",
	},
	logoutText: {
		color: "white",
		fontSize: 16,
	},
});