export const ProductDescription = ({ description }) => {
	return (
		<div className="page-card px-6 py-4">
			<div>
				<p className="text-3xl">Descripción</p>
				<hr className="line my-4" />
			</div>
			<p className="text-lg">{description}</p>
		</div>
	);
};
