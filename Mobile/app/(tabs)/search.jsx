import React, { useEffect, useState } from "react";
import {
	View,
	TextInput,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
} from "react-native";
import Layout from "@/components/Layout";
import { Search } from "lucide-react-native";
import { search } from "@/services/product.service";
import SearchResults from "@/components/search/searchResults";
import ProductList from "@/components/product/ProductList";

export default function SearchPage() {
	const [page, setPage] = useState(1);
	const [text, setText] = useState("");
	const [products, setProducts] = useState([]);

	const handleSearch = async () => {
		setProducts([]);
		const data = await search(text, page);
		setProducts(data.products);
	};

	const nextPage = async () => {
		setPage((prevPage) => prevPage + 1);
		const data = await search(text, page);
		setProducts((prevProducts) => [...prevProducts, ...data.products]);
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
				<SearchResults products={products} onNextPage={nextPage} />
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "#E7E7E7", 
		paddingTop: 5, 
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		justifyContent: "space-between",
		paddingHorizontal: 12,
		height: 40,
		width: "90%", 
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 }, 
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
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
	image: {
		width: 180,
		height: 180, 
		marginBottom: 16,
	},
	textNoFound: {
		fontSize: 18,
		color: "#666",
		textAlign: "center",
		marginTop: 8,
	},
	verticalLine: {
		width: 22,
		height: 1,
		backgroundColor: "#000000",
		transform: [{ rotate: "90deg" }],
	},
});

