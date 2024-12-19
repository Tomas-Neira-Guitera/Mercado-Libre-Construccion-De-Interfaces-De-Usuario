import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from 'react-native';

export const Header = ({ title }) => {
	return (
		<SafeAreaView style = {styles.safeArea}>
			<View style={styles.headerContainer}>
				<Text style={styles.headerText}>{title}</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
	  backgroundColor: '#FFE600', 
	  height: 60,
	  shadowColor: '#000',
	  shadowOffset: { width: 0, height: 2 },
	  shadowOpacity: 0.25,
	  shadowRadius: 3.84,
	  elevation: 5,
	},
	headerContainer: {
	  height:60, 
	  backgroundColor: '#FFE600',
	  justifyContent: 'flex-end',
	  paddingHorizontal: 16,
	  paddingBottom: 10,
	  shadowColor: '#000',
	  shadowOffset: { width: 0, height: 2 },
	  shadowOpacity: 0.15,
	  shadowRadius: 0.84,
	  elevation: 5,
	},
	headerText: {
		fontSize: 24,
		fontWeight: 'light',
		color: '#000',
	  },
	});
