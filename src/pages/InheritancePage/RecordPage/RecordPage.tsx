import * as styled from "./styles";
import { Link } from "react-router-dom";
import closeicon from "../../../images/close-icon.png";
import React, { useState, useEffect, useRef } from "react";

import BlueButton from "../../../ui/BlueBtn";
import WhiteButton from "../../../ui/WhiteBtn";
import recordbtn from "../../../images/record-button.png";
import pausebtn from "../../../images/pause-button.png";

//pages
import InitialPage from "./InitialPage"; // 초기 페이지
import ProfileViewPage from "../pages/ProfileViewPage"; //페이지 1 - 인적 정보 조회
import SetPersonPage from "../pages/SetPersonPage"; //페이지 6 - 유언 집행자 지정
import ShareTimePage from "../pages/ShareTimePage"; // 페이지 7 - 내용 공유 시점 설정
import WillPage from "../pages/WillPage"; // 페이지 8 - 유언장 완성

interface FormData {
	// Page 1 data
	personalInfo: {
		name: string;
		birthDate: string;
		address: string;
	};
	// Recording data
	recordings: {
		introductory: Blob | null;
		realEstate: Blob | null;
		financial: Blob | null;
		other: Blob | null;
		optional: Blob | null;
		finish: Blob | null;
	};
	// Page 6 data
	executor: {
		name: string;
		relationship: string;
	};
	// Page 7 data
	shareTimingChoice: "anytime" | "sickness" | "death" | null;
}

interface RecordingProps {
	onNext: () => void;
	onPrev: () => void;
	formData: FormData;
	setFormData: (data: FormData) => void;
}

const Header = () => (
	<styled.HeaderContainer>
		<span>유언 녹음</span>
		<Link to="/inheritance" style={{ textDecoration: "none" }}>
			<styled.CloseButton src={closeicon} />
		</Link>
	</styled.HeaderContainer>
);

const RecordingStep1: React.FC<RecordingProps> = ({
	onNext,
	onPrev,
	formData,
	setFormData,
}) => {
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [showNav, setShowNav] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const animationFrameRef = useRef<number | null>(null);
	const mediaStreamRef = useRef<MediaStream | null>(null);
	const chunksRef = useRef<Blob[]>([]);

	useEffect(() => {
		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			if (mediaStreamRef.current) {
				mediaStreamRef.current
					.getTracks()
					.forEach((track) => track.stop());
			}
			if (audioContextRef.current) {
				audioContextRef.current.close();
			}
		};
	}, []);

	useEffect(() => {
		if (isRecording) {
			console.log("isRecording changed to true, starting draw");
			requestAnimationFrame(draw);
		}
	}, [isRecording]);

	const draw = () => {
		const analyser = analyserRef.current;
		const canvas = canvasRef.current;

		if (!analyser || !canvas || !isRecording) {
			return;
		}

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			return;
		}

		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);
		analyser.getByteTimeDomainData(dataArray);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#f2f4f5";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#4792dc";
		ctx.beginPath();

		const sliceWidth = canvas.width / bufferLength;
		let x = 0;

		for (let i = 0; i < bufferLength; i++) {
			const v = dataArray[i] / 128.0;
			const y = (v * canvas.height) / 2;

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}

			x += sliceWidth;
		}

		ctx.stroke();
		animationFrameRef.current = requestAnimationFrame(draw);
	};

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					autoGainControl: true,
				},
			});
			mediaStreamRef.current = stream;

			// MediaRecorder 설정
			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;
			chunksRef.current = [];

			mediaRecorder.addEventListener("dataavailable", (event) => {
				if (event.data.size > 0) {
					chunksRef.current.push(event.data);
				}
			});

			mediaRecorder.addEventListener("stop", () => {
				const audioBlob = new Blob(chunksRef.current, {
					type: "audio/webm",
				});
				setFormData({
					...formData,
					recordings: {
						...formData.recordings,
						introductory: audioBlob,
					},
				});
			});

			// 오디오 시각화 설정
			const audioContext = new AudioContext();
			audioContextRef.current = audioContext;

			const analyser = audioContext.createAnalyser();
			analyser.fftSize = 2048;
			analyserRef.current = analyser;

			const microphone = audioContext.createMediaStreamSource(stream);
			microphone.connect(analyser);

			mediaRecorder.start();
			setIsRecording(true);
			setShowNav(false);
			requestAnimationFrame(draw);
		} catch (err) {
			setError("마이크 접근 권한이 필요합니다.");
			console.error("Error accessing microphone:", err);
		}
	};

	const stopRecording = () => {
		if (
			mediaRecorderRef.current &&
			mediaRecorderRef.current.state !== "inactive"
		) {
			mediaRecorderRef.current.stop();
		}
		if (mediaStreamRef.current) {
			mediaStreamRef.current.getTracks().forEach((track) => track.stop());
		}
		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
		}
		if (audioContextRef.current) {
			audioContextRef.current.close();
		}

		setIsRecording(false);
		setShowNav(true);

		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
		}
	};

	const handleRecordClick = () => {
		if (isRecording) {
			stopRecording();
		} else {
			startRecording();
		}
	};

	return (
		<styled.UploadPageContainer>
			<styled.TopContainer>
				<styled.Title>
					2. <span style={{ color: "#4792dc" }}>녹음 버튼</span>을
					누르고 <br />
					유언 내용을 말씀해 주세요.
				</styled.Title>
				<styled.SubTitle>
					빈 칸에는 필요한 정보를 넣어주시면 돼요.
				</styled.SubTitle>
				<styled.ScriptDiv>
					<div>
						나 <span>[이름]</span>은/는 2025년 1월 7일 <br />
					</div>
					재산 상속을 위한 유언을 남기며,
					<br /> <br />이 모든 내용은 <br /> 자의로 하는 것임을
					밝힙니다.
				</styled.ScriptDiv>
			</styled.TopContainer>

			{isRecording && (
				<styled.WaveformContainer>
					<canvas
						ref={canvasRef}
						width={330}
						height={50}
						style={{
							borderRadius: "8px",
							backgroundColor: "#f2f4f5",
							border: "1px solid #909090",
						}}
					/>
				</styled.WaveformContainer>
			)}

			{error && (
				<div
					style={{
						color: "red",
						textAlign: "center",
						marginTop: "10px",
					}}
				>
					{error}
				</div>
			)}

			{showNav ? (
				<styled.ButtonBottomDiv>
					<WhiteButton
						variant="medium"
						onClick={() => {
							console.log("Page 3 - Going back");
							onPrev();
						}}
						style={{ marginRight: "8px" }}
					>
						이전으로
					</WhiteButton>
					<BlueButton
						variant="medium"
						onClick={() => {
							console.log("Page 3 - Moving forward");
							onNext();
						}}
					>
						다음으로
					</BlueButton>
				</styled.ButtonBottomDiv>
			) : (
				<styled.RecordBottomDiv>
					<styled.RecordButton
						src={isRecording ? pausebtn : recordbtn}
						onClick={handleRecordClick}
						style={{
							transform: isRecording ? "scale(0.9)" : "scale(1)",
							transition: "transform 0.2s",
						}}
					/>
				</styled.RecordBottomDiv>
			)}
		</styled.UploadPageContainer>
	);
};

