import PurchaseSummary from "./PurchaseSummary";
import SelectedProducts from "./SelectedProducts";

const Cart = ({ cart, setUpdated }) => {
	const precioProductos = cart.items.reduce((acc, item) => {
		return (acc + item.product.price * item.amount);
	}, 0);

	const precioEnvios = cart.items.reduce((acc, item) => {
		return (acc + item.product.shipping.price);
	}, 0);

	const total = precioProductos + precioEnvios;

	return (
		<div className="flex space-x-4">
			<div className="page-card w-[36rem] p-5">
				<div className="flex flex-col items-center">
					<SelectedProducts items={cart.items} onUpdate={setUpdated} />
				</div>
			</div>
			<div className="page-card w-[25rem] h-[16.5rem] p-5">
				<PurchaseSummary
					totalProductos={cart.items.length}
					totalEnvios={cart.items.length}
					precioProductos={precioProductos.toFixed(2)}
					precioEnvios={precioEnvios.toFixed(2)}
					total={total.toFixed(2)}
				/>
			</div>
		</div>
	);
};

export default Cart;
