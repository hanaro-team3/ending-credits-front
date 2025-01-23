import lamejs from "lamejs";

export const convertWebMToMP3 = async (webmBlob: Blob): Promise<Blob> => {
	// Convert WebM to PCM
	const audioContext = new AudioContext();
	const arrayBuffer = await webmBlob.arrayBuffer();
	const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

	// Get raw audio data
	const channelData = audioBuffer.getChannelData(0);
	const samples = new Int16Array(channelData.length);

	// Convert float32 to int16
	for (let i = 0; i < channelData.length; i++) {
		const s = Math.max(-1, Math.min(1, channelData[i]));
		samples[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
	}

	// Initialize MP3 encoder
	const mp3encoder = new lamejs.Mp3Encoder(1, audioBuffer.sampleRate, 128);
	const mp3Data = [];

	// Encode to MP3
	const blockSize = 1152;
	for (let i = 0; i < samples.length; i += blockSize) {
		const sampleChunk = samples.subarray(i, i + blockSize);
		const mp3buf = mp3encoder.encodeBuffer(sampleChunk);
		if (mp3buf.length > 0) {
			mp3Data.push(mp3buf);
		}
	}

	// Get the last chunk of MP3 data
	const mp3buf = mp3encoder.flush();
	if (mp3buf.length > 0) {
		mp3Data.push(mp3buf);
	}

	// Combine chunks into a single Blob
	return new Blob(mp3Data, { type: "audio/mp3" });
};