const RecordingStep2: React.FC<RecordingProps> = ({
	onNext,
	onPrev,
	formData,
	setFormData,
}) => {
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [showNav, setShowNav] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const animationFrameRef = useRef<number | null>(null);
	const mediaStreamRef = useRef<MediaStream | null>(null);
	const chunksRef = useRef<Blob[]>([]);

	useEffect(() => {
		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			if (mediaStreamRef.current) {
				mediaStreamRef.current
					.getTracks()
					.forEach((track) => track.stop());
			}
			if (audioContextRef.current) {
				audioContextRef.current.close();
			}
		};
	}, []);

	useEffect(() => {
		if (isRecording) {
			console.log("isRecording changed to true, starting draw");
			requestAnimationFrame(draw);
		}
	}, [isRecording]);

	const draw = () => {
		const analyser = analyserRef.current;
		const canvas = canvasRef.current;

		if (!analyser || !canvas || !isRecording) {
			return;
		}

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			return;
		}

		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);
		analyser.getByteTimeDomainData(dataArray);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#f2f4f5";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#4792dc";
		ctx.beginPath();

		const sliceWidth = canvas.width / bufferLength;
		let x = 0;

		for (let i = 0; i < bufferLength; i++) {
			const v = dataArray[i] / 128.0;
			const y = (v * canvas.height) / 2;

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}

			x += sliceWidth;
		}

		ctx.stroke();
		animationFrameRef.current = requestAnimationFrame(draw);
	};

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					autoGainControl: true,
				},
			});
			mediaStreamRef.current = stream;

			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;
			chunksRef.current = [];

			mediaRecorder.addEventListener("dataavailable", (event) => {
				if (event.data.size > 0) {
					chunksRef.current.push(event.data);
				}
			});

			mediaRecorder.addEventListener("stop", () => {
				const audioBlob = new Blob(chunksRef.current, {
					type: "audio/webm",
				});
				setFormData({
					...formData,
					recordings: {
						...formData.recordings,
						realEstate: audioBlob,
					},
				});
			});

			const audioContext = new AudioContext();
			audioContextRef.current = audioContext;

			const analyser = audioContext.createAnalyser();
			analyser.fftSize = 2048;
			analyserRef.current = analyser;

			const microphone = audioContext.createMediaStreamSource(stream);
			microphone.connect(analyser);

			mediaRecorder.start();
			setIsRecording(true);
			setShowNav(false);
		} catch (err) {
			setError("마이크 접근 권한이 필요합니다.");
			console.error("Error accessing microphone:", err);
		}
	};

	const stopRecording = () => {
		if (
			mediaRecorderRef.current &&
			mediaRecorderRef.current.state !== "inactive"
		) {
			mediaRecorderRef.current.stop();
		}
		if (mediaStreamRef.current) {
			mediaStreamRef.current.getTracks().forEach((track) => track.stop());
		}
		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
		}
		if (audioContextRef.current) {
			audioContextRef.current.close();
		}

		setIsRecording(false);
		setShowNav(true);

		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
		}
	};

	const handleRecordClick = () => {
		if (isRecording) {
			stopRecording();
		} else {
			startRecording();
		}
	};

	return (
		<styled.UploadPageContainer>
			<styled.TopContainer>
				<styled.Title>
					가지고 계신{" "}
					<span style={{ color: "#4792dc" }}>자산의 종류</span>에 따라
					<br />
					여러 번 녹음을 진행할게요.
				</styled.Title>
				<styled.SubTitle>
					부동산 자산에 대해 녹음을 해주세요.
				</styled.SubTitle>
				<styled.ScriptDiv>
					[부동산 자산] <br />
					<br />
					나는 사후에 내가 보유하고 있는
					<br />
					<div>
						<span>OO시 OO동 OO번 대지</span>를<br />
					</div>
					<div>
						상속인 중 <span>OOO에게</span>
						<br />
					</div>
					전부 상속하겠습니다.
				</styled.ScriptDiv>
			</styled.TopContainer>

			{isRecording && (
				<styled.WaveformContainer>
					<canvas
						ref={canvasRef}
						width={330}
						height={50}
						style={{
							borderRadius: "8px",
							backgroundColor: "#f2f4f5",
							border: "1px solid #909090",
						}}
					/>
				</styled.WaveformContainer>
			)}

			{error && (
				<div
					style={{
						color: "red",
						textAlign: "center",
						marginTop: "10px",
					}}
				>
					{error}
				</div>
			)}

			{showNav ? (
				<styled.ButtonBottomDiv>
					<WhiteButton
						variant="medium"
						onClick={() => {
							console.log("Page 3 - Going back");
							onPrev();
						}}
						style={{ marginRight: "8px" }}
					>
						이전으로
					</WhiteButton>
					<BlueButton
						variant="medium"
						onClick={() => {
							console.log("Page 3 - Moving forward");
							onNext();
						}}
					>
						다음으로
					</BlueButton>
				</styled.ButtonBottomDiv>
			) : (
				<styled.RecordBottomDiv>
					<styled.RecordButton
						src={isRecording ? pausebtn : recordbtn}
						onClick={handleRecordClick}
						style={{
							transform: isRecording ? "scale(0.9)" : "scale(1)",
							transition: "transform 0.2s",
						}}
					/>
				</styled.RecordBottomDiv>
			)}
		</styled.UploadPageContainer>
	);
};

