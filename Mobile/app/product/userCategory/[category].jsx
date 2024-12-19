import { FlatList, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import ProductCard from "../../../components/product/ProductCard";
import { getAuthUser } from "../../../services/user.service";
import Layout from "@/components/Layout";

const categoryLabels = {
	likedProducts: "Liked",
	salesHistory: "Sales",
	purchaseHistory: "Purchases",
	products: "My Products",
};

export default function UserProductList() {
	const { category } = useLocalSearchParams();
	const [user, setUser] = useState(null);
	const [products, setProducts] = useState([]);
	const navigation = useNavigation();

	useEffect(() => {
		const fetchUser = async () => {
			const fetchedUser = await getAuthUser();
			setUser(fetchedUser);

			if (category === "salesHistory") {
				setProducts(
					fetchedUser.saleHistory.map(({ product, amount }) => ({
						...product,
						amount,
					}))
				);
			} else if (category === "purchaseHistory") {
				setProducts(
					fetchedUser.purchaseHistory.flatMap(({ items }) =>
						items.map(({ product, amount }) => ({
							...product,
							amount,
						}))
					)
				);
			} else {
				setProducts(fetchedUser[category] || []); 
			}
		};

		navigation.setOptions({ title: categoryLabels[category] });
		fetchUser();
	}, [category, navigation]); 

	return (
		<Layout>
			<View>
				{user ? (
					<FlatList
						data={products}
						keyExtractor={(product) => product.id}
						renderItem={({ item }) => <ProductCard product={item} />}
						showsVerticalScrollIndicator={false}
						ListEmptyComponent={
							<View style={styles.emptyContainer}>
								<Text style={styles.emptyText}>No products found</Text>
							</View>
						}
					/>
				) : (
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>Loading...</Text>
					</View>
				)}
			</View>
		</Layout>
	);
}

const styles = StyleSheet.create({
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 20,
	},
	emptyText: {
		fontSize: 18,
		color: "#888",
		textAlign: "center",
	},
});
