import { useEffect, useState } from "react";
import { toggleLike } from "../../services/user.service";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product, user }) => {
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		if (user) {
			const liked = user?.likedProducts?.some(
				(liked) => liked.id === product.id
			);
			setIsLiked(liked);
		}
	}, [user]);

	const navigate = useNavigate();

	const handleLike = () => {
		if (!user) {
			navigate("/login");
		}
		toggleLike(product.id);
		setIsLiked(!isLiked);
	};

	return (
		<div className="page-card">
			<div className="flex justify-end">
				{isLiked ? (
					<i
						className="bi bi-star-fill text-yellow-300 text-3xl"
						onClick={handleLike}
					/>
				) : (
					<i className="bi bi-star text-3xl" onClick={handleLike} />
				)}
			</div>
			<Link to={`/products/${product.id}`}>
				<div className="flex justify-center items-center px-4">
					<img src={product?.images[0]} className="w-[17rem] h-[17rem]" />
				</div>
				<hr className="border-0 w-full h-px bg-gray-500 my-5" />
				<div>
					<p className="font-medium">{product?.title}</p>
					<p className="text-gray-400">{`Por ${product.owner.name}`}</p>
					<div className="pt-3">
						<p className="font-normal">{`$ ${product.price.toFixed(2)}`}</p>
						<p className="text-succes">{`En 12 cuotas de $${(
							product.price / 12
						).toFixed(2)}`}</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default ProductCard;
