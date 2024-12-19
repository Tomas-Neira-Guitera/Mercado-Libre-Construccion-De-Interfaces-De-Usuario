import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { createUser } from "@/services/user.service";
import { AuthContext } from "../../../context/AuthContext";

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [image, setImage] = useState("");
	const navigation = useNavigation();
	const { handleSetUser } = useContext(AuthContext);

	const handleSubmit = async () => {
		if (!name || !email || !password || !image) {
			Alert.alert("All fields are required.");
			return;
		}
		try {
			const user = await createUser({ name, email, password, image });
			if (user) {
				handleSetUser(user);
				router.push("(tabs)/");
			}
		} catch (error) {
			if (error.response && error.response.data) {
				Alert.alert("User creation failed");
			} else {
				setError("An unexpected error has occurred.");
			}
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.box}>
				<Text style={styles.principalText}>Register</Text>
				<View style={styles.divider} />

				<Text style={styles.labelForm}>Name</Text>
				<TextInput
					style={styles.inputForm}
					placeholder="Enter your name..."
					value={name}
					onChangeText={setName}
				/>

				<Text style={styles.labelForm}>Email</Text>
				<TextInput
					style={styles.inputForm}
					placeholder="Enter your email..."
					value={email}
					onChangeText={setEmail}
				/>

				<Text style={styles.labelForm}>Image</Text>
				<TextInput
					style={styles.inputForm}
					placeholder="Enter your image..."
					value={image}
					onChangeText={setImage}
				/>

				<Text style={styles.labelForm}>Password</Text>
				<TextInput
					style={styles.inputForm}
					placeholder="Enter your password..."
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>

				<TouchableOpacity style={styles.button} onPress={handleSubmit}>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate("login")}>
					<Text style={styles.loginLink}>Login</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f0f0f0",
	},
	box: {
		width: 350,
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 5,
	},
	principalText: {
		fontSize: 24,
		textAlign: "center",
		marginBottom: 10,
	},
	divider: {
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		marginVertical: 10,
	},
	labelForm: {
		fontSize: 16,
		marginVertical: 8,
	},
	inputForm: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		paddingHorizontal: 10,
		marginBottom: 12,
		borderRadius: 5,
	},
	button: {
		backgroundColor: "#4285F4",
		paddingVertical: 12,
		borderRadius: 5,
		alignItems: "center",
		marginVertical: 10,
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "bold",
	},
	loginLink: {
		color: "#4285F4",
		textAlign: "center",
		marginTop: 10,
		textDecorationLine: "underline",
	},
});

export default RegisterPage;
