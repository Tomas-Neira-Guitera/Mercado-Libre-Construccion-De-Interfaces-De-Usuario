import { useState } from "react";

export const ImagesBox = ({ images }) => {
	const [mainImage, setMainImage] = useState(images[0]);

	return (
		<div className="flex w-full">
			<div className="flex flex-col space-y-2 mr-4">
				{images.map((img, index) => (
					<img
						key={index}
						src={img}
						className={`w-16 h-16 cursor-pointer border ${
							img === mainImage ? "border-blue-400" : "border-gray-200"
						}`}
						onClick={() => setMainImage(img)}
					/>
				))}
			</div>
			<div className="flex justify-end w-full">
				<img src={mainImage} alt="Main" className="w-auto h-[25rem] " />
			</div>
		</div>
	);
};

