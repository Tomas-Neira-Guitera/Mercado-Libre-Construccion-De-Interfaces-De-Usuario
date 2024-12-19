import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";

import { Header } from "../../components/header";
import {
	House,
	Search,
	ShoppingCart,
	User,
	GalleryVerticalEnd
} from "lucide-react-native";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.tabIconSelected,
				headerShown: true,
				tabBarShowLabel: false,
				headerStyle: {
					backgroundColor: "#ffe600",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => <House color={color} />,
					headerTitle: "Latest updated products",
				}}
			/>
			<Tabs.Screen
				name="categories"
				options={{
					tabBarLabel: "",
					header: () => <Header title="Categories" />,
					tabBarIcon: ({ color, focused }) => <GalleryVerticalEnd color={color} />
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					header: () => <Header title="Search" />,
					tabBarIcon: ({ color, focused }) => <Search color={color} />,
				}}
			/>
			<Tabs.Screen
				name="cart"
				options={{
					tabBarLabel: "",
					headerShown: false,
					tabBarIcon: ({ color, focused }) => <ShoppingCart color={color} />,
				}}
			/>
			<Tabs.Screen
				name="user"
				options={{
					tabBarLabel: "",
					headerShown: false,
					tabBarIcon: ({ color, focused }) => <User color={color} />,
				}}
			/>
		</Tabs>
	);
}
