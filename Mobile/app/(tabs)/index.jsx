import Layout from "@/components/Layout";
import { View } from "react-native";
import ProductList from "@/components/product/ProductList";
import { useEffect, useState } from "react";
import { getAllProducts } from "@/services/product.service";

export default function HomeScreen() {

	const [page, setPage] = useState(1);
	const [products, setProducts] = useState([]);

	const fetchProducts = async () => {
		const data = await getAllProducts(page);
		setProducts((prevProducts) => [...prevProducts, ...data.products]);
	};

	useEffect(() => {
		fetchProducts();
	}, [page]);

	const nextPage = () => {
		setPage((prevPage) => prevPage + 1);
	}

	return (
		<Layout>
			<View >
				<ProductList products={products} onNextPage={nextPage} />
			</View>
		</Layout>
	);
}

