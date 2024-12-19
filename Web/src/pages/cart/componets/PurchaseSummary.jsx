import { useNavigate } from "react-router-dom";

const PurchaseSummary = ({
	totalProductos,
	totalEnvios,
	precioProductos,
	precioEnvios,
	total,
}) => {
	const navigate = useNavigate();

	return (
		<div>
			<h2 className="font-normal text-2xl text-slate-600 pb-4">Resumen de compra</h2>
			<hr className="border-1 w-[368px] bg-gray-600" />

			<div className="flex justify-between my-2">
				<span className="text-gray-600">Productos ({totalProductos})</span>
				<span className="text-gray-600">${precioProductos}</span>
			</div>

			<div className="flex justify-between my-2">
				<span className="text-gray-700">Envíos ({totalEnvios})</span>
				<span className="text-gray-700">${precioEnvios}</span>
			</div>

			<div className="flex justify-between my-4 font-bold">
				<span className="text-gray-900">Total</span>
				<span className="text-gray-900 text-lg">${total}</span>
			</div>
			<button
				className="mt-2 w-[23rem] h-[2.125rem] primary-button"
				onClick={() => {
					navigate("/purchase");
				}}
			>
				Comprar
			</button>
		</div>
	);
};

export default PurchaseSummary;
