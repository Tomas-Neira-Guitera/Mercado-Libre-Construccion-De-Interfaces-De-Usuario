import { useEffect, useState } from "react";
import { getAuthUser } from "../../services/user.service";
import { Link, useNavigate } from "react-router-dom";
import "./tabStyles.css";
import { LogoutButton } from "./components/LogoutButton"
import UserTabsSelector from "./components/UserTabsSelector";


const tabs = [
	{ label: "Liked", name: "likedProducts" },
	{ label: "Sales", name: "saleHistory" },
	{ label: "Purchases", name: "purchaseHistory" },
	{ label: "My products", name: "products" },
];

export const AuthUserPage = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [selectedTab, setSelectedTab] = useState(tabs[0].name);
	
	useEffect(() => {
		const token = localStorage.getItem("jwt");
		if (!token) {
			navigate("/login");
		}
		const fetchUser = async () => {
			const res = await getAuthUser();
			setUser(res);
		};
		fetchUser();
	}, [navigate]);

	return (
		<div className="w-[80rem] mt-3">
			<div className="flex justify-between items-center">
				<div className="flex items-center">
					<img
						src={user?.image}
						alt="Perfil del usuario"
						className="w-12 h-12 rounded-full object-cover"
					/>
					<p className="text-3xl ml-4">{user?.name}</p>
				</div>
				<div>
					<Link to={"/newProduct"} className="mr-4 text-base">
						+ Agregar producto
					</Link>
					<LogoutButton />
				</div>
			</div>
			<UserTabsSelector tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} user={user}  />
		</div>
	);
};
