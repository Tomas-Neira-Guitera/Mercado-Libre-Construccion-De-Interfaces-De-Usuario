import { useNavigation, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ShoppingSummary = ({ cantidadEnvios, precioEnvios, precioProductos }) => {
	const total = (
		parseFloat(precioProductos) + parseFloat(precioEnvios)
	).toFixed(2);

	const router = useRouter();


	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<Text style={styles.label}>Envíos ({cantidadEnvios})</Text>
				<Text style={styles.value}>${Number(precioEnvios).toFixed(0)}</Text>
			</View>

			<View style={[styles.row, styles.totalRow]}>
				<Text style={styles.totalLabel}>Total</Text>
				<Text style={styles.totalValue}>${total}</Text>
			</View>
			<TouchableOpacity
				style={styles.buyButton}
				onPress={() => router.push("cart/purchase")}
			>
				<Text style={styles.buyButtonText}>Comprar</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-between",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	label: {
		fontSize: 16,
		color: "#333",
	},
	value: {
		fontSize: 16,
		color: "#333",
	},
	totalRow: {
		marginTop: 10,
	},
	totalLabel: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
	totalValue: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
	buyButton: {
		backgroundColor: "#4285F4",
		paddingVertical: 12,
		borderRadius: 5,
		alignItems: "center",
	},
	buyButtonText: {
		fontSize: 16,
		color: "#FFF",
		fontWeight: "bold",
	},
});

export default ShoppingSummary;
