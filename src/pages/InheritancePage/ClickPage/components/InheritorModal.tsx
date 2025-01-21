import React, { useState, useEffect, useRef } from "react";
import * as styled from "../styles";
import { InheritorModalProps } from "../types";
import {
	getRelationInKorean,
	getTopInheritors,
	saveInheritorInfo,
} from "../utils/inheritorUtils";

export const InheritorModal: React.FC<InheritorModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	const [name, setName] = useState("");
	const [relation, setRelation] = useState("");
	const [topInheritors, setTopInheritors] = useState<
		Array<{ name: string; relation: string }>
	>([]);
	const submitButtonRef = useRef<HTMLButtonElement>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setTopInheritors(getTopInheritors(5));
		}
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) {
			setName("");
			setRelation("");
			setIsSubmitting(false);
		}
	}, [isOpen]);

	const handleSubmit = (e: React.MouseEvent | React.TouchEvent) => {
		e.preventDefault();

		if (isSubmitting) return;

		if (name && relation) {
			setIsSubmitting(true);
			saveInheritorInfo(name, relation);
			onSubmit({ name, relation });
			onClose();
		}
	};

	const handleSuggestionClick = (
		suggestedName: string,
		suggestedRelation: string
	) => {
		setName(suggestedName);
		setRelation(suggestedRelation);
	};

	if (!isOpen) return null;

	return (
		<styled.ModalOverlay onClick={onClose}>
			<styled.ModalContent onClick={(e) => e.stopPropagation()}>
				<styled.ModalTitle>상속인 선택</styled.ModalTitle>
				<styled.InheritorForm>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-start",
							alignItems: "center",
							marginBottom: "20px",
						}}
					>
						<styled.FormLabel>관계 :</styled.FormLabel>
						<styled.FormSelect
							value={relation}
							onChange={(e) => setRelation(e.target.value)}
						>
							<option value="" disabled>
								관계를 선택해 주세요.
							</option>
							<option value="spouse">배우자</option>
							<option value="parents">부모</option>
							<option value="children">자녀</option>
							<option value="legalHeirs">법정상속인</option>
							<option value="donation">
								국가 등에 기부(유증)
							</option>
						</styled.FormSelect>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-start",
							alignItems: "center",
						}}
					>
						<styled.FormLabel>성함 :</styled.FormLabel>
						<styled.FormInput
							placeholder="상속인의 이름을 입력하세요"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					{topInheritors.length > 0 && (
						<styled.SuggestionsContainer>
							{topInheritors.map((inheritor) => (
								<styled.SuggestionChip
									key={`${inheritor.name}-${inheritor.relation}`}
									onClick={() =>
										handleSuggestionClick(
											inheritor.name,
											inheritor.relation
										)
									}
									type="button"
								>
									{`${inheritor.name} (${getRelationInKorean(
										inheritor.relation
									)})`}
								</styled.SuggestionChip>
							))}
						</styled.SuggestionsContainer>
					)}

					<styled.SubmitButton
						ref={submitButtonRef}
						onClick={handleSubmit}
						type="button"
						disabled={isSubmitting || !name || !relation}
					>
						추가하기
					</styled.SubmitButton>
				</styled.InheritorForm>
			</styled.ModalContent>
		</styled.ModalOverlay>
	);
};
