import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getProductsByCategory,
	getAllCategories,
} from "../../../services/categories.service";
import { iconForCategory } from "../../../shared/utils/helper";
import "../categoryStyle.css";
import { PaginationButtons } from "../../../shared/components/PaginationButtons";
import { ProductsGrid } from "../../user/components/ProductsGrid";
import { getAuthUser } from "../../../services/user.service";

const CategoryPage = () => {
	const { id } = useParams();
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);

	const [user, setUser] = useState(null);
	const token = localStorage.getItem("jwt");

	const queryParams = new URLSearchParams(window.location.search);
	const page = parseInt(queryParams.get("page")) || 1;

	const [currentPage, setCurrentPage] = useState(page);
	const [totalPages, setTotalPages] = useState(null);

	const fetchProductsCategory = async (id) => {
		const data = await getProductsByCategory(id);
		setProducts(data.products);
		setTotalPages(data.amountOfPages);
	};

	const fetchCategories = async () => {
		const data = await getAllCategories();
		setCategories(data);
	};

	const fetchUser = async () => {
		const res = await getAuthUser();
		setUser(res);
	};

	useEffect(() => {
		fetchProductsCategory(id);
		fetchCategories();
		setCurrentPage(page);
		if (token) {
			fetchUser();
		}
	}, [id, page, token]);

	const categoryName = categories.find((category) => category.id === id)?.name;

	return (
		<div>
			<div className="flex items-center space-x-4 mb-4">
				<div className="icon-circle">{iconForCategory(categoryName)}</div>

				<h1 className="text-4xl font-inter text-left mb-2">
					{categoryName?.charAt(0).toUpperCase() + categoryName?.slice(1)}
				</h1>
			</div>

			<ProductsGrid products={products} user={user} />

			<PaginationButtons
				page={page}
				currentPage={currentPage}
				totalPages={totalPages}
				pathname={`/categories/${id}`}
			></PaginationButtons>
		</div>
	);
};
export default CategoryPage;
