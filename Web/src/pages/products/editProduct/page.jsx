import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../components/productForms/ProductForm";
import { getProductById } from "../../../services/product.service";




const EditProductPage = () => {
	const { id }                = useParams();
	const [product, setProduct] = useState("");
	
	
	
	
	useEffect(() => {
	
		const fetchProduct = async () => {
			try {
				const product = await getProductById(id);
				setProduct(product);
			} catch (error) {
				console.error("Error fetching product:", error);
			}
		};
		fetchProduct();
	}, [id]);

	return (
		<ProductForm product= {product} pageH1 ="Edit" buttonName="Edit"/>
	);
}

export default EditProductPage;
