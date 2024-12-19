import { useEffect, useState } from "react";
import { ProductsGrid } from "./ProductsGrid";
import TabsSelector from "./TabsSelector";

const UserTabsSelector = ({ tabs, selectedTab, setSelectedTab, user }) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		if (!user) return;

		switch (selectedTab) {
			case "saleHistory":
				setProducts(user.saleHistory?.map((sale) => sale.product) || []);
				break;
			case "purchaseHistory":
				setProducts(
					user.purchaseHistory?.flatMap((purchase) =>
						purchase.items.map((item) => item.product)
					) || []
				);
				break;
			default:
				setProducts(user[selectedTab] || []);
				break;
		}
	}, [selectedTab, user]);

	return (
		<>
			<TabsSelector
				tabs={tabs}
				setSelectedTab={setSelectedTab}
				selectedTab={selectedTab}
			/>
			<ProductsGrid products={products} user={user} />
		</>
	);
};

export default UserTabsSelector;
