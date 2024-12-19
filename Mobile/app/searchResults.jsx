import React, { useEffect, useState } from "react";
import {
	View,
	TextInput,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	FlatList
} from "react-native";
import Layout from "@/components/Layout";
import { Search } from "lucide-react-native";
import { useRouter } from "expo-router";
import { search } from "@/services/product.service";
import { useSearchParams } from "expo-router/build/hooks";


export default function SearchResults() {
	const [text, setText] = useState("");
	const [products1, setProducts] = useState([]);
	const router = useRouter();

	const { products } = useSearchParams();

	const handleSearch = async () => {
		const data = await search(text);
		setProducts(data.products);

		if (data.products.length > 0) {
			router.push({
				pathname: "/searchResults",
				params: { products: data.products },
			});
		}
	};

	return (
		<Layout>
			<View style={styles.container}>
				<View style={styles.searchContainer}>
					<TextInput
						style={styles.searchInput}
						placeholder="Buscar productos, marcas y más..."
						placeholderTextColor="#999"
						value={text}
						onChangeText={(newText) => setText(newText)}
					/>
					<View style={styles.verticalLine} />
					<TouchableOpacity onPress={handleSearch}>
						<Search color="#666" size={20} style={styles.searchIcon} />
					</TouchableOpacity>
				</View>
					<FlatList
						data={products}
						keyExtractor={(product) => product.id}
						renderItem={({ item }) => <ProductCard product={item} />}
						showsVerticalScrollIndicator={false}
					/>
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		top: 40,
		alignItems: "center",
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		justifyContent: "space-between",
		paddingHorizontal: 12,
		height: 40,
		width: "95%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 4,
		marginBottom: 16,
	},
	searchIcon: {
		marginRight: 8,
	},
	searchInput: {
		flex: 1,
		fontSize: 14,
		color: "#000",
	},
	body: {
		flex: 1,
		width: 377,
		height: 630,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#E7E7E7",
	},
	image: {
		width: 200,
		height: 200,
		marginBottom: 16,
	},
	searchText: {
		fontSize: 16,
		color: "#666",
	},
	textNoFound: {
		fontSize: 32,
		color: "#666",
		height: 38,
	},
	verticalLine: {
		width: 22,
		height: 1,
		backgroundColor: "#000000",
		transform: [{ rotate: "90deg" }],
	},
});
