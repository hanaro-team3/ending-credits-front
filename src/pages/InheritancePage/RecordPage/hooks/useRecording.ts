// import { useState, useRef, useEffect } from "react";

// interface UseRecordingProps {
// 	onRecordingComplete: (blob: Blob) => void;
// }

// export const useRecording = ({ onRecordingComplete }: UseRecordingProps) => {
// 	const [isRecording, setIsRecording] = useState<boolean>(false);
// 	const [showNav, setShowNav] = useState<boolean>(false);
// 	const [error, setError] = useState<string>("");

// 	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
// 	const canvasRef = useRef<HTMLCanvasElement | null>(null);
// 	const audioContextRef = useRef<AudioContext | null>(null);
// 	const analyserRef = useRef<AnalyserNode | null>(null);
// 	const animationFrameRef = useRef<number | null>(null);
// 	const mediaStreamRef = useRef<MediaStream | null>(null);
// 	const chunksRef = useRef<Blob[]>([]);

// 	useEffect(() => {
// 		return () => {
// 			if (animationFrameRef.current) {
// 				cancelAnimationFrame(animationFrameRef.current);
// 			}
// 			if (mediaStreamRef.current) {
// 				mediaStreamRef.current
// 					.getTracks()
// 					.forEach((track) => track.stop());
// 			}
// 			if (audioContextRef.current) {
// 				audioContextRef.current.close();
// 			}
// 		};
// 	}, []);

// 	useEffect(() => {
// 		if (isRecording) {
// 			requestAnimationFrame(draw);
// 		}
// 	}, [isRecording]);

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
// 			setError("마이크 접근 권한이 필요합니다.");
// 			console.error("Error accessing microphone:", err);
// 		}
// 	};

// 	const stopRecording = () => {
// 		if (
// 			mediaRecorderRef.current &&
// 			mediaRecorderRef.current.state !== "inactive"
// 		) {
// 			mediaRecorderRef.current.stop();
// 		}
// 		if (mediaStreamRef.current) {
// 			mediaStreamRef.current.getTracks().forEach((track) => track.stop());
// 		}
// 		if (animationFrameRef.current) {
// 			cancelAnimationFrame(animationFrameRef.current);
// 		}
// 		if (audioContextRef.current) {
// 			audioContextRef.current.close();
// 		}

// 		setIsRecording(false);
// 		setShowNav(true);

// 		const canvas = canvasRef.current;
// 		if (canvas) {
// 			const ctx = canvas.getContext("2d");
// 			if (ctx) {
// 				ctx.clearRect(0, 0, canvas.width, canvas.height);
// 			}
// 		}
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

	const convertToMp3 = async (audioData: Blob): Promise<Blob> => {
		const audioContext = new AudioContext();
		const arrayBuffer = await audioData.arrayBuffer();
		const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

		const offlineContext = new OfflineAudioContext({
			numberOfChannels: audioBuffer.numberOfChannels,
			length: audioBuffer.length,
			sampleRate: audioBuffer.sampleRate,
		});

		const source = offlineContext.createBufferSource();
		source.buffer = audioBuffer;
		source.connect(offlineContext.destination);
		source.start();

		const renderedBuffer = await offlineContext.startRendering();

		// Convert AudioBuffer to WAV format
		const wav = audioBufferToWav(renderedBuffer);

		// Return as MP3 blob
		return new Blob([wav], { type: "audio/mp3" });
	};

	const audioBufferToWav = (buffer: AudioBuffer): ArrayBuffer => {
		const interleaved = interleaveChannels(buffer);
		const dataView = createWavHeader(buffer, interleaved.length);
		const wavBytes = new Uint8Array(
			dataView.buffer.byteLength + interleaved.length
		);
		wavBytes.set(new Uint8Array(dataView.buffer), 0);
		wavBytes.set(interleaved, dataView.buffer.byteLength);
		return wavBytes.buffer;
	};

	const interleaveChannels = (buffer: AudioBuffer): Float32Array => {
		const numberOfChannels = buffer.numberOfChannels;
		const length = buffer.length * numberOfChannels;
		const result = new Float32Array(length);

		for (let i = 0; i < buffer.length; i++) {
			for (let channel = 0; channel < numberOfChannels; channel++) {
				result[i * numberOfChannels + channel] =
					buffer.getChannelData(channel)[i];
			}
		}

		return result;
	};

	const createWavHeader = (
		buffer: AudioBuffer,
		dataLength: number
	): DataView => {
		const header = new ArrayBuffer(44);
		const view = new DataView(header);

		// RIFF chunk descriptor
		writeString(view, 0, "RIFF");
		view.setUint32(4, 36 + dataLength, true);
		writeString(view, 8, "WAVE");

		// fmt sub-chunk
		writeString(view, 12, "fmt ");
		view.setUint32(16, 16, true);
		view.setUint16(20, 1, true);
		view.setUint16(22, buffer.numberOfChannels, true);
		view.setUint32(24, buffer.sampleRate, true);
		view.setUint32(28, buffer.sampleRate * 4, true);
		view.setUint16(32, 4, true);
		view.setUint16(34, 16, true);

		// data sub-chunk
		writeString(view, 36, "data");
		view.setUint32(40, dataLength, true);

		return view;
	};

	const writeString = (
		view: DataView,
		offset: number,
		string: string
	): void => {
		for (let i = 0; i < string.length; i++) {
			view.setUint8(offset + i, string.charCodeAt(i));
		}
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

			const mediaRecorder = new MediaRecorder(stream, {
				mimeType: "audio/webm;codecs=opus",
			});
			mediaRecorderRef.current = mediaRecorder;
			chunksRef.current = [];

			mediaRecorder.addEventListener("dataavailable", (event) => {
				if (event.data.size > 0) {
					chunksRef.current.push(event.data);
				}
			});

			mediaRecorder.addEventListener("stop", async () => {
				const audioBlob = new Blob(chunksRef.current, {
					type: "audio/webm",
				});

				try {
					const mp3Blob = await convertToMp3(audioBlob);
					onRecordingComplete(mp3Blob);
				} catch (err) {
					console.error("Error converting to MP3:", err);
					setError("오디오 변환 중 오류가 발생했습니다.");
				}
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
