import CartProduct from "./CartProduct";

const SelectedProducts = ({ items, onUpdate }) => {
	return (
		<div>
			<h1 className="font-normal text-3xl pb-4">Productos</h1>
			<div className="flex flex-col space-y-4">
				{items.map((item, index) => {
					return <CartProduct key={index} item={item} onUpdate={onUpdate} />;
				})}
			</div>
		</div>
	);
};

export default SelectedProducts;
