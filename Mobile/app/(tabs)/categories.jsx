import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/services/categories.service";
import  CategoriesList  from "@/components/categories/categoriesList";



export default function Categories() {

	const [categories, setCategories] = useState([]);

	const fetchCategories = async () => {
		const data = await getAllCategories();
		setCategories(data);
	};


	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<SafeAreaView>
			<CategoriesList categories={categories} />
		</SafeAreaView>
	);
}
