import React, { useState, useContext } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
	Alert,
	ActivityIndicator,
} from "react-native";
import FormInput from "../../../components/shared/formInput";
import WhiteCard from "../../../components/shared/whiteCard";
import { router } from "expo-router";
import { loginUser } from "@/services/user.service";
import { AuthContext } from "../../../context/AuthContext";


const Login = () => {
	const {handleSetUser} = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		if (!email || !password) {
			Alert.alert("Validation Error", "Please enter both email and password.");
			return;
		}
		setLoading(true);
		try {
			const user = await loginUser({ email, password });
			handleSetUser(user);
			
		} catch (error) {
			if (error.response && error.response.status === 401) {
				Alert.alert("Unauthorized", "Invalid credentials provided.");
			} else {
				Alert.alert("Error", "An unexpected error occurred.");
			}
		} finally {
			setLoading(false);
		}
	};
	

	return (
		<SafeAreaView style={styles.container}>
			<WhiteCard>
				<Text style={styles.title}>Login</Text>
				<View style={styles.line} />
				<FormInput
					label="Email"
					placeholder="Enter email"
					type="email-address"
					styleText={[styles.label, styles.labelEmail]}
					styleInput={styles.input}
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<FormInput
					label="Password"
					placeholder="Enter password"
					secureTextEntry
					styleText={styles.label}
					styleInput={styles.input}
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>

				{loading ? (
					<ActivityIndicator size="large" color="#3483FA" />
				) : (
					<TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
						<Text style={styles.loginButtonText}>Login</Text>
					</TouchableOpacity>
				)}

				<TouchableOpacity onPress={() => router.push("/(tabs)/user/register")}>
					<Text style={styles.registerText}>Register</Text>
				</TouchableOpacity>
			</WhiteCard>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#e7e7e7",
		justifyContent: "center",
		alignItems: "center",
	},
	line: {
		width: "98%",
		height: 1,
		backgroundColor: "#bfbfbf",
	},
	title: {
		fontSize: 24,
		marginBottom: 5,
	},
	label: {
		width: "100%",
		marginBottom: 5,
		fontSize: 16,
	},
	labelEmail: {
		width: "100%",
		marginBottom: 5,
		fontSize: 16,
		paddingTop: 20,
	},
	input: {
		width: "100%",
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 15,
		backgroundColor: "#FFFFFF",
	},
	loginButton: {
		backgroundColor: "#3483FA",
		paddingVertical: 10,
		paddingHorizontal: 30,
		borderRadius: 8,
		marginTop: 10,
		width: "100%",
		alignItems: "center",
	},
	loginButtonText: {
		color: "white",
		fontSize: 16,
	},
	registerText: {
		color: "#3483FA",
		marginTop: 10,
		textDecorationLine: "underline",
	},
});

export default Login;