const RecordingStep3: React.FC<RecordingProps> = ({
	onNext,
	onPrev,
	formData,
	setFormData,
}) => {
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [showNav, setShowNav] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const animationFrameRef = useRef<number | null>(null);
	const mediaStreamRef = useRef<MediaStream | null>(null);
	const chunksRef = useRef<Blob[]>([]);

	useEffect(() => {
		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			if (mediaStreamRef.current) {
				mediaStreamRef.current
					.getTracks()
					.forEach((track) => track.stop());
			}
			if (audioContextRef.current) {
				audioContextRef.current.close();
			}
		};
	}, []);

	useEffect(() => {
		if (isRecording) {
			console.log("isRecording changed to true, starting draw");
			requestAnimationFrame(draw);
		}
	}, [isRecording]);

	const draw = () => {
		const analyser = analyserRef.current;
		const canvas = canvasRef.current;

		if (!analyser || !canvas || !isRecording) {
			return;
		}

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			return;
		}

		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);
		analyser.getByteTimeDomainData(dataArray);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#f2f4f5";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#4792dc";
		ctx.beginPath();

		const sliceWidth = canvas.width / bufferLength;
		let x = 0;

		for (let i = 0; i < bufferLength; i++) {
			const v = dataArray[i] / 128.0;
			const y = (v * canvas.height) / 2;

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}

			x += sliceWidth;
		}

		ctx.stroke();
		animationFrameRef.current = requestAnimationFrame(draw);
	};

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					autoGainControl: true,
				},
			});
			mediaStreamRef.current = stream;

			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;
			chunksRef.current = [];

			mediaRecorder.addEventListener("dataavailable", (event) => {
				if (event.data.size > 0) {
					chunksRef.current.push(event.data);
				}
			});

			mediaRecorder.addEventListener("stop", () => {
				const audioBlob = new Blob(chunksRef.current, {
					type: "audio/webm",
				});
				setFormData({
					...formData,
					recordings: {
						...formData.recordings,
						financial: audioBlob,
					},
				});
			});

			const audioContext = new AudioContext();
			audioContextRef.current = audioContext;

			const analyser = audioContext.createAnalyser();
			analyser.fftSize = 2048;
			analyserRef.current = analyser;

			const microphone = audioContext.createMediaStreamSource(stream);
			microphone.connect(analyser);

			mediaRecorder.start();
			setIsRecording(true);
			setShowNav(false);
		} catch (err) {
			setError("마이크 접근 권한이 필요합니다.");
			console.error("Error accessing microphone:", err);
		}
	};

	const stopRecording = () => {
		if (
			mediaRecorderRef.current &&
			mediaRecorderRef.current.state !== "inactive"
		) {
			mediaRecorderRef.current.stop();
		}
		if (mediaStreamRef.current) {
			mediaStreamRef.current.getTracks().forEach((track) => track.stop());
		}
		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
		}
		if (audioContextRef.current) {
			audioContextRef.current.close();
		}

		setIsRecording(false);
		setShowNav(true);

		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
		}
	};

	const handleRecordClick = () => {
		if (isRecording) {
			stopRecording();
		} else {
			startRecording();
		}
	};

	return (
		<styled.UploadPageContainer>
			<styled.TopContainer>
				<styled.Title>
					가지고 계신{" "}
					<span style={{ color: "#4792dc" }}>자산의 종류</span>에 따라
					<br />
					여러 번 녹음을 진행할게요.
				</styled.Title>
				<styled.SubTitle>
					금융 자산에 대해 녹음을 해주세요.
				</styled.SubTitle>
				<styled.ScriptDiv>
					[금융 자산] <br />
					<br />
					나는 사후에 내가 보유하고 있는
					<br />
					<div>
						<span>OO은행 OO계좌 [금액]원</span>을<br />
					</div>
					<div>
						상속인 중 <span>OOO에게</span>
						<br />
					</div>
					전부 상속하겠습니다.
				</styled.ScriptDiv>
			</styled.TopContainer>

			{isRecording && (
				<styled.WaveformContainer>
					<canvas
						ref={canvasRef}
						width={330}
						height={50}
						style={{
							borderRadius: "8px",
							backgroundColor: "#f2f4f5",
							border: "1px solid #909090",
						}}
					/>
				</styled.WaveformContainer>
			)}

			{error && (
				<div
					style={{
						color: "red",
						textAlign: "center",
						marginTop: "10px",
					}}
				>
					{error}
				</div>
			)}

			{showNav ? (
				<styled.ButtonBottomDiv>
					<WhiteButton
						variant="medium"
						onClick={() => {
							console.log("Page 3 - Going back");
							onPrev();
						}}
						style={{ marginRight: "8px" }}
					>
						이전으로
					</WhiteButton>
					<BlueButton
						variant="medium"
						onClick={() => {
							console.log("Page 3 - Moving forward");
							onNext();
						}}
					>
						다음으로
					</BlueButton>
				</styled.ButtonBottomDiv>
			) : (
				<styled.RecordBottomDiv>
					<styled.RecordButton
						src={isRecording ? pausebtn : recordbtn}
						onClick={handleRecordClick}
						style={{
							transform: isRecording ? "scale(0.9)" : "scale(1)",
							transition: "transform 0.2s",
						}}
					/>
				</styled.RecordBottomDiv>
			)}
		</styled.UploadPageContainer>
	);
};

