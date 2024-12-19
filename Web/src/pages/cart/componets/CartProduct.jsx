import { removeProductCart, updateCart } from "../../../services/cart.service";

const CartProduct = ({ item, onUpdate }) => {
	const { product, amount } = item;

	const handleAmountItem = (amount) => {
		updateCart(product.id, amount);
		onUpdate(true);
	};

  const handleDeleteItem = () => {
    removeProductCart(product.id);
    onUpdate(true);
	window.location.reload();
  }

	return (
		<div className="w-[544px] bg-white border-gray-300 border-t p-2">
			
			<div className="flex justify-between items-center">
				
				<img
					src={product.images[0]}
					alt={product.title}
					className="w-16 h-16 object-cover"
				/>

				
				<div className="flex-1 px-4">
					<h2 className="text-gray-800 font-medium text-sm">{product.title}</h2>
					<p className="text-gray-500 text-xs">Por {product.owner.name}</p>
					<button
						onClick={() => {handleDeleteItem()}}
						className="text-blue-500 text-xs mt-1"
					>
						Eliminar
					</button>
				</div>

				
				<div className="flex items-center space-x-2">
					<button
						disabled={amount === 1}
						onClick={() => {handleAmountItem(amount - 1)}}
						className="w-6 h-6 border border-gray-300 text-gray-600"
					>
						-
					</button>
					<span className="text-sm">{amount}</span>
					<button
						onClick={() => {handleAmountItem(amount + 1)}}
						className="w-6 h-6 border border-gray-300 text-gray-600"
					>
						+
					</button>
				</div>

				
				<div className="text-gray-800 font-medium text-sm ml-8">
					${(amount * product.price).toFixed(2)}
				</div>
			</div>
			
			<div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-300">
				<span className="text-gray-800 font-medium text-sm">Envío</span>
				<span className="text-gray-800 font-medium text-sm">
					${product.shipping.price.toFixed(2)}
				</span>
			</div>
		</div>
	);
};

export default CartProduct;
