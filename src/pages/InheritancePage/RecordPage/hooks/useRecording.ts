// import { useState, useRef, useEffect } from "react";

// interface UseRecordingProps {
// 	onRecordingComplete: (blob: Blob) => void;
// }

// export const useRecording = ({ onRecordingComplete }: UseRecordingProps) => {
// 	const [isRecording, setIsRecording] = useState<boolean>(false);
// 	const [showNav, setShowNav] = useState<boolean>(false);
// 	const [error, setError] = useState<string>("");
// 	const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

// 	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
// 	const canvasRef = useRef<HTMLCanvasElement | null>(null);
// 	const audioContextRef = useRef<AudioContext | null>(null);
// 	const analyserRef = useRef<AnalyserNode | null>(null);
// 	const animationFrameRef = useRef<number | null>(null);
// 	const mediaStreamRef = useRef<MediaStream | null>(null);
// 	const chunksRef = useRef<Blob[]>([]);

// 	useEffect(() => {
// 		checkMicrophonePermission();
// 		return () => {
// 			cleanup();
// 		};
// 	}, []);

// 	useEffect(() => {
// 		if (isRecording) {
// 			requestAnimationFrame(draw);
// 		}
// 	}, [isRecording]);

// 	const checkMicrophonePermission = async () => {
// 		try {
// 			const stream = await navigator.mediaDevices.getUserMedia({
// 				audio: true,
// 			});
// 			stream.getTracks().forEach((track) => track.stop());
// 			setPermissionGranted(true);
// 			setError("");
// 		} catch (err) {
// 			setPermissionGranted(false);
// 			setError("마이크 접근 권한이 필요합니다.");
// 		}
// 	};

// 	const cleanup = () => {
// 		if (animationFrameRef.current) {
// 			cancelAnimationFrame(animationFrameRef.current);
// 		}
// 		if (mediaStreamRef.current) {
// 			mediaStreamRef.current.getTracks().forEach((track) => track.stop());
// 		}
// 		if (audioContextRef.current) {
// 			audioContextRef.current.close();
// 		}
// 	};

// 	const draw = () => {
// 		const analyser = analyserRef.current;
// 		const canvas = canvasRef.current;

// 		if (!analyser || !canvas || !isRecording) {
// 			return;
// 		}

// 		const ctx = canvas.getContext("2d");
// 		if (!ctx) {
// 			return;
// 		}

// 		const bufferLength = analyser.frequencyBinCount;
// 		const dataArray = new Uint8Array(bufferLength);
// 		analyser.getByteTimeDomainData(dataArray);

// 		ctx.clearRect(0, 0, canvas.width, canvas.height);
// 		ctx.fillStyle = "#f2f4f5";
// 		ctx.fillRect(0, 0, canvas.width, canvas.height);
// 		ctx.lineWidth = 2;
// 		ctx.strokeStyle = "#4792dc";
// 		ctx.beginPath();

// 		const sliceWidth = canvas.width / bufferLength;
// 		let x = 0;

// 		for (let i = 0; i < bufferLength; i++) {
// 			const v = dataArray[i] / 128.0;
// 			const y = (v * canvas.height) / 2;

// 			if (i === 0) {
// 				ctx.moveTo(x, y);
// 			} else {
// 				ctx.lineTo(x, y);
// 			}

// 			x += sliceWidth;
// 		}

// 		ctx.stroke();
// 		animationFrameRef.current = requestAnimationFrame(draw);
// 	};

// 	const startRecording = async () => {
// 		try {
// 			const stream = await navigator.mediaDevices.getUserMedia({
// 				audio: {
// 					echoCancellation: true,
// 					noiseSuppression: true,
// 					autoGainControl: true,
// 				},
// 			});

// 			setPermissionGranted(true);
// 			setError("");
// 			mediaStreamRef.current = stream;

// 			const mediaRecorder = new MediaRecorder(stream);
// 			mediaRecorderRef.current = mediaRecorder;
// 			chunksRef.current = [];

// 			mediaRecorder.addEventListener("dataavailable", (event) => {
// 				if (event.data.size > 0) {
// 					chunksRef.current.push(event.data);
// 				}
// 			});

// 			mediaRecorder.addEventListener("stop", () => {
// 				const audioBlob = new Blob(chunksRef.current, {
// 					type: "audio/webm",
// 				});
// 				onRecordingComplete(audioBlob);
// 				setShowNav(true);
// 			});

// 			const audioContext = new AudioContext();
// 			audioContextRef.current = audioContext;

// 			const analyser = audioContext.createAnalyser();
// 			analyser.fftSize = 2048;
// 			analyserRef.current = analyser;

