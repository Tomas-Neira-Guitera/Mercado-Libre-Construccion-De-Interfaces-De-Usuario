import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../../../services/categories.service";
import { newProduct, updateProduct } from "../../../../services/product.service";
import { getAuthUser } from "../../../../services/user.service";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";
import ProductCharacteristics from "./ProductCharacteristics";

export const ProductForm = ({ product, pageH1, buttonName }) => {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [shipping, setShipping] = useState("");
	const [description, setDescription] = useState("");
	const [stock, setStock] = useState("");
	const [category, setCategory] = useState("");

	const [image, setImage] = useState("");
	const [images, setImageList] = useState([]);
	const [name, setName] = useState("");
	const [value, setValue] = useState("");
	const [characteristics, setCharacteristics] = useState([]);
	const [categories, setCategories] = useState([]);
	const [error, setError] = useState(null);
	const [user, setUser] = useState(null);

	const navigate = useNavigate();
	const token = localStorage.getItem("jwt");

	useEffect(() => {
		if (!token) {
			navigate("/notFound");
		}

		if (product) {
			setTitle(product.title || "Something went wrong");
			setPrice(product.price || 0);
			setShipping(product.shipping?.price || 0);
			setDescription(product.description || "Something went wrong");
			setStock(product.stock || 0);
			setCategory(product.category.id || "Something went wrong");
			setCharacteristics(product.characteristics || []);
			setImageList(product.images || []);
		}

		const fetchCategories = async () => {
			try {
				const data = await getAllCategories();
				setCategories(data);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		const fetchUser = async () => {
			try {
				const userData = await getAuthUser();
				setUser(userData);
			} catch (error) {
				console.error("Error fetching user", error);
			}
		};
		fetchUser();
		fetchCategories();
	}, [token, navigate, product]);


	const addImage = () => {
		if (!image) {
			setError("Missing image");
			setTimeout(() => setError(""), 3000);
			return;
		}
		setImageList([...images, image]);
		setImage("");
	};

	const deleteImage = (index) => {
		setImageList(images.filter((_, i) => i !== index));
	};

	const addCharacteristic = () => {
		if (!name || !value) {
			setError("Missing key or value");
			setTimeout(() => setError(""), 3000);
			return;
		}
		setCharacteristics([...characteristics, { name, value }]);
		setName("");
		setValue("");
	};

	const deleteCharacteristic = (index) => {
		setCharacteristics(characteristics.filter((_, i) => i !== index));
	};



	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!title || !price || !shipping || !description || !stock || !category) {
			setError("All product info must be filled");
			setTimeout(() => setError(""), 3000);
			return;
		}
		if (images.length == 0) {
			setError("You must add at least one image");
			setTimeout(() => setError(""), 3000);
			return;
		}

		if (characteristics.length == 0) {
			setError("You must add at least one characteristic");
			setTimeout(() => setError(""), 3000);
			return;
		}

		if (product) {
			if (user.id !== product.owner.id) {
				navigate("/pageNotFound");
				return;
			}

			await updateProduct({
				id: product.id,
				title,
				description,
				price: parseFloat(price),
				images,
				stock: parseFloat(stock),
				shipping: { price: parseFloat(shipping) },
				characteristics,
				categoryId: category,
			});
			navigate(`/products/${product.id}`);
		} else {
			await newProduct({
				title,
				description,
				price: parseFloat(price),
				images,
				stock: parseFloat(stock),
				shipping: { price: parseFloat(shipping) },
				characteristics,
				categoryId: category,
			});
			navigate('/');
		}
	};

	return (
		<div className="page-card w-[60rem]">
			<form
				onSubmit={(e) => {
					handleSubmit(
						e,
						title,
						description,
						price,
						images,
						stock,
						shipping,
						characteristics,
						category
					);
				}}
			>
				<h1 className="font-normal text-3xl mb-6 text-center">{pageH1}</h1>
				<ProductDetails
					{...{
						title,
						setTitle,
						price,
						setPrice,
						shipping,
						setShipping,
						description,
						setDescription,
						stock,
						setStock,
						category,
						setCategory,
						categories,
					}}
				/>

				<hr className="border-t-3 border-gray-300 my-4" />

				<ProductImages {...{ images, addImage, deleteImage, image, setImage }} />

				<hr className="border-t-3 border-gray-300 my-12" />

				<ProductCharacteristics
					{...{
						characteristics,
						addCharacteristic,
						deleteCharacteristic,
						name,
						setName,
						value,
						setValue,
					}}
				/>

				<hr className="border-t-3 border-gray-300 my-12" />
				<div className="flex justify-between items-center mt-4">
					<p className="text-center flex-grow text-gray-700">
						{error && <p className="text-red-500 font-s ">{error}</p>}
					</p>
					<button className="w-[90px] h-[40px] rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-all" type="submit">
						{buttonName}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProductForm;
