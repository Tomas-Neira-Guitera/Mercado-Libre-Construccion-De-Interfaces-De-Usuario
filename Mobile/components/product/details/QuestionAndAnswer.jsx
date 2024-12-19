import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { CornerDownRight } from "lucide-react-native";
import { addAnswer } from "../../../services/product.service";


const QuestionAndAnswer = ({ question, isOwner, productId, onUpdate }) => {
	const [answer, setAnswer] = useState("");

	const handleAnswerButton = () => {
		addAnswer(productId, question.id, answer);
		onUpdate();
		setAnswer("");
	};

	return (
		<View key={question.id} style={styles.container}>
			<Text style={styles.questionText}>{question.text}</Text>
			{question.response ? (
				<View style={styles.responseContainer}>
					<CornerDownRight size={20} color="black" />
					<Text style={styles.responseText}>{question.response}</Text>
				</View>
			) : (
				isOwner && (
					<View style={styles.inputContainer}>
						<CornerDownRight size={20} />
						<TextInput
							style={styles.input}
							placeholder="Escribe tu respuesta"
							value={answer}
							onChangeText={(text) => setAnswer(text)}
						/>
						<TouchableOpacity
							style={styles.button}
							onPress={handleAnswerButton}
						>
							<Text style={styles.buttonText}>Responder</Text>
						</TouchableOpacity>
					</View>
				)
			)}
		</View>
	);
};

export default QuestionAndAnswer;

const styles = StyleSheet.create({
	container: {
		padding: 8,
		marginVertical: 4,
	},
	questionText: {
		fontSize: 16,
		fontWeight: "400",
		marginBottom: 4,
	},
	responseContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 16,
		marginVertical: 4,
	},
	responseText: {
		fontSize: 14,
		fontWeight: "300",
		marginLeft: 8,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 16,
		marginVertical: 4,
	},
	input: {
		flex: 1,
		height: 40,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 8,
		marginLeft: 8,
	},
	button: {
		backgroundColor: "#007BFF",
		paddingVertical: 10,
		paddingHorizontal: 16,
		borderRadius: 8,
		marginLeft: 8,
	},
	buttonText: {
		color: "#FFF",
		fontSize: 14,
		textAlign: "center",
	},
});
