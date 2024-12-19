import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getProductById } from "../../services/product.service";
import { getAuthUser } from "../../services/user.service";

import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import ProductPurcharseBox from "../../components/product/details/ProductPurcharseBox";
import { ProductCharacteristicsInfo } from "../../components/product/details/ProductCharacteristics";
import { ProductDescription } from "../../components/product/details/ProductDescription";
import RelatedProductsList from "../../components/product/details/RelatedProductsList";
import { QuestionsBox } from "../../components/product/details/QuestionBox";
import ProductImages from "../../components/product/details/ProductImages";

export default function ProductDetailsScreen() {
	const { id } = useLocalSearchParams();
	const navigation = useNavigation();
	const { token, updateUser } = useContext(AuthContext);
	const [product, setProduct] = useState(null);
	const [isOwner, setIsOwner] = useState(false);
	const [isUpdated, setIsUpdated] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const productData = await getProductById(id);
			setProduct(productData);

			if (token) {
				const userData = await getAuthUser();
				setUser(userData);
			}
		};
		fetchData();
	}, [id]);

	useEffect(() => {
		if (product) {
			navigation.setOptions({ title: product.title });
		}
	}, [product]);

	useEffect(() => {
		if (user && product) {
			const owner = user.products.some((p) => p.id === product.id);
			setIsOwner(owner);
		}
	}, [user]);

	useEffect(() => {
		if (isUpdated) {
			const fetchData = async () => {
				const productData = await getProductById(id);
				setProduct(productData);
				setIsUpdated(false);
			};
			fetchData();
		}
	}, [isUpdated]);

	const handleUpdate = () => {
		updateUser();
		setIsUpdated(true);
	};

	return (
		<ScrollView key={id} style={styles.pageContainer}>
			{product ? (
				<View>
					<View style={styles.groupContainer}>
						<Text style={styles.textTitle}>{product.title}</Text>
						<Text style={styles.textOwner}>{product.owner.name}</Text>
					</View>
					<View style={styles.groupContainer}>
						<ProductImages images={product.images} />
					</View>
					<View style={styles.groupContainer}>
						<ProductPurcharseBox product={product} token={token}  updateUser={updateUser}/>
					</View>
					<View style={styles.groupContainer}>
						<ProductCharacteristicsInfo
							characteristics={product.characteristics}
						/>
					</View>
					<View style={styles.groupContainer}>
						<ProductDescription description={product.description} />
					</View>
					<View style={styles.groupContainer}>
						<RelatedProductsList productId={product.id} />
					</View>
					<View style={styles.groupContainer}>
						<QuestionsBox
							product={product}
							user={user}
							isOwner={isOwner}
							onUpdate={handleUpdate}
						/>
					</View>
				</View>
			) : (
				<Text>Loading...</Text>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	pageContainer: {
		paddingHorizontal: 20,
		backgroundColor: "#fff",
	},
	groupContainer: {
		marginBottom: 10,
	},
	textTitle: {
		fontSize: 18,
		fontWeight: "400",
		marginBottom: 2,
	},
	textOwner: {
		fontSize: 14,
		fontWeight: "300",
	},
});
