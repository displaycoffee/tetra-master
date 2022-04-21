/* react imports */
import { useState, useEffect } from 'react';

/* local script imports */
import { cardList } from '../../scripts/cardList';
import { params } from '../../scripts/params';
import { utils } from '../../scripts/utils';

/*local com ponent imports */
import Sidebar from './Sidebar';
import Content from './Content';
import NoResults from './NoResults';

const App = () => {
	let [selected, setSelected] = useState([]);
	let [cards, setCards] = useState(cardList);
	let [filters, setFilters] = useState([]);

	useEffect(() => {
		buildSelected();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function buildSelected() {
		// init paramsList from window location
		const paramsList = utils.getParams() ? utils.getParams().split('&') : [];

		if (paramsList.length > 0) {
			// if there are parameters, add them to selected
			selected = paramsList.map((param) => {
				let paramValues = param.split('=');
				let selectedConfig = false;

				// param pairs should contain two items in the array and should also be in the params config
				if (paramValues.length > 1 && params[paramValues[0]]) {
					selectedConfig = {
						field: paramValues[0],
						name: params[paramValues[0]].name,
						value: paramValues[1],
					};
				}

				return selectedConfig;
			});

			// filter out selected elements that are invalid parameters
			selected = selected.filter((select) => {
				return select;
			});
		} else {
			selected = [];
		}

		// set selected filters to state
		setSelected(selected);

		// run buildCards after selected is done
		const cardsResponse = await buildCards();
		if (cardsResponse) {
			setCards(cardsResponse);
		}
	}

	async function buildCards() {
		// build modified cardList if selected has values
		if (selected.length > 0) {
			cards = cardList.filter((card) => {
				// loop through selected values for each card
				let cardActive = selected.some((select) => {
					const valuesList = utils.setArray(card[select.field]);

					// further, we need to check all values in the cards current field
					// once a match is made, return true
					return valuesList.some((value) => {
						return utils.compareValues(value, select.value);
					});
				});

				return cardActive;
			});
		} else {
			cards = cardList;
		}

		// run buildFilters after selected is done
		const filtersResponse = await buildFilters();
		if (cards && filtersResponse) {
			setFilters(filtersResponse);
		}

		return cards;
	}

	async function buildFilters() {
		// start by looping through params to build filters
		filters = Object.keys(params).map((param) => {
			// set up filters config
			let filtersConfig = {
				field: param,
				name: params[param].name,
				values: [],
			};

			// storage object for values
			let valuesStorage = {};

			// loop through cards and add to valuesStorage
			cards.forEach((card) => {
				if (utils.checkValue(card[param])) {
					const valuesList = utils.setArray(card[param]);

					valuesList.forEach((value) => {
						if (valuesStorage[value]) {
							// if value is already in valuesStorage, add to count
							valuesStorage[value].count++;
						} else {
							const valueLower = String(value).toLowerCase();

							// otherwise add as new to storage
							valuesStorage[value] = {
								name: String(value),
								value: value,
								count: 1,
								active: utils.getParams().includes(`${param}=${valueLower}`), // check if active by looking at getParams
							};
						}
					});
				}
			});

			// add value object to filtersConfig
			filtersConfig.values = Object.keys(valuesStorage).map((value) => {
				return valuesStorage[value];
			});

			return filtersConfig;
		});

		return filters;
	}

	return (
		<div className="wrapper">
			<main className="layout">
				<div className="layout-row flex-nowrap">
					{cards.length !== 0 ? (
						<>
							<Sidebar filters={filters} utils={utils} selected={selected} buildSelected={buildSelected} />

							<Content cards={cards} params={params} utils={utils} />
						</>
					) : (
						<NoResults />
					)}
				</div>
			</main>
		</div>
	);
};

export default App;
