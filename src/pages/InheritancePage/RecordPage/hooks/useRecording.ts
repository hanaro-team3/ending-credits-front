import { useState, useRef, useEffect } from "react";

interface UseRecordingProps {
	onRecordingComplete: (blob: Blob) => void;
}

export const useRecording = ({ onRecordingComplete }: UseRecordingProps) => {
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
				onRecordingComplete(audioBlob);
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

	return {
		isRecording,
		showNav,
		error,
		canvasRef,
		handleRecordClick,
	};
};
