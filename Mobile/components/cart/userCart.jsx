import { ScrollView, StyleSheet, Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectedProducts from "./SelectedProduct";
import ShoppingSummary from "./ShoppingSummary";

const UserCart = ({ cart, setUpdated }) => {
	const precioProductos = cart.items.reduce((acc, item) => {
		return acc + item.product.price * item.amount;
	}, 0);

	const precioEnvios = cart.items.reduce((acc, item) => {
		return acc + item.product.shipping.price;
	}, 0);

	const total = precioProductos + precioEnvios;

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.boxProduct}>
				<Text style={styles.text}>Productos</Text>
				<ScrollView contentContainerStyle={styles.scrollContent}>
					<SelectedProducts items={cart.items} onUpdate={setUpdated}/>
				</ScrollView>
			</View>
			<View style={styles.boxSummary}>
				<ShoppingSummary cantidadEnvios={cart.items.length} precioEnvios={precioEnvios} precioProductos={precioProductos}></ShoppingSummary>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	scrollContent: {
		flexGrow: 1,
		paddingBottom: 20,
	},
	container: {
		flex: 1,
		backgroundColor: "#f0f0f0",
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	boxProduct: {
		width: "100%",
		height: 493,
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		padding: 20,
		marginBottom: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 5,
	},
	boxSummary: {
		width: "100%",
		height: 170,
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 5,
	},
	text: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
});

export default UserCart;
