import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { TouchableHighlight } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { updateCart } from "../../../services/cart.service";
import { router } from "expo-router";

const ProductPurcharseBox = ({ product, token, updateUser }) => {
	const [selectedValue, setSelectedValue] = useState(1);

	const handleAddToCart = () => {
		if (!token) {
			router.replace("/(tabs)/user");
			return;
		}
		updateUser();
		updateCart(product.id, selectedValue);
		router.replace("/(tabs)/cart");
	};

	return (
		<View>
			<Text style={styles.textPrice}>{product.price.toFixed(2)}</Text>
			<Text style={styles.installmentsText}>{`En 12 de cuotas de $${(
				product.price / 12
			).toFixed(2)}`}</Text>
			<Text style={styles.textShipping}>
				{" "}
				Envio: ${product.shipping.price.toFixed(2)}{" "}
			</Text>
			<View style={styles.flexContainer}>
				<Text style={styles.labelText}>Cantidad:</Text>
				<View style={styles.pickerContainer}>
					<Picker
						selectedValue={selectedValue}
						onValueChange={(itemValue) => setSelectedValue(itemValue)}
						style={styles.picker}
						mode="dropdown"
					>
						{Array.from(
							{ length: Math.min(product.stock, 6) },
							(_, i) => i + 1
						).map((quantity) => (
							<Picker.Item
								label={`${quantity} ${quantity === 1 ? "unidad" : "unidades"} `}
								value={quantity}
								key={quantity}
							/>
						))}
					</Picker>
				</View>
			</View>
			<TouchableHighlight
				style={styles.addButton}
				underlayColor="#004080"
				onPress={handleAddToCart}
			>
				<Text style={styles.buttonText}>Agregar al carrito</Text>
			</TouchableHighlight>
		</View>
	);
};

export default ProductPurcharseBox;

const styles = StyleSheet.create({
	textPrice: {
		fontSize: 18,
		fontWeight: "500",
		marginBottom: 2,
	},
	installmentsText: {
		fontSize: 14,
		fontWeight: "300",
		color: "#00A650",
	},
	textShipping: {
		fontSize: 16,
		fontWeight: "300",
		marginVertical: 10,
	},
	pickerContainer: {
		width: "60%",
		borderRadius: 12,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "#ccc",
		marginBottom: 10,
	},
	picker: {
		height: 50,
		backgroundColor: "#E7E7E7",
	},
	addButton: {
		backgroundColor: "#007BFF",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 10,
		alignItems: "center",
	},
	buttonText: {
		color: "#FFF",
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
	labelText: {
		marginRight: 10,
		fontSize: 20,
		fontWeight: "300",
	},
	flexContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
	},
});
