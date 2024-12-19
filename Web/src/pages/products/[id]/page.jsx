import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../../../services/product.service";

import { ProductCharacteristicsInfo } from "../components/productDetails/ProductCharacteristicsInfo";

import { ProductDescription } from "../components/productDetails/ProductDescription";
import { getAuthUser } from "../../../services/user.service";
import { QuestionsBox } from "../components/productDetails/QuestionsBox";
import { ProductPurcharse } from "../components/productDetails/ProductPurcharse";
import { RelatedProducts } from "../components/productDetails/RelatedProducts";
import { ImagesBox } from "../components/productDetails/ImagesBox";

const ProductDetailPage = () => {
	const { id } = useParams();
	const token = localStorage.getItem("jwt");
	const [product, setProduct] = useState(null);
	const [isOwner, setIsOwner] = useState(false);
	const [isUpdated, setIsUpdated] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const productData = await getProductById(id);
			setProduct(productData);

			if (token) {
				const userData = await getAuthUser();
				setUser(userData);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (user && product) {
			const owner = user.products.some((p) => p.id === product.id);
			setIsOwner(owner);
		}
	}, [user]);

	useEffect(() => {
		if (isUpdated) {
			const fetchData = async () => {
				const productData = await getProductById(id);
				setProduct(productData);
				setIsUpdated(false);
			};
			fetchData();
		}
	}, [isUpdated]);

	const handleUpdate = () => {
		setIsUpdated(true);
	};

	return (
		<div className="w-2/3 space-y-4">
			{product ? (
				<>
					<div className="flex space-x-2 justify-start">
						<Link to={"/categories"} className="text-info hover:underline">
							Categorias
						</Link>
						<p>{">"}</p>
						<Link
							to={`/categories/${product.category.id}`}
							className="text-info hover:underline"
						>
							{product.category.name}
						</Link>
					</div>
					<div className="flex space-x-2">
						<div className="page-card w-1/2">
							<ImagesBox images={product.images} />
						</div>
						<ProductPurcharse product={product} owner={isOwner} user={user} />
						</div>
					<ProductCharacteristicsInfo product={product.characteristics} />
					<ProductDescription description={product.description} />
					<RelatedProducts productId={product.id} user={user} />
					<QuestionsBox
						product={product}
						user={user}
						productId={product.id}
						onUpdate={handleUpdate}
						isOwner={isOwner}
					/> 
				</>
			) : <p>Loading...</p> }
		</div>
	);
};

export default ProductDetailPage;
