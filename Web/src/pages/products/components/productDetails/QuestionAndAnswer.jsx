import { CornerDownRight } from "lucide-react";

import { useState } from "react";
import { addAnswer } from "../../../../services/product.service";

export const QuestionAndAnswer = ({ question, isOwner, productId, onUpdate}) => {

    const [answer, setAnswer] = useState("")

    const handleAnswerButton = () => {
        addAnswer(productId, question.id, answer);
		onUpdate();
        setAnswer("");
    }

	return (
		<div key={question.id} className="flex flex-col p-2 space-y-1">
			<p className="font-normal text-lg">{question.text}</p>
			{question.response ? (
				<div className="flex ml-4 space-x-2">
					<CornerDownRight />
					<p className="font-light text-base">{question.response}</p>
				</div>
			) : (
				isOwner && (
					<div className="flex ml-4 space-x-2">
						<CornerDownRight />
						<input
							className="border shadow-sm w-full h-9 p-3"
							placeholder="Pregunta"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
						/>
						<button className="primary-button w-28"
                        onClick={handleAnswerButton}
                        >Responder</button>
					</div>
				)
			)}
		</div>
	);
};
