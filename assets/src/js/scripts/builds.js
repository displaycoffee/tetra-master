export let builds = {
	selections : (utils, filterList) => {
		let selections = [];
		const paramsList = utils.params.list();	

		if (paramsList.length > 0) {
			// configure selections
			selections = paramsList.map((param, index) => {
				let paramFilter = param.split('=');				
				let paramValues = paramFilter[1].split(':');
				let selectionDetail = false;

				// parameter pairs should contain two items and be in filterList config
				if (paramValues.length > 1) {
					const indexAdjust = index + 1;
					const paramValue = paramValues[1];
					const paramField = paramValues[0];
					const paramDetail = filterList[paramField] ? filterList[paramField] : false;

					if (paramDetail) {
						const valueId = `${paramDetail.id}-${indexAdjust}`;
						const valueParameter = `${paramField}:${paramValue}`;
						selectionDetail = utils.params.config(indexAdjust, valueId, paramField, paramValue);
						selectionDetail.filterLabel = paramDetail.label;
						selectionDetail.value = valueParameter;
					}
				}

				return selectionDetail;
			});

			// filter invalid selections elements
			selections = selections.filter((select) => {
				return select;
			});
		}
		
		return selections;
	},
	cards : (utils, selections, cardList) => {
		let cards = utils.flatten(cardList);

		// build modified cardList if selections has values
		if (selections.length > 0) {
			cards = cards.filter((card) => {
				// loop through selections values for each card
				let cardActive = selections.some((select) => {
					const valuesList = utils.setArray(card[select.field]);
					
					// further, we need to check all values in the cards current field
					// once a match is made, return true
					return valuesList.some((value) => {
						return utils.values.compare(`${select.field}:${value}`, select.value);
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
								const valueParameter = `${filter.field}:${valueString}`;

								// otherwise add as new to storage
								valuesStorage[value] = utils.params.config(0, valueId, filter.field, valueString);
								valuesStorage[value].value = valueParameter;
								valuesStorage[value].count = 1;
								valuesStorage[value].active = utils.params.get().includes(`${utils.params.url.filter}=${valueParameter}`); // check if active by looking at params
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
	sort : (utils, sortList) => {
		let sort = utils.flatten(sortList);
		const sortParam = `${utils.params.url.sort}=`;
		
		if (sort.length > 0) {
			// build modified sortList
			sort = sort.filter((sort) => {
				// check if active by looking at params and sort.default
				let sortActive = sort.default;				
				if (utils.params.get().includes(sortParam)) {
					sortActive = utils.params.get().includes(`${sortParam}${sort.value}`);
				}
				sort.active = sortActive;
				return sort;
			});
		}
		
		return sort;
	},
	pages : (utils, size, cards) => {
		// set up search params for pagination
		let pageParams = utils.params.get();
		let newParams = new URLSearchParams(String(pageParams));

		// set pages config
		let pages = {
			size : size, // number of cards per row
			build : (list) => {
				// build paginated list
				const pageStart = ((pages.current - 1) * pages.size);
				const pageEnd = (pageStart + pages.size);			
				return list.slice(pageStart, pageEnd);
			}
		};

		// add to pages config
		pages.total = Math.ceil(cards.length / pages.size); // total number of pages
		pages.range = [...(new Array(pages.total))].map((_, i) => i + 1); // array of numbers with all pages
		if (pageParams.includes(`${utils.params.url.page}=`) && newParams.get(utils.params.url.page)) {
			pages.current = Number(newParams.get(utils.params.url.page));
		} else {
			pages.current = 1;
		}

		return pages;
	}
};
