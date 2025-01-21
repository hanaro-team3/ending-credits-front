import React from "react";
import { RecordingProps } from "../types/index";

interface AudioPreviewPageProps extends Omit<RecordingProps, "setFormData"> {}

export const AudioPreviewPage: React.FC<AudioPreviewPageProps> = ({
	formData,
	onNext,
	onPrev,
}) => {
	const createAudioUrl = (blob: Blob | null) => {
		if (!blob) return null;
		return URL.createObjectURL(blob);
	};

	const AudioSection = ({
		title,
		blob,
	}: {
		title: string;
		blob: Blob | null;
	}) => (
		<div className="p-4 bg-white rounded-lg shadow">
			<h3 className="mb-2 text-lg font-semibold">{title}</h3>
			{blob ? (
				<audio controls src={createAudioUrl(blob)} className="w-full" />
			) : (
				<p className="text-gray-500">녹음된 파일이 없습니다.</p>
			)}
		</div>
	);

	return (
		<div className="flex flex-col items-center w-full p-4 space-y-6">
			<h2 style={{ margin: "50px 0" }}>녹음 파일 체크용 임시 페이지</h2>
			<div className="w-full max-w-lg space-y-8">
				<AudioSection
					title="시작 멘트"
					blob={formData.recordings.introductory}
				/>
				<AudioSection
					title="부동산 자산"
					blob={formData.recordings.realEstate}
				/>
				<AudioSection
					title="금융 자산"
					blob={formData.recordings.financial}
				/>
				<AudioSection
					title="기타 자산"
					blob={formData.recordings.other}
				/>
				<AudioSection
					title="선택 사항"
					blob={formData.recordings.optional}
				/>
				<AudioSection
					title="마지막"
					blob={formData.recordings.finish}
				/>
			</div>

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
