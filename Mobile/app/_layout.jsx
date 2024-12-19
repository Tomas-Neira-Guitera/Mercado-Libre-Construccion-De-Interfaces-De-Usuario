import { AuthProvider } from "@/context/AuthContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
			<AuthProvider>
				<Stack>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen
						name="categories/[id]"
						options={{
							headerStyle: { backgroundColor: "#ffe600" },
							headerBackVisible: false,
						}}
					/>
					<Stack.Screen
						name="product/[id]"
						options={{
							title: "Producto",
							headerStyle: { backgroundColor: "#ffe600" },
							headerBackVisible: false,
						}}
					/>
					<Stack.Screen
						name="product/userCategory/[category]"
						options={{
							title: "UserCategory",
							headerStyle: { backgroundColor: "#ffe600" },
						}}
					/>
					<Stack.Screen
						name="cart/purchase"
						options={{
							title: "Purchase",
							headerStyle: { backgroundColor: "#ffe600" },
						}}
					/>
				</Stack>
			</AuthProvider>
	);
}
