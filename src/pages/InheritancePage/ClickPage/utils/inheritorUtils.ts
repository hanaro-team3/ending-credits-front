// Relation mapping object
export const relationMapping = {
	spouse: "배우자",
	parents: "부모",
	children: "자녀",
	legalHeirs: "법정상속인",
	donation: "국가 등에 기부(유증)",
};

// Get relation in Korean
export const getRelationInKorean = (relationCode: string): string => {
	return (
		relationMapping[relationCode as keyof typeof relationMapping] ||
		relationCode
	);
};

// Save inheritor info to localStorage
export const saveInheritorInfo = (name: string, relation: string) => {
	try {
		const storedData = localStorage.getItem("inheritorInfo");
		let inheritorFrequency: {
			[key: string]: { relation: string; count: number };
		} = {};

		if (storedData) {
			inheritorFrequency = JSON.parse(storedData);
		}

		const key = `${name}|${relation}`;
		inheritorFrequency[key] = {
			relation: relation,
			count: (inheritorFrequency[key]?.count || 0) + 1,
		};

		localStorage.setItem(
			"inheritorInfo",
			JSON.stringify(inheritorFrequency)
		);
	} catch (error) {
		console.error("Error saving to localStorage:", error);
	}
};

// Get top inheritors
export const getTopInheritors = (
	limit: number = 5
): Array<{ name: string; relation: string }> => {
	try {
		const storedData = localStorage.getItem("inheritorInfo");
		if (!storedData) return [];

		const inheritorFrequency = JSON.parse(storedData);

		return Object.entries(inheritorFrequency)
			.sort(([, a], [, b]) => b.count - a.count)
			.slice(0, limit)
			.map(([key, value]) => {
				const [name] = key.split("|");
				return {
					name: name,
					relation: value.relation,
				};
			});
	} catch (error) {
		console.error("Error reading from localStorage:", error);
		return [];
	}
};
