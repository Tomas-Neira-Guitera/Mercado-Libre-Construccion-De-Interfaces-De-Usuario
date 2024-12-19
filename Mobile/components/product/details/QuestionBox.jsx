import { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { addQuestion } from "../../../services/product.service";
import { router } from "expo-router";
import QuestionAndAnswer from "./QuestionAndAnswer";

export const QuestionsBox = ({
	product,
	user,
	isOwner,
	onUpdate,
}) => {
	const [question, setQuestion] = useState("");

	const handleQuestionButton = async () => {
		if (!user) {
			router.push("/(tabs)/user");
			return;
		}
		await addQuestion(product.id, String(question));
		onUpdate();
		setQuestion("");
	};
	
	return (
		<View>
			<View>
				<Text style={styles.title}>Preguntas</Text>
				<View style={styles.line} />
			</View>
			{!isOwner && (
				<View>
					<TextInput
						style={styles.textarea}
						value={question}
						onChangeText={(text) => setQuestion(text)}
						multiline
						placeholder="Escribe tu pregunta..."
					/>
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={styles.button}
							onPress={handleQuestionButton}
						>
							<Text style={styles.buttonText}>Preguntar</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
			<Text style={styles.lastQuestionsText}>Ultimas preguntas</Text>
			{product.question.length > 0 ? (
				product.question.map((question) => (
					<QuestionAndAnswer
						key={question.id}
						question={question}
						isOwner={isOwner}
						productId={product.id}
						onUpdate={onUpdate}
					/>
				))
			) : (
				<View style={styles.lastQuestionsBox}>
					<Text>Este producto no tiene preguntas</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "400",
		marginBottom: 1,
	},
	line: {
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		marginVertical: 10,
	},
	descriptionText: {
		fontSize: 18,
	},
	container: {
		padding: 16,
	},
	textarea: {
		height: 100,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 10,
		marginBottom: 16,
		textAlignVertical: "top",
	},
	buttonContainer: {
		alignItems: "flex-end",
	},
	button: {
		backgroundColor: "#007BFF",
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	buttonText: {
		color: "#FFF",
		fontSize: 16,
		textAlign: "center",
	},
	lastQuestionsBox: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
		fontSize: 20,
	},
	lastQuestionsText: {
		fontSize: 20,
	},
});
