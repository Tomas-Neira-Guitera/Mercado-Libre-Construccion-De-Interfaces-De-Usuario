import { useEffect, useState } from "react";
import { ProductsGrid } from "../user/components/ProductsGrid";
import { PaginationButtons } from "../../shared/components/PaginationButtons";
import { search } from "../../services/product.service";
import { getAuthUser } from "../../services/user.service";

const SearchPage = () => {
	const queryParams = new URLSearchParams(window.location.search);
	const text = queryParams.get("q");
	const page = parseInt(queryParams.get("page")) || 1;

	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(page);
	const [totalPages, setTotalPages] = useState(null);

	const [user, setUser] = useState(null);
	const token = localStorage.getItem("jwt");


	const fetchProducts = async (text) => {
		const data = await search(text, page);
		setProducts(data.products);
		setTotalPages(data.amountOfPages);
		setCurrentPage(page);
	};

	const fetchUser = async () => {
		const res = await getAuthUser();
		setUser(res);
	};

	useEffect(() => {
		fetchProducts(text);
		if (token) {
			fetchUser();
		}
	}, [text, page, token]);

	return (
		<div>
			<h1 className="p-5 px-1 font-normal text-2xl">Search: {text}</h1>
			<ProductsGrid products={products} user={user}/>
			<PaginationButtons
				page={page}
				currentPage={currentPage}
				totalPages={totalPages}
				pathname="/search"
				queryParam={`q=${text}`}
			></PaginationButtons>
		</div>
	);
};

export default SearchPage;
