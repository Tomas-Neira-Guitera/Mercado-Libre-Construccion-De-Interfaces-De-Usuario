import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import ProductList from "@/components/product/ProductList";

const SearchResults = ({ products, onNextPage }) => {
	return (
		products?.length === 0 ? (
			<View style={styles.body}>
				<Image
					source={require("@/assets/images/search.png")}
					style={styles.image}
				/>
				<Text style={styles.textNoFound}>No results found</Text>
			</View>
		) : (
			<ProductList products={products} onNextPage={onNextPage} />
		)
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#E7E7E7",
		width: "100%",
	},
	image: {
		width: 250,
		height: 250,
		marginBottom: 20,
	},
	textNoFound: {
		fontSize: 32,
		color: "#666",
		height: 38,
	},
});

export default SearchResults;
