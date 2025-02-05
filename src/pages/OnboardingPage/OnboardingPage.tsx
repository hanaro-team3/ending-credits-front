import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Button,
	Text,
	SlideContainer,
	Slide,
	IndicatorContainer,
	IndicatorDot,
} from "./styles";
import { CopyData } from "./copy";

export default function OnboardingPage(): JSX.Element {
	const copyData = CopyData;
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [dragging, setDragging] = useState<boolean>(false); // 드래그 상태 여부
	const [translateX, setTranslateX] = useState<number>(0); // 슬라이드 이동 거리
	const navigate = useNavigate();
	const startXRef = useRef<number | null>(null); // 터치 시작 위치 저장

	const nextButtonHandler = () => {
		if (currentIndex < copyData.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const startButtonHandler = () => {
		navigate("/login");
	};

	const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
		setDragging(true);
		startXRef.current = event.touches[0].clientX; // 터치 시작 위치 저장
	};

	const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
		if (!dragging || startXRef.current === null) return;
		const currentX = event.touches[0].clientX;
		const deltaX = currentX - startXRef.current;

		// 첫 번째 인덱스에서 왼쪽으로 드래그 제한
		if (currentIndex === 0 && deltaX > 0) {
			return;
		}

		// 마지막 인덱스에서 오른쪽으로 드래그 제한
		if (currentIndex === copyData.length - 1 && deltaX < 0) {
			return;
		}

		setTranslateX(deltaX); // 이동 거리 업데이트
	};

	const handleTouchEnd = () => {
		setDragging(false);
		if (translateX > 50 && currentIndex > 0) {
			// 오른쪽으로 스와이프
			setCurrentIndex(currentIndex - 1);
		} else if (translateX < -50 && currentIndex < copyData.length - 1) {
			// 왼쪽으로 스와이프
			setCurrentIndex(currentIndex + 1);
		}
		setTranslateX(0); // 이동 거리 초기화
		startXRef.current = null;
	};

	return (
		<div
			style={{
				overflow: "hidden",
				height: "100vh",
				width: "100vw",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			<SlideContainer
				$index={currentIndex}
				style={{
					transform: `translateX(calc(${
						-currentIndex * 100
					}vw + ${translateX}px))`,
					transition: dragging
						? "none"
						: "transform 0.5s ease-in-out",
				}}
			>
				{copyData.map((slide, index) => (
					<Slide
						key={index}
						style={{
							display: "flex",
							justifyContent: "start",
							backgroundImage: `url(${slide.path})`,
							backgroundSize: "cover",
						}}
					>
						<div
							style={{
								marginTop: "87px",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							{/* 상단 텍스트 */}
							<Text>{slide.textTop}</Text>
							<br />
							{/* 중단 텍스트 */}
							<div
								style={{
									lineHeight: "270%",
								}}
							>
								{slide.textMiddle1.textArray.map(
									(textData, i) => (
										<Text
											key={`middle1-${i}`}
											style={{
												fontSize:
													slide.textMiddle1.size,
												fontWeight: textData.fontWeight,
											}}
										>
											{textData.text}
										</Text>
									)
								)}
								<br />
								{slide.textMiddle2.textArray.map(
									(textData, i) => (
										<Text
											key={`middle2-${i}`}
											style={{
												fontSize:
													slide.textMiddle2.size,
												fontWeight: textData.fontWeight,
											}}
										>
											{textData.text}
										</Text>
									)
								)}
							</div>
							<br />
							{/* 하단 텍스트 */}
							<Text>{slide.textBottom}</Text>
						</div>
					</Slide>
				))}
			</SlideContainer>
			<div
				style={{
					position: "absolute",
					bottom: "50px",
					width: "100vw",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<IndicatorContainer>
					{copyData.map((_, index) => (
						<IndicatorDot
							key={index}
							$active={currentIndex === index}
						/>
					))}
				</IndicatorContainer>
				{currentIndex < copyData.length - 1 ? (
					<Button
						onClick={nextButtonHandler}
						style={{
							backgroundColor: "transparent",
							color: "#E4E4E4",
							outline: "2px solid #E4E4E4",
						}}
					>
						다음
					</Button>
				) : (
					<Button
						onClick={startButtonHandler}
						style={{ backgroundColor: "#E4E4E4", color: "#2B2B2B" }}
					>
						시작하기
					</Button>
				)}
			</div>
		</div>
	);
}
