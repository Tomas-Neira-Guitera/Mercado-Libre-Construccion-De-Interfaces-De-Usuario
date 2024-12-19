import React, { useState, useContext, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	SafeAreaView,
	Alert,
} from "react-native";

import FormInput from "@/components/shared/formInput";
import { router, useNavigation } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
import { getAuthUser } from "../../services/user.service";
import { getCart, purchaseCart } from "../../services/cart.service";

const PaymentPage = () => {
	const [name, setName] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [cvv, setCvv] = useState("");
	const [expDate, setExpDate] = useState("");
	const [cart, setCart] = useState();
	const [user, setUser] = useState();

	useEffect(() => {
		const fetchUser = async () => {
			const res = await getAuthUser();
			setUser(res);
		};
		fetchUser();
	}, []);

	useEffect(() => {
		const fetchCart = async () => {
			try {
				const cart = await getCart();
				setCart(cart);
			} catch (error) {
				if (error.response && error.response.data) {
					Alert.alert("Cart getting failed.");
				}
			}
		};
		fetchCart();
	}, []);

	const cartItems = cart?.items || [];

	
	const productsPrice = cartItems
		.reduce((acc, item) => {
			if (item.product?.price && item.amount) {
				return acc + item.product.price * item.amount;
			}
			return acc;
		}, 0)
		.toFixed(3); 

	
	const shippingPrice = cartItems
		.reduce((acc, item) => {
			if (item.product?.shipping?.price) {
				return acc + item.product.shipping.price;
			}
			return acc;
		}, 0)
		.toFixed(0); 

	
	const totalPrice = parseFloat(productsPrice) + parseFloat(shippingPrice);

	const handlePurchase = async () => {
		if (!user) {
			Alert.alert("Ups!", "User not logged in");
			return;
		}

		if (!name || !cardNumber || !cvv || !expDate) {
			Alert.alert("Please enter all fields");
		}
		if (!name || !/^[a-zA-Z\s]*$/.test(name)) {
			Alert.alert("The name is not valid.");
			return;
		}
		if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
			Alert.alert("The card number is incorrect. It must have 16 numbers.");
			return;
		}
		if (!cvv || !/^\d{3}$/.test(cvv)) {
			Alert.alert("The securty code is incorrect. It must have 3 numbers.");
			return;
		}
		if (!expDate || !/^\d{4}\/\d{2}$/.test(expDate)) {
			Alert.alert(
				"The expiration date is incorrect. The format must be YYYY/MM."
			);
			return;
		}

		try {
			await purchaseCart(
				cardNumber.toString(),
				expDate.toString(),
				cvv.toString(),
				name.toString()
			);
			router.push("/(tabs)");
		} catch (error) {
			if (error.response && error.response.data) {
				Alert.alert("Unauthorized", "Invalid credentials provided.");
			} else {
				Alert.alert("Error", "An unexpected error occurred.");
			}
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.summaryBox}>
				<View style={styles.row}>
					<Text style={styles.summaryTexth1}>Total</Text>
					<Text style={styles.totalPrice}>${totalPrice}</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.summaryTexth2}>Envío</Text>
					<Text style={styles.shippingPrice}>${shippingPrice}</Text>
				</View>
			</View>

			<View style={styles.paymentBox}>
				<Text style={styles.paymentTitle}>Elegí cómo pagar</Text>
				<View style={styles.line} />

				<FormInput
					label="Name"
					placeholder="Enter name"
					type="email-address"
					styleText={[styles.label, styles.labelEmail]}
					styleInput={styles.input}
					value={name}
					onChangeText={(text) => setName(text)}
				/>
				<FormInput
					label="Card Number"
					placeholder="Enter card number"
					type="email-address"
					styleText={[styles.label, styles.labelEmail]}
					styleInput={styles.input}
					value={cardNumber}
					onChangeText={(text) => setCardNumber(text)}
				/>
				<FormInput
					label="CVV"
					placeholder="Enter security code"
					type="email-address"
					styleText={[styles.label, styles.labelEmail]}
					styleInput={styles.input}
					value={cvv}
					onChangeText={(text) => setCvv(text)}
				/>
				<FormInput
					label="Experation date"
					placeholder="Enter expiration date"
					type="email-address"
					styleText={[styles.label, styles.labelEmail]}
					styleInput={styles.input}
					value={expDate}
					onChangeText={(text) => setExpDate(text)}
				/>
				<TouchableOpacity
					style={styles.purchaseButton}
					onPress={handlePurchase}
				>
					<Text style={styles.purchaseButtonText}>Comprar</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#e7e7e7",
		paddingHorizontal: 20,
		paddingTop: 30,
	},
	summaryBox: {
		width: "100%",
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		marginBottom: 20,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	summaryTexth1: {
		fontSize: 20,
		color: "#333",
		fontWeight: "bold",
	},
	summaryTexth2: {
		fontSize: 16,
		color: "#333",
	},
	totalPrice: {
		fontSize: 24,
		fontWeight: "bold",
	},
	shippingPrice: {
		fontSize: 16,
		color: "#333",
	},
	paymentBox: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
	},
	paymentTitle: {
		fontSize: 20,
		marginBottom: 8,
	},
	line: {
		width: "100%",
		height: 1,
		backgroundColor: "#bfbfbf",
	},
	label: {
		fontSize: 16,
		color: "#333",
		marginTop: 15,
	},
	input: {
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		backgroundColor: "#ffffff",
		marginBottom: 10,
	},
	purchaseButton: {
		backgroundColor: "#3483FA",
		paddingVertical: 8,
		borderRadius: 8,
		marginTop: 18,
		alignItems: "center",
		width: "100%",
	},
	purchaseButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default PaymentPage;