const RecordingStep4: React.FC<RecordingProps> = ({
	onNext,
	onPrev,
	formData,
	setFormData,
}) => {
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [showNav, setShowNav] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const animationFrameRef = useRef<number | null>(null);
	const mediaStreamRef = useRef<MediaStream | null>(null);
	const chunksRef = useRef<Blob[]>([]);

	useEffect(() => {
		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			if (mediaStreamRef.current) {
				mediaStreamRef.current
					.getTracks()
					.forEach((track) => track.stop());
			}
			if (audioContextRef.current) {
				audioContextRef.current.close();
			}
		};
	}, []);

	useEffect(() => {
		if (isRecording) {
			console.log("isRecording changed to true, starting draw");
			requestAnimationFrame(draw);
		}
	}, [isRecording]);

	const draw = () => {
		const analyser = analyserRef.current;
		const canvas = canvasRef.current;

		if (!analyser || !canvas || !isRecording) {
			return;
		}

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			return;
		}

		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);
		analyser.getByteTimeDomainData(dataArray);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#f2f4f5";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#4792dc";
		ctx.beginPath();

		const sliceWidth = canvas.width / bufferLength;
		let x = 0;

		for (let i = 0; i < bufferLength; i++) {
			const v = dataArray[i] / 128.0;
			const y = (v * canvas.height) / 2;

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}

			x += sliceWidth;
		}

		ctx.stroke();
		animationFrameRef.current = requestAnimationFrame(draw);
	};

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					autoGainControl: true,
				},
			});
			mediaStreamRef.current = stream;

			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;
			chunksRef.current = [];

			mediaRecorder.addEventListener("dataavailable", (event) => {
				if (event.data.size > 0) {
					chunksRef.current.push(event.data);
				}
			});

			mediaRecorder.addEventListener("stop", () => {
				const audioBlob = new Blob(chunksRef.current, {
					type: "audio/webm",
				});
				setFormData({
					...formData,
					recordings: {
						...formData.recordings,
						other: audioBlob,
					},
				});
			});

			const audioContext = new AudioContext();
			audioContextRef.current = audioContext;

			const analyser = audioContext.createAnalyser();
			analyser.fftSize = 2048;
			analyserRef.current = analyser;

			const microphone = audioContext.createMediaStreamSource(stream);
			microphone.connect(analyser);

			mediaRecorder.start();
			setIsRecording(true);
			setShowNav(false);
		} catch (err) {
			setError("마이크 접근 권한이 필요합니다.");
			console.error("Error accessing microphone:", err);
		}
	};

	const stopRecording = () => {
		if (
			mediaRecorderRef.current &&
			mediaRecorderRef.current.state !== "inactive"
		) {
			mediaRecorderRef.current.stop();
		}
		if (mediaStreamRef.current) {
			mediaStreamRef.current.getTracks().forEach((track) => track.stop());
		}
		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
		}
		if (audioContextRef.current) {
			audioContextRef.current.close();
		}

		setIsRecording(false);
		setShowNav(true);

		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
		}
	};

	const handleRecordClick = () => {
		if (isRecording) {
			stopRecording();
		} else {
			startRecording();
		}
	};

	return (
		<styled.UploadPageContainer>
			<styled.TopContainer>
				<styled.Title>
					가지고 계신{" "}
					<span style={{ color: "#4792dc" }}>자산의 종류</span>에 따라
					<br />
					여러 번 녹음을 진행할게요.
				</styled.Title>
				<styled.SubTitle>
					기타 자산에 대해 녹음을 해주세요.
				</styled.SubTitle>
				<styled.ScriptDiv>
					[기타 자산] <br />
					<br />
					나는 사후에 <br />
					<div>
						내가 보유하고 있는 <span>OOO</span>을<br />
					</div>
					<div>
						상속인 중 <span>OOO에게</span> <span>O%</span>만큼,
						<br />
					</div>
					<div>
						상속인 중 <span>OOO에게</span> <span>O%</span>만큼,
						<br />
					</div>
					상속하겠습니다.
				</styled.ScriptDiv>
			</styled.TopContainer>

			{isRecording && (
				<styled.WaveformContainer>
					<canvas
						ref={canvasRef}
						width={330}
						height={50}
						style={{
							borderRadius: "8px",
							backgroundColor: "#f2f4f5",
							border: "1px solid #909090",
						}}
					/>
				</styled.WaveformContainer>
			)}

			{error && (
				<div
					style={{
						color: "red",
						textAlign: "center",
						marginTop: "10px",
					}}
				>
					{error}
				</div>
			)}

			{showNav ? (
				<styled.ButtonBottomDiv>
					<WhiteButton
						variant="medium"
						onClick={() => {
							console.log("Page 3 - Going back");
							onPrev();
						}}
						style={{ marginRight: "8px" }}
					>
						이전으로
					</WhiteButton>
					<BlueButton
						variant="medium"
						onClick={() => {
							console.log("Page 3 - Moving forward");
							onNext();
						}}
					>
						다음으로
					</BlueButton>
				</styled.ButtonBottomDiv>
			) : (
				<styled.RecordBottomDiv>
					<styled.RecordButton
						src={isRecording ? pausebtn : recordbtn}
						onClick={handleRecordClick}
						style={{
							transform: isRecording ? "scale(0.9)" : "scale(1)",
							transition: "transform 0.2s",
						}}
					/>
				</styled.RecordBottomDiv>
			)}
		</styled.UploadPageContainer>
	);
};

