import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
import CategoryCard from "./categoryCard";
import { nameForCategory, iconForCategory } from "./helper/categoryHelper";
import { useRouter } from "expo-router";

const CategoriesList = ({ categories }) => {
	const router = useRouter();

	return (
		<FlatList
			data={categories}
			keyExtractor={(item) => item.id}
			numColumns={2}
			columnWrapperStyle={styles.row}
			renderItem={({ item }) => (
				<CategoryCard
					categoryName={nameForCategory(item.name)}
					icon={iconForCategory(item.name)}
					onPress={() => router.push(`/categories/${item.id}`)}
				/>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	row: {
		justifyContent: "space-between",
	},
	item: {
		backgroundColor: "#4caf50",
		padding: 20,
		margin: 5,
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		color: "#fff",
		fontSize: 16,
	},
});

export default CategoriesList;
