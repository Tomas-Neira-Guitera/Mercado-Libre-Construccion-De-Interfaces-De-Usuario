export const ProductCharacteristicsInfo = ({ product: characteristics }) => {
	return (
		<div className="page-card w-full px-6">
			<p className="text-3xl"> Características del producto </p>
			<hr className="line my-4" />
			{characteristics.map((characteristic, index) => {
				return (
					<div className="flex text-lg my-2" key={index}>
						<p className="mr-2">{`${characteristic.name}:`}</p>
						<p>{characteristic.value}</p>
					</div>
				);
			})}
		</div>
	);
};