const RecordingStep5: React.FC<RecordingProps> = ({
	onNext,
	onPrev,
	formData,
	setFormData,
}) => {
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [showNav, setShowNav] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const animationFrameRef = useRef<number | null>(null);
	const mediaStreamRef = useRef<MediaStream | null>(null);
	const chunksRef = useRef<Blob[]>([]);

	useEffect(() => {
		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			if (mediaStreamRef.current) {
				mediaStreamRef.current
					.getTracks()
					.forEach((track) => track.stop());
			}
			if (audioContextRef.current) {
				audioContextRef.current.close();
			}
		};
	}, []);

	useEffect(() => {
		if (isRecording) {
			console.log("isRecording changed to true, starting draw");
			requestAnimationFrame(draw);
		}
	}, [isRecording]);

	const draw = () => {
		const analyser = analyserRef.current;
		const canvas = canvasRef.current;

		if (!analyser || !canvas || !isRecording) {
			return;
		}

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			return;
		}

		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);
		analyser.getByteTimeDomainData(dataArray);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#f2f4f5";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#4792dc";
		ctx.beginPath();

		const sliceWidth = canvas.width / bufferLength;
		let x = 0;

		for (let i = 0; i < bufferLength; i++) {
			const v = dataArray[i] / 128.0;
			const y = (v * canvas.height) / 2;

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}

			x += sliceWidth;
		}

		ctx.stroke();
		animationFrameRef.current = requestAnimationFrame(draw);
	};

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					autoGainControl: true,
				},
			});
			mediaStreamRef.current = stream;

			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;
			chunksRef.current = [];

			mediaRecorder.addEventListener("dataavailable", (event) => {
				if (event.data.size > 0) {
					chunksRef.current.push(event.data);
				}
			});

			mediaRecorder.addEventListener("stop", () => {
				const audioBlob = new Blob(chunksRef.current, {
					type: "audio/webm",
				});
				setFormData({
					...formData,
					recordings: {
						...formData.recordings,
						optional: audioBlob,
					},
				});
			});

			const audioContext = new AudioContext();
			audioContextRef.current = audioContext;

			const analyser = audioContext.createAnalyser();
			analyser.fftSize = 2048;
			analyserRef.current = analyser;

			const microphone = audioContext.createMediaStreamSource(stream);
			microphone.connect(analyser);

			mediaRecorder.start();
			setIsRecording(true);
			setShowNav(false);
		} catch (err) {
			setError("마이크 접근 권한이 필요합니다.");
			console.error("Error accessing microphone:", err);
		}
	};

	const stopRecording = () => {
		if (
			mediaRecorderRef.current &&
			mediaRecorderRef.current.state !== "inactive"
		) {
			mediaRecorderRef.current.stop();
		}
		if (mediaStreamRef.current) {
			mediaStreamRef.current.getTracks().forEach((track) => track.stop());
		}
		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
		}
		if (audioContextRef.current) {
			audioContextRef.current.close();
		}

		setIsRecording(false);
		setShowNav(true);

		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
		}
	};

	const handleRecordClick = () => {
		if (isRecording) {
			stopRecording();
		} else {
			startRecording();
		}
	};

	return (
		<styled.UploadPageContainer>
			<styled.TopContainer>
				<styled.Title>
					선택 사항으로{" "}
					<span style={{ color: "#4792dc" }}>남기고 싶은 말</span>을{" "}
					<br />
					말씀해 주세요.
				</styled.Title>
				<styled.SubTitle>어떤 내용이든 괜찮아요.</styled.SubTitle>
				<styled.ScriptDiv
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						textAlign: "center",
					}}
				>
					자유롭게
					<br />
					말씀해 주세요.
				</styled.ScriptDiv>
			</styled.TopContainer>

			{isRecording && (
				<styled.WaveformContainer>
					<canvas
						ref={canvasRef}
						width={330}
						height={50}
						style={{
							borderRadius: "8px",
							backgroundColor: "#f2f4f5",
							border: "1px solid #909090",
						}}
					/>
				</styled.WaveformContainer>
			)}

			{error && (
				<div
					style={{
						color: "red",
						textAlign: "center",
						marginTop: "10px",
					}}
				>
					{error}
				</div>
			)}

			{showNav ? (
				<styled.ButtonBottomDiv>
					<WhiteButton
						variant="medium"
						onClick={() => {
							console.log("Page 3 - Going back");
							onPrev();
						}}
						style={{ marginRight: "8px" }}
					>
						이전으로
					</WhiteButton>
					<BlueButton
						variant="medium"
						onClick={() => {
							console.log("Page 3 - Moving forward");
							onNext();
						}}
					>
						다음으로
					</BlueButton>
				</styled.ButtonBottomDiv>
			) : (
				<styled.RecordBottomDiv>
					<styled.RecordButton
						src={isRecording ? pausebtn : recordbtn}
						onClick={handleRecordClick}
						style={{
							transform: isRecording ? "scale(0.9)" : "scale(1)",
							transition: "transform 0.2s",
						}}
					/>
				</styled.RecordBottomDiv>
			)}
		</styled.UploadPageContainer>
	);
};

