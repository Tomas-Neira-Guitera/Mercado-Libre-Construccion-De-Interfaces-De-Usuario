import React, { useContext, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./login";
import Register from "./register";
import Profile from "./profile";
import { AuthContext } from "@/context/AuthContext";

const Stack = createStackNavigator();

const UserStack = () => {
	const {user} = useContext(AuthContext)
	
	return (
		<Stack.Navigator>
			{user ? (
				<Stack.Screen
					name="profile"
					component={Profile}
					options={{
						headerStyle: { backgroundColor: "#ffe600" },
						headerTitle: user?.name || "Profile", 
						headerTitleStyle: { color: "#000" }, 
						headerLeft: () => null,
					}}
				/>
			) : (

				<>
					<Stack.Screen
						name="login"
						component={Login}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="register"
						component={Register}
						options={{ headerShown: false }}
					/>
				</>
			)}
		</Stack.Navigator>
	);
};

export default UserStack;
