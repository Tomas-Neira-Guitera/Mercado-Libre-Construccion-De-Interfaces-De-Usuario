import { useState, useEffect } from "react";
import { getProductsByCategory } from "@/services/categories.service";
import { ChevronLeft } from "lucide-react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import ProductCard from "@/components/product/ProductCard";
import Layout from "@/components/Layout";
import { TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { iconForCategory } from "../../components/categories/helper/categoryHelper";
import React from "react";
import { FlatList } from "react-native";

export default function CategoryId() {
	const { id } = useLocalSearchParams();
	const navigation = useNavigation();
	const router = useRouter();

	const [products, setProducts] = useState([]);

	const fetchProductsByCategory = async (id) => {
		const data = await getProductsByCategory(id);
		setProducts(data.products);
	};

	useEffect(() => {
		fetchProductsByCategory(id);
	}, [id]);

	useEffect(() => {
		if (products) {
			navigation.setOptions({
				title: formattedCategoryName,
				headerLeft: () => (
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<ChevronLeft size={24} color="black" />
					</TouchableOpacity>
				),
			});
		}
	}, [products]);

	const categoryName = products[0]?.category.name;
	const formattedCategoryName = categoryName
		? categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase()
		: "";
	const icon = categoryName ? iconForCategory(categoryName) : null;

	return (
		<Layout>
			<View style={styles.categoryContainer} >
				{icon ? React.cloneElement(icon, { size: 48 }) : null}
				<Text style={styles.categoryName}>{formattedCategoryName}</Text>
			</View>
			<FlatList
				data={products}
				keyExtractor={(product) => product.id}
				renderItem={({ item }) => <ProductCard product={item} />}
				showsVerticalScrollIndicator={false}
			/>
		</Layout>
	);
}

const styles = StyleSheet.create({
	categoryContainer: {
		borderRadius: 12,
		padding: 16,
		backgroundColor: "#FFFFFF",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 4,
		borderRadius: 8,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: 100,
		width: 365,
		gap: 8,
		margin: 8,
		display: "flex",
	},
});