const RecordingStep6: React.FC<RecordingProps> = ({
	onNext,
	onPrev,
	formData,
	setFormData,
}) => {
	const [isRecording, setIsRecording] = useState<boolean>(false);
	const [showNav, setShowNav] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const animationFrameRef = useRef<number | null>(null);
	const mediaStreamRef = useRef<MediaStream | null>(null);
	const chunksRef = useRef<Blob[]>([]);

	useEffect(() => {
		return () => {
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			if (mediaStreamRef.current) {
				mediaStreamRef.current
					.getTracks()
					.forEach((track) => track.stop());
			}
			if (audioContextRef.current) {
				audioContextRef.current.close();
			}
		};
	}, []);

	useEffect(() => {
		if (isRecording) {
			console.log("isRecording changed to true, starting draw");
			requestAnimationFrame(draw);
		}
	}, [isRecording]);

	const draw = () => {
		const analyser = analyserRef.current;
		const canvas = canvasRef.current;

		if (!analyser || !canvas || !isRecording) {
			return;
		}

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			return;
		}

		const bufferLength = analyser.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);
		analyser.getByteTimeDomainData(dataArray);

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#f2f4f5";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.lineWidth = 2;
		ctx.strokeStyle = "#4792dc";
		ctx.beginPath();

		const sliceWidth = canvas.width / bufferLength;
		let x = 0;

		for (let i = 0; i < bufferLength; i++) {
			const v = dataArray[i] / 128.0;
			const y = (v * canvas.height) / 2;

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}

			x += sliceWidth;
		}

		ctx.stroke();
		animationFrameRef.current = requestAnimationFrame(draw);
	};

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					autoGainControl: true,
				},
			});
			mediaStreamRef.current = stream;

			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;
			chunksRef.current = [];

			mediaRecorder.addEventListener("dataavailable", (event) => {
				if (event.data.size > 0) {
					chunksRef.current.push(event.data);
				}
			});

			mediaRecorder.addEventListener("stop", () => {
				const audioBlob = new Blob(chunksRef.current, {
					type: "audio/webm",
				});
				setFormData({
					...formData,
					recordings: {
						...formData.recordings,
						finish: audioBlob,
					},
				});
			});

			const audioContext = new AudioContext();
			audioContextRef.current = audioContext;

			const analyser = audioContext.createAnalyser();
			analyser.fftSize = 2048;
			analyserRef.current = analyser;

			const microphone = audioContext.createMediaStreamSource(stream);
			microphone.connect(analyser);

			mediaRecorder.start();
			setIsRecording(true);
			setShowNav(false);
		} catch (err) {
			setError("마이크 접근 권한이 필요합니다.");
			console.error("Error accessing microphone:", err);
		}
	};

	const stopRecording = () => {
		if (
			mediaRecorderRef.current &&
			mediaRecorderRef.current.state !== "inactive"
		) {
			mediaRecorderRef.current.stop();
		}
		if (mediaStreamRef.current) {
			mediaStreamRef.current.getTracks().forEach((track) => track.stop());
		}
		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
		}
		if (audioContextRef.current) {
			audioContextRef.current.close();
		}

		setIsRecording(false);
		setShowNav(true);

		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
		}
	};

	const handleRecordClick = () => {
		if (isRecording) {
			stopRecording();
		} else {
			startRecording();
		}
	};

	return (
		<styled.UploadPageContainer>
			<styled.TopContainer>
				<styled.Title>
					이제 <span style={{ color: "#4792dc" }}>마지막</span>이에요.
				</styled.Title>
				<styled.SubTitle>
					유언장이 법적 효력을 가질 수 있도록
					<br /> 화면에 보이는 내용을 따라 읽어주세요.
				</styled.SubTitle>
				<styled.ScriptDiv>
					이 녹음은
					<br />
					저의 유언장을
					<br />
					설망하는 데 사용되며,
					<br />
					다른 모든 이전의 유언장을 <br />
					무효화 합니다.
					<br />
					<br />
					저는 이 유언이 저의 진심이며,
					<br />
					법적 구속력이 있길 원합니다.
					<br />
					이상으로 유언 내용을 마칩니다.
				</styled.ScriptDiv>
			</styled.TopContainer>

			{isRecording && (
				<styled.WaveformContainer>
					<canvas
						ref={canvasRef}
						width={330}
						height={50}
						style={{
							borderRadius: "8px",
							backgroundColor: "#f2f4f5",
							border: "1px solid #909090",
						}}
					/>
				</styled.WaveformContainer>
			)}

			{error && (
				<div
					style={{
						color: "red",
						textAlign: "center",
						marginTop: "10px",
					}}
				>
					{error}
				</div>
			)}

			{showNav ? (
				<styled.ButtonBottomDiv>
					<WhiteButton
						variant="medium"
						onClick={() => {
							console.log("Page 3 - Going back");
							onPrev();
						}}
						style={{ marginRight: "8px" }}
					>
						이전으로
					</WhiteButton>
					<BlueButton
						variant="medium"
						onClick={() => {
							console.log("Page 3 - Moving forward");
							onNext();
						}}
					>
						다음으로
					</BlueButton>
				</styled.ButtonBottomDiv>
			) : (
				<styled.RecordBottomDiv>
					<styled.RecordButton
						src={isRecording ? pausebtn : recordbtn}
						onClick={handleRecordClick}
						style={{
							transform: isRecording ? "scale(0.9)" : "scale(1)",
							transition: "transform 0.2s",
						}}
					/>
				</styled.RecordBottomDiv>
			)}
		</styled.UploadPageContainer>
	);
};

