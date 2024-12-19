import { useNavigate } from "react-router-dom";
import { addQuestion } from "../../../../services/product.service";
import { useState } from "react";
import { QuestionAndAnswer } from "./QuestionAndAnswer";

export const QuestionsBox = ({
	product,
	user,
	isOwner,
	productId,
	onUpdate,
}) => {
	const [question, setQuestion] = useState("");

	const nagivate = useNavigate();

	const handleQuestionButton = () => {
		if (!user) {
			nagivate("/login");
		}
		addQuestion(product.id, String(question));
		onUpdate();
		setQuestion("");
	};

	return (
		<div className="page-card px-6 py-4">
			<div>
				<p className="text-3xl">Preguntas</p>
				<hr className="line my-4" />
			</div>

			{!isOwner && (
				<>
					<textarea
						className="textarea"
						value={question}
						onChange={(e) => {
							setQuestion(e.target.value);
						}}
					/>
					<div className="flex justify-end">
						<button
							className="primary-button w-[6rem] h-[2.5rem]"
							onClick={handleQuestionButton}
						>
							Preguntar
						</button>
					</div>
				</>
			)}

			<p className="text-xl font-normal mb-4">Ultimas preguntas</p>
			{product.question.length > 0 ? (
				product.question.map((question) => (
					<QuestionAndAnswer
						key={question.id}
						question={question}
						isOwner={isOwner}
						productId={productId}
						onUpdate={onUpdate}
					/>
				))
			) : (
				<div className="flex align-middle justify-center p-5 text-xl">
					<p>Este producto no tiene preguntas</p>
				</div>
			)}
		</div>
	);
};
