import { SafeAreaView, StyleSheet } from "react-native";

export default function Layout({ children }) {
	return (
		<SafeAreaView style={styles.container}>
			<SafeAreaView style={styles.main}>{children}</SafeAreaView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E7E7E7"
	},
	main: {
		flex: 1,
		justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
		paddingVertical: 10,
	},
});