const AudioPreviewPage = ({ formData, onNext, onPrev }) => {
	const createAudioUrl = (blob) => {
		if (!blob) return null;
		return URL.createObjectURL(blob);
	};

	return (
		<div className="flex flex-col items-center w-full p-4 space-y-6">
			<h2 style={{ margin: "50px 0" }}>녹음 파일 체크용 임시 페이지</h2>
			<div className="w-full max-w-lg space-y-8">
				{/* 시작 멘트 녹음 */}
				<div className="p-4 bg-white rounded-lg shadow">
					<h3 className="mb-2 text-lg font-semibold">시작 멘트</h3>
					{formData.recordings.introductory ? (
						<audio
							controls
							src={createAudioUrl(
								formData.recordings.introductory
							)}
							className="w-full"
						/>
					) : (
						<p className="text-gray-500">녹음된 파일이 없습니다.</p>
					)}
				</div>

				{/* 부동산 자산 녹음 */}
				<div className="p-4 bg-white rounded-lg shadow">
					<h3 className="mb-2 text-lg font-semibold">부동산 자산</h3>
					{formData.recordings.realEstate ? (
						<audio
							controls
							src={createAudioUrl(formData.recordings.realEstate)}
							className="w-full"
						/>
					) : (
						<p className="text-gray-500">녹음된 파일이 없습니다.</p>
					)}
				</div>

				{/* 금융 자산 녹음 */}
				<div className="p-4 bg-white rounded-lg shadow">
					<h3 className="mb-2 text-lg font-semibold">금융 자산</h3>
					{formData.recordings.financial ? (
						<audio
							controls
							src={createAudioUrl(formData.recordings.financial)}
							className="w-full"
						/>
					) : (
						<p className="text-gray-500">녹음된 파일이 없습니다.</p>
					)}
				</div>

				{/* 기타 자산 녹음 */}
				<div className="p-4 bg-white rounded-lg shadow">
					<h3 className="mb-2 text-lg font-semibold">기타 자산</h3>
					{formData.recordings.other ? (
						<audio
							controls
							src={createAudioUrl(formData.recordings.other)}
							className="w-full"
						/>
					) : (
						<p className="text-gray-500">녹음된 파일이 없습니다.</p>
					)}
				</div>

				{/* 선택 사항 녹음 */}
				<div className="p-4 bg-white rounded-lg shadow">
					<h3 className="mb-2 text-lg font-semibold">선택 사항</h3>
					{formData.recordings.optional ? (
						<audio
							controls
							src={createAudioUrl(formData.recordings.optional)}
							className="w-full"
						/>
					) : (
						<p className="text-gray-500">녹음된 파일이 없습니다.</p>
					)}
				</div>

				{/* 선택 사항 녹음 */}
				<div className="p-4 bg-white rounded-lg shadow">
					<h3 className="mb-2 text-lg font-semibold">마지막</h3>
					{formData.recordings.finish ? (
						<audio
							controls
							src={createAudioUrl(formData.recordings.finish)}
							className="w-full"
						/>
					) : (
						<p className="text-gray-500">녹음된 파일이 없습니다.</p>
					)}
				</div>
			</div>

			{/* Navigation Buttons */}
			<div className="w-full max-w-lg flex justify-between mt-6">
				<button
					onClick={onPrev}
					className="px-4 py-2 border rounded hover:bg-gray-50"
				>
					이전으로
				</button>
				<button
					onClick={onNext}
					className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					다음으로
				</button>
			</div>
		</div>
	);
};

