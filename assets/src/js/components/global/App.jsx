/* react imports */
import { useState, useEffect } from 'react';

/* local script imports */
import { cardList } from '../../scripts/cardList';
import { params } from '../../scripts/params';
import { utils } from '../../scripts/utils';

/* local component imports */
import Cards from '../cards/Cards';
import Filters from '../filters/Filters';

const App = () => {
	let [selected, setSelected] = useState([]);
	let [cards, setCards] = useState(cardList);
	let [filters, setFilters] = useState([]);

	useEffect(() => {
		buildSelected();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function buildSelected() {
		if (selected.length <= 0) {
			// init paramsList from window location
			const paramsList = utils.searchParams ? utils.searchParams.split('&') : [];

			if (paramsList.length > 0) {
				// if there are parameters, add them to selected
				selected = paramsList.map((param) => {
					let paramValues = param.split('=');
					let selectedConfig = false;
					if (paramValues.length > 1) {
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
			}
		}

		// set selected filters to state
		setSelected(selected);

		// run buildCards after selected is done
		buildCards();

		console.log('buildSelectedHappened');
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
						return String(value) == String(select.value);
					});
				});

				return cardActive;
			});
		}

		// set modified cards to state
		setCards(cards);

		//
		buildFilters();

		console.log('buildCardsHappened');
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
							const valueLower = typeof value == 'string' ? value.toLowerCase() : value;

							// otherwise add as new to storage
							valuesStorage[value] = {
								name: String(value),
								value: value,
								count: 1,
								active: utils.searchParams.includes(`${param}=${valueLower}`), // check if active by looking at searchParams
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

		setFilters(filters);

		console.log('buildFilterssHappened');

		//console.log('in build', filters);
	}

	return (
		<div className="wrapper">
			<main className="layout">
				<div className="layout-row flex-nowrap">
					<aside className="layout-column layout-sidebar">
						<Filters cards={cards} params={params} utils={utils} selected={selected} setSelected={setSelected} buildSelected={buildSelected} buildCards={buildCards} filters={filters} setFilters={setFilters} />
					</aside>

					<section className="layout-column layout-content">
						<h2 className="cards-count">
							{cards.length} card{cards.length == 1 ? '' : 's'} found
						</h2>

						<Cards cards={cards} params={params} utils={utils} />
					</section>
				</div>
			</main>
		</div>
	);
};

export default App;
