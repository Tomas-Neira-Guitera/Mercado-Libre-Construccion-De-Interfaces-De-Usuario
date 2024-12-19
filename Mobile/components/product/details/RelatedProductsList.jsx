import { useEffect, useState } from "react";
import { getRelatedProducts } from "../../../services/product.service";
import ProductItem from "../ProductCard";
import { FlatList, StyleSheet, Text, View } from "react-native";

const RelatedProductsList = ({ productId }) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchRelatedProducts = async () => {
			const data = await getRelatedProducts(productId);
			setProducts(data);
		};
		fetchRelatedProducts();
	}, [productId]);

	return (
		<View>
			<View>
				<Text style={styles.title}>Productos relacionados</Text>
				<View style={styles.line} />
			</View >
			<View  style={styles.listContainer}>
				{products && (
					<FlatList
						data={products}
						keyExtractor={(product) => product.id}
						renderItem={({ item }) => <ProductItem product={item} />}
						showsVerticalScrollIndicator={false}
						scrollEnabled={false}
					/>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "400",
		marginBottom: 1,
	},
	line: {
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		marginVertical: 10,
	},
	listContainer: {
		marginHorizontal: 30,
	},
});

export default RelatedProductsList;
