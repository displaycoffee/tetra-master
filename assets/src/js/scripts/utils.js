export const utils = {
	searchParams: decodeURIComponent(window.location.search.replace(/^\?/, '')),
	handleize: (value) => {
		return value
			.toLowerCase()
			.replace(/[^\w\s]/g, '')
			.replace(/\s/g, '-')
			.trim();
	},
	checkSelected: (list, selected) => {
		return list.filter((item) => {
			let isActive = false;

			// check selected to see what is active
			for (let i = 0; i < selected.length; i++) {
				const currentSelected = item[selected[i].field];
				const cardValueField =
					typeof currentSelected == 'object'
						? currentSelected
						: [currentSelected];

				for (let j = 0; j < cardValueField.length; j++) {
					const currentValue = cardValueField[j];
					if (String(currentValue) == selected[i].value) {
						isActive = true;
						break;
					}
				}
			}

			return isActive;
		});
	},
};
