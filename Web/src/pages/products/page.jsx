import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/product.service";
import { useLocation } from "react-router-dom";
import { getAuthUser } from "../../services/user.service";
import { ProductsGrid } from "../user/components/ProductsGrid";
import { PaginationButtons } from "../../shared/components/PaginationButtons";

const ProductsPage = () => {
	const [user, setUser] = useState(null);
	const token = localStorage.getItem("jwt");

	const location = useLocation();
	const page = parseInt(new URLSearchParams(location.search).get("page")) || 1;

	const [currentPage, setCurrentPage] = useState(page);
	const [totalPages, setTotalPages] = useState(null);
	const [products, setProducts] = useState([]);

	const fetchProducts = async () => {
		const data = await getAllProducts(page);
		setProducts(data.products);
		setTotalPages(data.amountOfPages);
		setCurrentPage(data.currentPage);
	};

	const fetchUser = async () => {
		const res = await getAuthUser();
		setUser(res);
	};

	useEffect(() => {
		fetchProducts();
		if (token) {
			fetchUser();
		}
	}, [page, token]);

	return (
		<div>
			<ProductsGrid products={products} user={user} />
			<PaginationButtons
				page={page}
				currentPage={currentPage}
				totalPages={totalPages}
				pathname={"/products"}
			/>
		</div>
	);
};

export default ProductsPage;
