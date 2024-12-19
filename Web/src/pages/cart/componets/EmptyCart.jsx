import { Link } from "react-router-dom";

const EmptyCart = () => {
	return (
		<div className="flex space-x-4">
			<div className="page-card w-[36rem] p-5">
				<div className="flex flex-col justify-center items-center space-y-4 pt-2">
					<i className="text-9xl text-slate-600 bi bi-cart2 "></i>
					<h1 className="font-normal text-3xl">
						Empezá un carrito de compras!
					</h1>
					<Link to="/products">
						<button
							className="mt-2 w-[10.5rem] h-[2.125rem] primary-button"
							type="submit"
						>
							Descubrir productos
						</button>
					</Link>
				</div>
			</div>
			<div className="page-card w-[25rem] p-5 h-[11.37rem] ">
				<div>
					<h1 className="font-normal text-2xl text-slate-600">
						Resumen de compra{" "}
					</h1>
					<hr className="border-1 w-[368px] bg-gray-600 my-2" />
					<h2 className="font-normal text-2xl text-slate-600">
						Aquí verás los importes de tu compra una vez que agregues productos.{" "}
					</h2>
				</div>
			</div>
		</div>
	);
};

export default EmptyCart;
