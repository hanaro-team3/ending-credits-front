import React, {
	useState,
	ChangeEvent,
	FormEvent,
	useMemo,
	useRef,
	useCallback,
	useEffect,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import * as styled from "./styles";
import backbtn from "../../images/back-icon.png";
import BlueButton from "../../ui/BlueBtn";
import showPasswordIcon from "../../images/show-pw-icon.png";
import hidePasswordIcon from "../../images/hide-pw-icon.png";
import { userService } from "../../services/api/SignUp";
import { CheckDuplicateIdDTO, SignupDTO } from "../../services/dto/Auth";
import { Moon, X, LightbulbOff } from "lucide-react";

interface FormData {
	phoneNumber: string;
	carrier: string;
	birthDate: string;
	securityCode: string;
	password: string;
	passwordConfirm: string;
	userid: string;
	email: string;
}

type CheckboxKeys = "service" | "financial" | "sms" | "personal" | "benefits";
interface CheckboxState {
	service: boolean;
	financial: boolean;
	sms: boolean;
	personal: boolean;
	benefits: boolean;
}

const StepForm = () => {
	const [currentStep, setCurrentStep] = useState<number>(0);
	const navigate = useNavigate();
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [hasPermission, setHasPermission] = useState<boolean>(false);
	const [cameraError, setCameraError] = useState<string | null>(null);
	const [isCapturing, setIsCapturing] = useState<boolean>(false);
	const [capturedImage, setCapturedImage] = useState<string | null>(null);

	const [formData, setFormData] = useState<FormData>({
		phoneNumber: "",
		carrier: "",
		birthDate: "",
		securityCode: "",
		password: "",
		passwordConfirm: "",
		userid: "",
		email: "",
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showPasswordConfirm, setShowPasswordConfirm] =
		useState<boolean>(false);
	const [isUserIdChecked, setIsUserIdChecked] = useState<boolean>(false);
	const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false);

	const isStep0Complete = useMemo(() => {
		return formData.phoneNumber.trim() !== "" && formData.carrier !== "";
	}, [formData.phoneNumber, formData.carrier]);

	const isStep1Complete = useMemo(() => {
		const isPasswordValid = formData.password.trim() !== "";
		const isPasswordConfirmValid =
			formData.password === formData.passwordConfirm;
		const isUserIdValid = formData.userid.trim() !== "" && isUserIdChecked;

		return isPasswordValid && isPasswordConfirmValid && isUserIdValid;
	}, [
		formData.password,
		formData.passwordConfirm,
		formData.userid,
		isUserIdChecked,
	]);

	const [checkboxes, setCheckboxes] = useState<CheckboxState>({
		service: false,
		financial: false,
		sms: false,
		personal: false,
		benefits: false,
	});

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		if (name === "userid") {
			setIsUserIdChecked(false);
		}
	};

	const handleNext = () => {
		if (currentStep === 0 && isStep0Complete) {
			setCurrentStep((prev) => prev + 1);
		} else if (currentStep === 1 && isStep1Complete) {
			setCurrentStep((prev) => prev + 1);
		}
	};

	const handleBack = () => {
		setCurrentStep((prev) => prev - 1);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		console.log("Login attempt with:", formData);
	};

	const togglePasswordVisibility = (): void => {
		setShowPassword(!showPassword);
	};

	const handleDupCheck = async () => {
		if (!formData.userid.trim()) {
			alert("아이디를 입력해주세요.");
			return;
		}

		try {
			const checkData: CheckDuplicateIdDTO = {
				identifier: formData.userid,
			};

			const response = await userService.checkDuplicateId(checkData);
			console.log(response);

			// 중복 체크 성공 (중복되지 않은 아이디)
			setIsUserIdChecked(true);
			alert("사용 가능한 아이디입니다.");
		} catch (error) {
			console.error("ID check failed:", error);

			// 중복된 아이디인 경우
			setIsUserIdChecked(false);
			alert("이미 사용중인 아이디입니다.");
		}
	};

	const handleSingleCheck = (name: CheckboxKeys) => {
		setCheckboxes((prev) => {
			const newCheckboxes = {
				...prev,
				[name]: !prev[name],
			};

			const allChecked = Object.values(newCheckboxes).every(
				(value) => value
			);
			setIsTermsChecked(allChecked);

			return newCheckboxes;
		});
	};

	const handleAllCheck = () => {
		const newValue = !isTermsChecked;
		setIsTermsChecked(newValue);
		setCheckboxes({
			service: newValue,
			financial: newValue,
			sms: newValue,
			personal: newValue,
			benefits: newValue,
		});
	};

	const areRequiredTermsAccepted = useMemo(() => {
		return (
			checkboxes.service &&
			checkboxes.financial &&
			checkboxes.sms &&
			checkboxes.personal
		);
	}, [checkboxes]);

	const handleSignup = async () => {
		try {
			const signupData: SignupDTO = {
				identifier: formData.userid,
				password: formData.password,
				loginType: "NORMAL",
				birthDate: "1999-07-28",
				phoneNumber: formData.phoneNumber,
				address: "서울시 성동구 성수동",
				name: "홍소희",
				email: formData.email,
			};

			console.log("Sending signup data:", signupData);

			const response = await userService.registerUser(signupData);
			console.log("Signup successful:", response); // 성공 응답 로깅

			navigate("/simplelogin", { state: { userid: formData.userid } });
		} catch (error) {
			console.error("Signup failed:", error);
		}
	};

	const startCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					facingMode: "environment",
					width: { ideal: 1920 },
					height: { ideal: 1080 },
				},
			});

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
			}
			setHasPermission(true);
		} catch (err) {
			setCameraError("카메라 접근 권한이 필요합니다.");
			setHasPermission(false);
		}
	};

	const detectIdCard = (
		imageData: ImageData,
		width: number,
		height: number
	): boolean => {
		// 신분증의 일반적인 비율 (가로:세로 = 1.586:1)
		const ID_CARD_RATIO = 1.586;
		const RATIO_TOLERANCE = 0.2; // 허용 오차

		// 이미지 중앙 영역만 분석 (전체 이미지의 80%)
		const centerWidth = width * 0.8;
		const centerHeight = height * 0.8;
		const startX = Math.floor((width - centerWidth) / 2);
		const startY = Math.floor((height - centerHeight) / 2);

		// 엣지 검출을 위한 설정
		const EDGE_THRESHOLD = 30; // 엣지 감지 임계값
		const edges: boolean[][] = Array(height)
			.fill(false)
			.map(() => Array(width).fill(false));
		let edgeCount = 0;

		// Sobel 연산자를 사용한 엣지 검출
		for (let y = startY + 1; y < startY + centerHeight - 1; y++) {
			for (let x = startX + 1; x < startX + centerWidth - 1; x++) {
				const idx = (y * width + x) * 4;

				// 주변 픽셀과의 차이 계산 (Sobel operator 간소화 버전)
				const gx =
					-imageData.data[((y - 1) * width + (x - 1)) * 4] +
					imageData.data[((y - 1) * width + (x + 1)) * 4] +
					-2 * imageData.data[(y * width + (x - 1)) * 4] +
					2 * imageData.data[(y * width + (x + 1)) * 4] +
					-imageData.data[((y + 1) * width + (x - 1)) * 4] +
					imageData.data[((y + 1) * width + (x + 1)) * 4];

				const gy =
					-imageData.data[((y - 1) * width + (x - 1)) * 4] +
					-2 * imageData.data[((y - 1) * width + x) * 4] +
					-imageData.data[((y - 1) * width + (x + 1)) * 4] +
					imageData.data[((y + 1) * width + (x - 1)) * 4] +
					2 * imageData.data[((y + 1) * width + x) * 4] +
					imageData.data[((y + 1) * width + (x + 1)) * 4];

				const gradient = Math.sqrt(gx * gx + gy * gy);

				if (gradient > EDGE_THRESHOLD) {
					edges[y][x] = true;
					edgeCount++;
				}
			}
		}

		// 수평/수직 라인 검출
		let horizontalLines = 0;
		let verticalLines = 0;
		const MIN_LINE_LENGTH = width * 0.3; // 최소 선 길이

		// 수평 라인 검사
		for (let y = startY; y < startY + centerHeight; y++) {
			let lineLength = 0;
			for (let x = startX; x < startX + centerWidth; x++) {
				if (edges[y][x]) {
					lineLength++;
				} else if (lineLength > 0) {
					if (lineLength >= MIN_LINE_LENGTH) {
						horizontalLines++;
					}
					lineLength = 0;
				}
			}
		}

		// 수직 라인 검사
		for (let x = startX; x < startX + centerWidth; x++) {
			let lineLength = 0;
			for (let y = startY; y < startY + centerHeight; y++) {
				if (edges[y][x]) {
					lineLength++;
				} else if (lineLength > 0) {
					if (lineLength >= MIN_LINE_LENGTH) {
						verticalLines++;
					}
					lineLength = 0;
				}
			}
		}

		// 결과 분석
		const edgeRatio = edgeCount / (centerWidth * centerHeight);
		const aspectRatio = centerWidth / centerHeight;
		const ratioInRange =
			Math.abs(aspectRatio - ID_CARD_RATIO) <= RATIO_TOLERANCE;

		// 신분증 판단 조건:
		// 1. 적절한 비율의 직사각형
		// 2. 충분한 수의 수평/수직 라인
		// 3. 적절한 엣지 비율 (너무 많거나 적으면 안됨)
		return (
			ratioInRange &&
			horizontalLines >= 2 &&
			verticalLines >= 2 &&
			edgeRatio > 0.05 &&
			edgeRatio < 0.2
		);
	};

	const analyzeFrame = useCallback(() => {
		if (!videoRef.current || !canvasRef.current || isCapturing) return;

		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		if (!context) return;

		const video = videoRef.current;

		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;

		context.drawImage(video, 0, 0, canvas.width, canvas.height);

		const imageData = context.getImageData(
			0,
			0,
			canvas.width,
			canvas.height
		);

		const isIdCard = detectIdCard(imageData, canvas.width, canvas.height);

		if (isIdCard) {
			captureImage();
		}
	}, [isCapturing, detectIdCard]);

	const captureImage = useCallback(() => {
		if (!videoRef.current || !canvasRef.current || isCapturing) return;

		setIsCapturing(true);

		const canvas = canvasRef.current;
		const context = canvas.getContext("2d");
		if (!context) return;

		context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

		const image = canvas.toDataURL("image/jpeg");
		setCapturedImage(image);

		// 캡처 후 다음 단계로 자동 이동
		setTimeout(() => {
			setCurrentStep(0);
		}, 1000);
	}, [isCapturing]);

	useEffect(() => {
		if (currentStep === -1) {
			startCamera();
		}

		return () => {
			if (videoRef.current?.srcObject) {
				const tracks = (
					videoRef.current.srcObject as MediaStream
				).getTracks();
				tracks.forEach((track) => track.stop());
			}
		};
	}, [currentStep]);

	useEffect(() => {
		let animationFrameId: number;
		const analyze = () => {
			analyzeFrame();
			animationFrameId = requestAnimationFrame(analyze);
		};

		if (hasPermission && !isCapturing && currentStep === -1) {
			analyze();
		}

		return () => {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
			}
		};
	}, [hasPermission, isCapturing, analyzeFrame, currentStep]);

	// 신분증 촬영 화면 렌더링
	const renderCameraStep = () => (
		<styled.CameraContainer>
			<styled.CloseButton>
				<X size={24} />
			</styled.CloseButton>

			<styled.CameraTitle>
				표시된 영역에 신분증을 맞춰 주세요.
			</styled.CameraTitle>

			<styled.CameraViewContainer>
				{hasPermission && !capturedImage && (
					<>
						<styled.CameraVideo
							ref={videoRef}
							autoPlay
							playsInline
						/>
						<styled.CameraCanvas ref={canvasRef} />
						<styled.IdCardGuide />
					</>
				)}

				{capturedImage && (
					<styled.CapturedImage
						src={capturedImage}
						alt="Captured ID"
					/>
				)}

				{!hasPermission && (
					<styled.CameraErrorMessage>
						{cameraError}
					</styled.CameraErrorMessage>
				)}
			</styled.CameraViewContainer>

			<styled.BottomGuide>
				<styled.GuideItem>
					<styled.GuideIcon>
						<Moon size={24} />
					</styled.GuideIcon>
					<styled.GuideText>
						어두운 배경에서{"\n"}촬영해 주세요
					</styled.GuideText>
				</styled.GuideItem>
				<styled.GuideItem>
					<styled.GuideIcon>
						<LightbulbOff size={24} />
					</styled.GuideIcon>
					<styled.GuideText>
						빛이 반사되지 않도록{"\n"}방향을 조정해 주세요
					</styled.GuideText>
				</styled.GuideItem>
			</styled.BottomGuide>
		</styled.CameraContainer>
	);

	// 회원가입 첫번째 화면 - 전화번호 입력
	const renderStep0 = () => (
		<styled.Container>
			<div>
				<Link to="/login" style={{ textDecoration: "none" }}>
					<styled.BackButton src={backbtn} onClick={handleBack} />
				</Link>
				<styled.Title>
					{isStep0Complete
						? "입력한 정보를 확인해주세요"
						: "전화번호를 입력해 주세요."}
				</styled.Title>
				<styled.Form onSubmit={handleSubmit}>
					<styled.Input
						type="tel"
						name="phoneNumber"
						value={formData.phoneNumber}
						onChange={handleInputChange}
						placeholder="01011111111"
					/>
					<styled.Select
						name="carrier"
						value={formData.carrier}
						onChange={handleInputChange}
					>
						<option
							value=""
							disabled
							selected
							style={{ color: "#dadada" }}
						>
							통신사를 선택해주세요
						</option>
						<option value="SKT">SKT</option>
						<option value="KT">KT</option>
						<option value="LGU+">LGU+</option>
						<option value="SKT 알뜰폰">SKT 알뜰폰</option>
						<option value="KT 알뜰폰">KT 알뜰폰</option>
						<option value="LGU+ 알뜰폰">LGU+ 알뜰폰</option>
					</styled.Select>
					<styled.IdNumberDiv>
						<styled.IdNumberFront>990728</styled.IdNumberFront>
						<styled.IdNumberBackDiv>
							<styled.IdNumberBackDivFront>
								2
							</styled.IdNumberBackDivFront>
							<styled.IdNumberBackDivBack>
								******
							</styled.IdNumberBackDivBack>
						</styled.IdNumberBackDiv>
					</styled.IdNumberDiv>
					<styled.NameDiv>홍소희</styled.NameDiv>
					<styled.NameDiv style={{ marginTop: "18px" }}>
						서울시 성동구 성수동
					</styled.NameDiv>
				</styled.Form>
			</div>
			<div>
				<BlueButton
					variant="large"
					style={{
						marginBottom: "100px",
						background: isStep0Complete ? "#4792DC" : "#D0D0D0",
					}}
					onClick={handleNext}
				>
					확인
				</BlueButton>
			</div>
		</styled.Container>
	);

	// 회원가입 두번째 화면 - 아이디 비번 입력
	const renderStep1 = () => (
		<styled.Container>
			<div>
				<styled.BackButton src={backbtn} onClick={handleBack} />
				<styled.Title>회원가입</styled.Title>
				<styled.Form onSubmit={handleSubmit}>
					<styled.InputLabel htmlFor="username">
						아이디
					</styled.InputLabel>
					<styled.PasswordInputWrapper>
						<styled.Input
							id="userid"
							name="userid"
							type="text"
							placeholder="아이디를 입력하세요."
							value={formData.userid}
							onChange={handleInputChange}
						/>
						<styled.DupCheckBtn onClick={handleDupCheck}>
							중복확인
						</styled.DupCheckBtn>
					</styled.PasswordInputWrapper>
					<styled.InputLabel htmlFor="username">
						이메일
					</styled.InputLabel>
					<styled.PasswordInputWrapper>
						<styled.Input
							id="email"
							name="email"
							type="text"
							placeholder="이메일을 입력하세요."
							value={formData.email}
							onChange={handleInputChange}
						/>
					</styled.PasswordInputWrapper>
					<styled.InputLabel htmlFor="password">
						비밀번호
					</styled.InputLabel>
					<styled.PasswordInputWrapper>
						<styled.Input
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							placeholder="비밀번호를 입력하세요."
							value={formData.password}
							onChange={handleInputChange}
						/>
						<styled.ShowPasswordIcon
							src={
								showPassword
									? showPasswordIcon
									: hidePasswordIcon
							}
							onClick={togglePasswordVisibility}
							alt={
								showPassword
									? "비밀번호 숨기기"
									: "비밀번호 표시"
							}
						/>
					</styled.PasswordInputWrapper>
					<styled.InputLabel htmlFor="passwordConfirm">
						비밀번호 확인
					</styled.InputLabel>
					<styled.PasswordInputWrapper>
						<styled.Input
							id="passwordConfirm"
							name="passwordConfirm"
							type={showPasswordConfirm ? "text" : "password"}
							placeholder="비밀번호를 입력하세요."
							value={formData.passwordConfirm}
							onChange={handleInputChange}
							style={
								{
									// marginBottom: "0",
								}
							}
						/>
						<styled.ShowPasswordIcon
							src={
								showPasswordConfirm
									? showPasswordIcon
									: hidePasswordIcon
							}
							onClick={() =>
								setShowPasswordConfirm(!showPasswordConfirm)
							}
							alt={
								showPasswordConfirm
									? "비밀번호 숨기기"
									: "비밀번호 표시"
							}
						/>
					</styled.PasswordInputWrapper>
					{formData.passwordConfirm !== "" &&
						formData.password !== formData.passwordConfirm && (
							<styled.ErrorMessage>
								입력하신 비밀번호가 일치하지 않습니다
							</styled.ErrorMessage>
						)}
				</styled.Form>
			</div>
			<div>
				<BlueButton
					variant="large"
					style={{
						marginBottom: "100px",
						background: isStep1Complete ? "#4792DC" : "#D0D0D0",
					}}
					onClick={handleNext}
				>
					확인
				</BlueButton>
			</div>
		</styled.Container>
	);

	// 회원가입 세번째 화면 - 약관 동의
	const renderStep2 = () => (
		<styled.Container>
			<div>
				<styled.BackButton src={backbtn} onClick={handleBack} />
				<styled.Title>약관에 동의해 주세요.</styled.Title>
				<styled.CheckboxAllContainer onClick={handleAllCheck}>
					<styled.Checkbox checked={isTermsChecked} />
					전체 약관에 동의합니다.
				</styled.CheckboxAllContainer>
				<styled.CheckboxContainer
					onClick={() => handleSingleCheck("service")}
				>
					<styled.Checkbox checked={checkboxes.service} />
					서비스 이용 약관
				</styled.CheckboxContainer>
				<styled.CheckboxContainer
					onClick={() => handleSingleCheck("financial")}
				>
					<styled.Checkbox checked={checkboxes.financial} />
					전자금융거래 이용 약관
				</styled.CheckboxContainer>
				<styled.CheckboxContainer
					onClick={() => handleSingleCheck("sms")}
				>
					<styled.Checkbox checked={checkboxes.sms} />
					SMS 인증 약관
				</styled.CheckboxContainer>
				<styled.CheckboxContainer
					onClick={() => handleSingleCheck("personal")}
				>
					<styled.Checkbox checked={checkboxes.personal} />
					개인(신용)정보 관련 이용 약관
				</styled.CheckboxContainer>
				<styled.CheckboxContainer
					onClick={() => handleSingleCheck("benefits")}
				>
					<styled.Checkbox checked={checkboxes.benefits} />
					혜택 정보 수신 동의(선택)
				</styled.CheckboxContainer>
			</div>
			<div>
				<BlueButton
					variant="large"
					style={{
						marginBottom: "100px",
						background: areRequiredTermsAccepted
							? "#4792DC"
							: "#D0D0D0",
					}}
					onClick={
						areRequiredTermsAccepted ? handleSignup : undefined
					}
				>
					확인
				</BlueButton>
			</div>
		</styled.Container>
	);

	const steps = [renderCameraStep, renderStep0, renderStep1, renderStep2];

	return <styled.Container>{steps[currentStep]()}</styled.Container>;
};

export default StepForm;
