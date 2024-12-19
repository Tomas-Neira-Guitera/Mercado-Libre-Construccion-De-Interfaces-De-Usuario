import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import SmallCard from "../../../components/shared/smallCard";
import { router, useNavigation } from "expo-router";;

import { AuthContext } from "../../../context/AuthContext";
const Profile = () => {
	const {handleRemoveUser,user} = useContext(AuthContext);
	const navigation = useNavigation();

	useEffect(()  => {
        if(user){
            navigation.setOptions({ title: user.name });
        }
    },[user]);

	const handleLogOut = async () => {
		handleRemoveUser();
	};
	
	const listPath = "product/userCategory";



	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.optionsContainer}>
				<SmallCard
				title="Liked"
				onPress={() => router.navigate(`${listPath}/likedProducts`) }/>
				<SmallCard
				title="Sales"
				onPress={() => router.navigate(`${listPath}/salesHistory`) }/> //aca
				<SmallCard
				title="Purchases"
				onPress={() => router.navigate(`${listPath}/purchaseHistory`) }/> //aca
				<SmallCard
				title="My products"
				onPress={() => router.navigate(`${listPath}/products`) }/>
			</View>
			<TouchableOpacity style={styles.logoutButton} onPress={handleLogOut}>
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

export default Profile;