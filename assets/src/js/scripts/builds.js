export let builds = {
	selected : (utils, selected, filterList) => {
		const paramsList = utils.params.list();

		if (paramsList.length > 0) {
			// configure selected
			selected = paramsList.map((param, index) => {
				let paramValues = param.split('=');
				let selectedDetail = false;

				// parameter pairs should contain two items and be in filterList config
				if (paramValues.length > 1) {
					const indexAdjust = index + 1;
					const paramValue = paramValues[1];
					const paramField = paramValues[0];
					const paramDetail = filterList[paramField] ? filterList[paramField] : false;

					if (paramDetail) {
						const paramId = `${paramDetail.id}-${indexAdjust}`;
						selectedDetail = utils.params.config(indexAdjust, paramId, paramField, paramDetail.label);
						selectedDetail.value = paramValue;
					}
				}

				return selectedDetail;
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
	cards : (utils, selected, cardList) => {
		let cards = utils.flatten(cardList);

		// build modified cardList if selected has values
		if (selected.length > 0) {
			cards = cards.filter((card) => {
				// loop through selected values for each card
				let cardActive = selected.some((select) => {
					const valuesList = utils.setArray(card[select.field]);

					// further, we need to check all values in the cards current field
					// once a match is made, return true
					return valuesList.some((value) => {
						return utils.values.compare(value, select.value);
					});
				});

				return cardActive;
			});
		}

		return cards;
	},
	filters : (utils, cards, filterList) => {
		let filters = utils.flatten(filterList);

		// build modified filterList if cards have values
		if (cards.length > 0) {
			filters = filters.map((filter) => {
				// storage object for values
				let valuesStorage = {};

				// loop through cards and add to valuesStorage
				cards.forEach((card) => {
					const cardValue = card[filter.field];

					if (utils.values.check(cardValue)) {
						const valuesList = utils.setArray(cardValue);

						valuesList.forEach((value) => {
							if (valuesStorage[value]) {
								// if value is already in valuesStorage, add to count
								valuesStorage[value].count++;
							} else {
								const valueString = String(value);
								const valueId = `${filter.id}-${utils.handleize(valueString)}`;
								const valueParameter = `${filter.field}=${valueString.toLowerCase()}`;

								// otherwise add as new to storage
								valuesStorage[value] = utils.params.config(0, valueId, filter.field, valueString);
								valuesStorage[value].value = value;
								valuesStorage[value].count = 1;
								valuesStorage[value].active = utils.params.get().includes(valueParameter); // check if active by looking at params
							}
						});
					}
				});

				// assign filter values based on valuesStorage
				filter.values = Object.keys(valuesStorage).map((value, index) => {
					valuesStorage[value].order = index + 1; // adjust order values after updating values
					return valuesStorage[value];
				});

				// apply sort to values list
				filter.values = utils.values.sort(filter.values, filter.type, 'label', filter.direction);

				return filter;
			});
		}

		return filters;
	},
};