function RecordPage() {
	const [currentPage, setCurrentPage] = useState(0);
	const [formData, setFormData] = useState<FormData>({
		personalInfo: {
			name: "홍길동",
			birthDate: "19OO. OO. OO.",
			address: "서울특별시 OO구 OO동 OO아파트 O동 O호",
		},
		recordings: {
			introductory: null,
			realEstate: null,
			financial: null,
			other: null,
			optional: null,
			finish: null,
		},
		executor: {
			name: "",
			relationship: "",
		},
		shareTimingChoice: null,
	});

	const handleNext = () => {
		console.log(`Moving from page ${currentPage} to ${currentPage + 1}`);
		console.log("Current form data:", formData);
		setCurrentPage((prev) => prev + 1);
	};

	const handlePrev = () => {
		console.log(`Moving from page ${currentPage} to ${currentPage - 1}`);
		console.log("Current form data:", formData);
		setCurrentPage((prev) => Math.max(0, prev - 1));
	};

	const renderPage = () => {
		switch (currentPage) {
			case 0:
				return <InitialPage onStartUpload={handleNext} />;
			case 1:
				return (
					<ProfileViewPage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 2:
				return (
					<RecordingStep1
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 3:
				return (
					<RecordingStep2
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 4:
				return (
					<RecordingStep3
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);

			case 5:
				return (
					<RecordingStep4
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);

			case 6:
				return (
					<RecordingStep5
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);

			case 7:
				return (
					<RecordingStep6
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);

			case 8:
				return (
					<AudioPreviewPage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
					/>
				);

			case 9:
				return (
					<SetPersonPage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);

			case 10:
				return (
					<ShareTimePage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
					/>
				);
			case 11:
				return (
					<WillPage
						onNext={handleNext}
						onPrev={handlePrev}
						formData={formData}
						setFormData={setFormData}
						setCurrentPage={setCurrentPage}
					/>
				);

			default:
				return null;
		}
	};

	return (
		<styled.Container>
			<Header />
			{renderPage()}
		</styled.Container>
	);
}

export default RecordPage;
