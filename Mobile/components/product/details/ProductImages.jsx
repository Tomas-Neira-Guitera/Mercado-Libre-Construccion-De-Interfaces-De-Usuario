import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View, ScrollView } from "react-native";

const ProductImages = ({ images }) => {
	const [mainImage, setMainImage] = useState(images[0]);

	return (
		<View style={styles.container}>
			<View style={styles.mainImageContainer}>
				<Image source={{ uri: mainImage }} style={styles.mainImage} resizeMode="contain" />
			</View>
            <ScrollView style={styles.thumbnailContainer} contentContainerStyle={styles.thumbnailScroll} showsVerticalScrollIndicator={false}>
				{images.map((img, index) => (
					<TouchableOpacity key={index} onPress={() => setMainImage(img)}>
						<Image
							source={{ uri: img }}
							style={[
								styles.thumbnail,
								img === mainImage && styles.selectedThumbnail,
							]}
						/>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	);
};

export default ProductImages;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	mainImageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	mainImage: {
		width: "100%",
		height: 250, 
	},
	thumbnailScroll: {
		flexDirection: "row",
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	thumbnail: {
		width: 64,
		height: 64,
		marginRight: 8,
		borderWidth: 1,
		borderColor: "#ccc",
	},
	selectedThumbnail: {
		borderColor: "#1E90FF",
	},
});