// 			const microphone = audioContext.createMediaStreamSource(stream);
// 			microphone.connect(analyser);

// 			mediaRecorder.start();
// 			setIsRecording(true);
// 			setShowNav(false);
// 		} catch (err) {
// 			console.error("Error accessing microphone:", err);
// 			setPermissionGranted(false);
// 			setError("마이크 접근 권한이 필요합니다.");
// 		}
// 	};

// 	const stopRecording = () => {
// 		if (
// 			mediaRecorderRef.current &&
// 			mediaRecorderRef.current.state !== "inactive"
// 		) {
// 			mediaRecorderRef.current.stop();
// 		}
// 		cleanup();
// 		setIsRecording(false);
// 	};

// 	const handleRecordClick = () => {
// 		if (isRecording) {
// 			stopRecording();
// 		} else {
// 			startRecording();
// 		}
// 	};

// 	return {
// 		isRecording,
// 		showNav,
// 		error,
// 		canvasRef,
// 		handleRecordClick,
// 		permissionGranted,
// 	};
// };

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

	// Browser compatibility check for MIME types
	const getSupportedMimeType = () => {
		if (MediaRecorder.isTypeSupported("audio/mpeg")) {
			return "audio/mpeg";
		}
		if (MediaRecorder.isTypeSupported("audio/mp4")) {
			return "audio/mp4";
		}
		if (MediaRecorder.isTypeSupported("audio/mp3")) {
			return "audio/mp3";
		}
		return "audio/webm"; // Fallback
	};

	const convertToMP3 = async (audioData: Blob): Promise<Blob> => {
		const audioContext = new (window.AudioContext ||
			window.webkitAudioContext)();
		const arrayBuffer = await audioData.arrayBuffer();
		const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

		const channels = audioBuffer.numberOfChannels;
		const sampleRate = audioBuffer.sampleRate;
		const length = audioBuffer.length;

		// Create offline context for processing
		const offlineContext = new OfflineAudioContext(
			channels,
			length,
			sampleRate
		);
		const source = offlineContext.createBufferSource();
		source.buffer = audioBuffer;
		source.connect(offlineContext.destination);
		source.start();

		// Render audio
		const renderedBuffer = await offlineContext.startRendering();

		// Convert to MP3 format
		const mp3Data = await encodeMP3(renderedBuffer);
		return new Blob([mp3Data], { type: "audio/mp3" });
	};

	const encodeMP3 = async (
		audioBuffer: AudioBuffer
	): Promise<ArrayBuffer> => {
		const channels = audioBuffer.numberOfChannels;
		const samples = audioBuffer.length;
		const sampleRate = audioBuffer.sampleRate;

		// Create interleaved audio data
		const interleavedData = new Float32Array(samples * channels);
		for (let channel = 0; channel < channels; channel++) {
			const channelData = audioBuffer.getChannelData(channel);
			for (let i = 0; i < samples; i++) {
				interleavedData[i * channels + channel] = channelData[i];
			}
		}

		// Convert to 16-bit PCM
		const pcmData = new Int16Array(interleavedData.length);
		for (let i = 0; i < interleavedData.length; i++) {
			const s = Math.max(-1, Math.min(1, interleavedData[i]));
			pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
		}

		return pcmData.buffer;
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
			const mimeType = getSupportedMimeType();
			const mediaRecorder = new MediaRecorder(stream, {
				mimeType,
				audioBitsPerSecond: 128000,
			});

			mediaRecorderRef.current = mediaRecorder;
			chunksRef.current = [];

			mediaRecorder.addEventListener("dataavailable", (event) => {
				if (event.data.size > 0) {
					chunksRef.current.push(event.data);
				}
			});

			mediaRecorder.addEventListener("stop", async () => {
				try {
					const audioBlob = new Blob(chunksRef.current, {
						type: mimeType,
					});
					const mp3Blob = await convertToMP3(audioBlob);
					onRecordingComplete(mp3Blob);
					setShowNav(true);
				} catch (error) {
					console.error("Error converting to MP3:", error);
					setError("녹음 변환 중 오류가 발생했습니다.");
				}
			});

			const audioContext = new (window.AudioContext ||
				window.webkitAudioContext)();
			audioContextRef.current = audioContext;

			const analyser = audioContext.createAnalyser();
			analyser.fftSize = 2048;
			analyserRef.current = analyser;

			const microphone = audioContext.createMediaStreamSource(stream);
			microphone.connect(analyser);

			mediaRecorder.start();
			setIsRecording(true);
			setShowNav(false);
			setError("");
		} catch (err) {
			console.error("Error accessing microphone:", err);
			setError("마이크 접근 권한이 필요합니다.");
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
