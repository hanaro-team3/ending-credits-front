export const convertWebMToMP4 = async (webmBlob: Blob): Promise<Blob> => {
	const audioContext = new AudioContext();
	const arrayBuffer = await webmBlob.arrayBuffer();
	const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

	const destination = audioContext.createMediaStreamDestination();
	const source = audioContext.createBufferSource();
	source.buffer = audioBuffer;
	source.connect(destination);

	const mediaRecorder = new MediaRecorder(destination.stream, {
		mimeType: "audio/mp4",
		audioBitsPerSecond: 128000,
	});

	const chunks: Blob[] = [];

	return new Promise((resolve, reject) => {
		mediaRecorder.ondataavailable = (e) => {
			if (e.data.size > 0) {
				chunks.push(e.data);
			}
		};

		mediaRecorder.onstop = () => {
			const mp4Blob = new Blob(chunks, { type: "audio/mp4" });
			resolve(mp4Blob);
		};

		mediaRecorder.onerror = (err) => {
			reject(err);
		};

		mediaRecorder.start();
		source.start();
		source.onended = () => mediaRecorder.stop();
	});
};
