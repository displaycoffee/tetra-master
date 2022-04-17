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
				if (String(item[selected[i].field]) == selected[i].value) {
					isActive = true;
					break;
				}
			}

			return isActive;
		});
	},
};
