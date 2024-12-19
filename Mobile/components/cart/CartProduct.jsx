import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { removeProductCart, updateCart } from "../../services/cart.service";


const CartProduct = ({ item, onUpdate }) => {
	const { product, amount } = item;

	const handleAmountItem = (newAmount) => {
		updateCart(product.id, newAmount);
		onUpdate(true);
	};

	const handleDeleteItem = () => {
		removeProductCart(product.id);
		onUpdate(true);
	};

	return (
		<View style={styles.container}>
			<View style={styles.productInfo}>
				<Image source={{ uri: product.images[0] }} style={styles.image} />

				<View style={styles.details}>
					<Text style={styles.title}>{product.title}</Text>
					<Text style={styles.owner}>Por {product.owner.name}</Text>
					<TouchableOpacity onPress={handleDeleteItem}>
						<Text style={styles.deleteButton}>Eliminar</Text>
					</TouchableOpacity>
				</View>

				<Text style={styles.price}>${Number((amount * product.price).toFixed(3))}</Text>
			</View>

			<View style={styles.quantityContainer}>
				<TouchableOpacity
					onPress={() => handleAmountItem(amount - 1)}
					disabled={amount === 1}
					style={styles.quantityButton}
				>
					<Text style={styles.quantityButtonText}>-</Text>
				</TouchableOpacity>
				<Text style={styles.quantityText}>{amount}</Text>
				<TouchableOpacity
					onPress={() => handleAmountItem(amount + 1)}
					style={styles.quantityButton}
				>
					<Text style={styles.quantityButtonText}>+</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.shippingInfo}>
				<Text style={styles.shippingText}>Envío</Text>
				<Text style={styles.shippingPrice}>${Number((product.shipping.price).toFixed(2))}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
		borderTopWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		marginVertical: 5,
		borderRadius: 5,
	},
	productInfo: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	image: {
		width: 80,
		height: 70,
		borderRadius: 5,
	},
	details: {
		flex: 1,
		paddingHorizontal: 10,
		justifyContent: "center",
	},
	title: {
		fontSize: 14,
		color: "#333",
		fontWeight: "500",
	},
	owner: {
		fontSize: 12,
		color: "#777",
	},
	deleteButton: {
		fontSize: 12,
		color: "#4285F4",
		marginTop: 5,
	},
	quantityContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
	},
	quantityButton: {
		width: 32,
		height: 32,
		borderWidth: 1,
		borderColor: "#ccc",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
	},
	quantityButtonText: {
		fontSize: 16,
		color: "#333",
	},
	quantityText: {
		fontSize: 14,
		marginHorizontal: 10,
	},
	price: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
	},
	shippingInfo: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderTopWidth: 1,
		borderColor: "#ccc",
		marginTop: 10,
		paddingTop: 5,
	},
	shippingText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#333",
	},
	shippingPrice: {
		fontSize: 14,
		fontWeight: "500",
		color: "#333",
	},
});

export default CartProduct;
