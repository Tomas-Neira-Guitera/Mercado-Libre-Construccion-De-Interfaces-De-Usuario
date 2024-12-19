import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateCart } from "../../../../services/cart.service";
import { toggleLike } from "../../../../services/user.service";
import { Star } from "lucide-react";

export const ProductPurcharse = ({ product, owner, user }) => {
	const navigate = useNavigate();
	const [selectedQuantity, setSelectedQuantity] = useState(1);

	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		if (user) {
			const liked = user?.likedProducts?.some(
				(liked) => liked.id === product.id
			);
			setIsLiked(liked);
		}
	}, [user]);

	const handleAddClick = () => {
		updateCart(product.id, selectedQuantity);
		navigate("/cart");
		window.location.reload();
	};

	const handleLike = () => {
		if (!user) {
			navigate("/login");
		}
		toggleLike(product.id);
		setIsLiked(!isLiked);
	};

	return (
		<div className="w-1/2">
			<div className="page-card space-y-3">
				<div>
					<div className="flex justify-between items-center">
						<p className="font-medium">{product.title}</p>
						<Star
							color={isLiked ? "#fde047" : "#000"}
							fill={isLiked ? "#fde047" : "#FFFF"}
							onClick={handleLike}
							size={30}
						/>
					</div>
					<p className="font-light">{`Por ${product.owner.name}`}</p>
				</div>
				<div>
					<p className="font-bold">{`$ ${product.price.toFixed(2)}`}</p>
					<p className="text-succes">{`En 12 de cuotas de $${(
						product.price / 12
					).toFixed(2)}`}</p>
				</div>
				<p>{`Envio: $ ${product.shipping.price.toFixed(2)}`}</p>
				<div>
					<p>Stock disponible</p>
					<p className="font-light">{`+${product.stock} disponibles`}</p>
				</div>
				<div className="flex align-middle space-x-1">
					<p>Cantidad:</p>
					<select
						className="font-semibold"
						value={selectedQuantity}
						onChange={(e) => {
							setSelectedQuantity(e.target.value);
						}}
					>
						{Array.from(
							{ length: Math.min(product.stock, 6) },
							(_, i) => i + 1
						).map((quantity) => (
							<option key={quantity} value={quantity}>
								{quantity} {quantity === 1 ? "unidad" : "unidades"}
							</option>
						))}
					</select>
				</div>
			</div>
			<button
				className="primary-button w-full h-[2.2rem] mt-3"
				onClick={handleAddClick}
			>
				Agregar al carrito
			</button>
			{owner && (
				<Link to={`/editProduct/${product.id}`}>
					<button className="primary-button w-full h-[2.2rem] mt-3">
						Editar
					</button>
				</Link>
			)}
		</div>
	);
};
