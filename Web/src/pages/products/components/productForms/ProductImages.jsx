import React from "react";

const ProductImages = ({ images, addImage, deleteImage, image, setImage }) => (
	<form>
		<div className="flex flex-col space-y-2 mb-4 w-full">
			<h2 className="text-left text-black opacity-90 text-base">Images</h2>
			<div className="flex items-center space-x-4 w-full">
				<input
					className="border shadow-sm h-8 px-2 w-full"
					type="text"
					placeholder="Enter image"
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>
				<button
					type="button"
					onClick={addImage}
					className="w-[110px] h-[40px] rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-all"
				>
					Add Image
				</button>
			</div>
		</div>
		<div className="mt-4">
			<ul>
				{images.length === 0 ? (
					<p className="font-normal text-s mb-6 text-center my-10 text-gray-500">
						No image added
					</p>
				) : (
					images.map((img, index) => (
						<li key={index} className="flex justify-between items-center my-2">
							<span className="text-gray-700 truncate max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
								{img}
							</span>
							<button
								type="button"
								onClick={() => deleteImage(index)}
								className="text-blue-500 hover:underline text-sm ml-4"
							>
								Delete
							</button>
						</li>
					))
				)}
			</ul>
		</div>
	</form>
);

export default ProductImages;
