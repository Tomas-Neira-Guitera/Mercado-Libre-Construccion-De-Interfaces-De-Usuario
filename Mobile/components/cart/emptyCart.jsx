import { useNavigation } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EmptyCart = () => {
	const navigation = useNavigation();
    
    return(
    <SafeAreaView style={styles.container}>
        <View style={styles.box}>
            <ShoppingCart size={95} color={"#666"} style={styles.icon} />
            <Text style={styles.text}>Empezá un carrito de compras!</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('index')}>
					<Text style={styles.buttonText}>Descubrir productos</Text>
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
		width: 377,
        height: 680,
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		padding: 20,
        justifyContent: "center",
        alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 5,
	},
    text: {
		fontSize: 30,
		color: "#333333",
		textAlign: "center",
		marginBottom: 20,
	},
    button: {
		backgroundColor: "#4285F4",
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 5,
		alignItems: "center",
		marginTop: 10,
	},
    buttonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "bold",
	},
    icon: {
		marginBottom: 20,
	},
});

export default EmptyCart;
