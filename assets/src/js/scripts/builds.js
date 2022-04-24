export let builds = {
	selected: (utils, selected, filterList) => {
		const paramsList = utils.params.list();

		if (paramsList.length > 0) {
			// configure selected
			selected = paramsList.map((param, index) => {
				let paramValues = param.split('=');
				let selectedConfig = false;

				// parameter pairs should contain two items and be in filterList config
				if (paramValues.length > 1) {
					const paramField = paramValues[0];
					const paramValue = paramValues[1];
					const paramDetail = filterList[paramField] ? filterList[paramField] : false;

					if (paramDetail) {
						const paramId = `${paramDetail.id}-${index + 1}`;
						selectedConfig = utils.params.config(paramId, paramField, paramDetail.label, typeof paramValue);
						selectedConfig.value = paramValue;
					}
				}

				return selectedConfig;
			});

			// filter invalid selected elements
			selected = selected.filter((select) => {
				return select;
			});
		} else {
			selected = [];
		}

		return selected;
	},
};
