const PurchaseSummary = ({cart}) => {

	if (!cart || !cart.items) {
		return <div>Cargando resumen de compra...</div>; 
	}

	const precioProductos = cart.items.reduce((acc, item) => {
		return (acc + item.product.price * item.amount);
	}, 0);

    const totalProductos = cart.items.length;
	const totalEnvios = totalProductos;
	
	const precioEnvios =  cart.items.reduce((acc, item) => {
		return (acc + item.product.shipping.price);
	}, 0);
	
	const total = precioProductos + precioEnvios;

	return (
		<div>
			<h2 className="font-normal text-2xl text-black-600 pb-4">
				Resumen de compra
			</h2>

			<hr className="justify-center border-1 w-[22rem] bg-gray-600 mx-auto" />

			<div className="flex justify-between my-2">
				<span className="text-gray-600">Productos ({totalProductos})</span>
				<span className="text-gray-600">${precioProductos.toFixed(2)}</span>
			</div>

			<div className="flex justify-between my-2">
				<span className="text-gray-700">Envíos ({totalEnvios})</span>
				<span className="text-gray-700">${precioEnvios.toFixed(2)}</span>
			</div>

			<div className="flex justify-between my-4 font-bold">
				<span className="text-gray-900">Total</span>
				<span className="text-gray-900 text-lg">${total.toFixed(2)}</span>
			</div>
		</div>
	);
};

export default PurchaseSummary;
