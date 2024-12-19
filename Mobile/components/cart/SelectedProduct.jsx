import { View } from "react-native";
import CartProduct from "./CartProduct";

const SelectedProducts = ({ items, onUpdate }) => {
	return (
		<View>
			<View>
				{items.map((item, index) => {
					return <CartProduct key={index} item={item} onUpdate={onUpdate} />;
				})}
			</View>
		</View>
	);
};

export default SelectedProducts;