/* react imports */
import { useState, useEffect } from 'react';

/* local script imports */
import { cardList } from '../../scripts/cardList';
import { filterList } from '../../scripts/filterList';
import { utils } from '../../scripts/utils';
import { builds } from '../../scripts/builds';

/*local component imports */
import Sidebar from './Sidebar';
import Content from './Content';
import NoResults from './NoResults';

const Index = () => {
	let [selected, setSelected] = useState([]);
	let [cards, setCards] = useState(cardList);
	let [filters, setFilters] = useState([]);

	useEffect(() => {
		buildSelected(true);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function buildSelected(buildNext) {
		// set selected filters to state
		selected = builds.selected(utils, selected, filterList);
		setSelected(selected);

		// run buildCards after selected is done
		// if (buildNext) {
		// 	const cardsResponse = await buildCards(true);
		// 	if (cardsResponse) {
		// 		setCards(cardsResponse);
		// 	}
		// }
	}

	// async function buildCards(buildNext) {
	// 	// build modified cardList if selected has values
	// 	if (selected.length > 0) {
	// 		cards = cardList.filter((card) => {
	// 			// loop through selected values for each card
	// 			let cardActive = selected.some((select) => {
	// 				const valuesList = utils.setArray(card[select.field]);

	// 				// further, we need to check all values in the cards current field
	// 				// once a match is made, return true
	// 				return valuesList.some((value) => {
	// 					return utils.compareValues(value, select.value);
	// 				});
	// 			});

	// 			return cardActive;
	// 		});
	// 	} else {
	// 		cards = cardList;
	// 	}

	// 	// run buildFilters after selected is done
	// 	if (buildNext) {
	// 		const filtersResponse = await buildFilters();
	// 		if (cards && filtersResponse) {
	// 			setFilters(filtersResponse);
	// 		}
	// 	}

	// 	return cards;
	// }

	// async function buildFilters() {
	// 	// start by looping through filterList to build filters
	// 	filters = Object.keys(filterList).map((filter) => {
	// 		// set up filters config
	// 		let filtersConfig = {
	// 			field: filter,
	// 			name: filterList[filter].name,
	// 			values: [],
	// 		};

	// 		// storage object for values
	// 		let valuesStorage = {};

	// 		// loop through cards and add to valuesStorage
	// 		cards.forEach((card) => {
	// 			if (utils.checkValue(card[filter])) {
	// 				const valuesList = utils.setArray(card[filter]);

	// 				valuesList.forEach((value) => {
	// 					if (valuesStorage[value]) {
	// 						// if value is already in valuesStorage, add to count
	// 						valuesStorage[value].count++;
	// 					} else {
	// 						const valueLower = String(value).toLowerCase();

	// 						// otherwise add as new to storage
	// 						valuesStorage[value] = {
	// 							name: String(value),
	// 							value: value,
	// 							count: 1,
	// 							active: utils.params.get().includes(`${filter}=${valueLower}`), // check if active by looking at utils.params.get
	// 						};
	// 					}
	// 				});
	// 			}
	// 		});

	// 		// add value object to filtersConfig
	// 		filtersConfig.values = Object.keys(valuesStorage).map((value) => {
	// 			return valuesStorage[value];
	// 		});

	// 		// apply sort to values list
	// 		filtersConfig.values = utils.sortValues(filtersConfig.values, 'string', 'value', 'asc');

	// 		return filtersConfig;
	// 	});

	// 	return filters;
	// }

	return (
		<div className="wrapper">
			<main className="layout">
				<div className="layout-row flex-nowrap">
					{cards.length !== 0 ? (
						<>
							<Sidebar filters={filters} utils={utils} selected={selected} buildSelected={buildSelected} />

							{/* <Content cards={cards} filterList={filterList} utils={utils} /> */}
						</>
					) : (
						<NoResults />
					)}
				</div>
			</main>
		</div>
	);
};

export default Index;
