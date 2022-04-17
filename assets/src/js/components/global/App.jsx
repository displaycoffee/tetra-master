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
	let [selected, setSelected] = useState('');

	useEffect(() => {
		buildSelected();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function buildSelected() {
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

		// set selected filters to state
		setSelected(selected);
	}

	// init modified cardList
	let modifiedCards = cardList;

	// build modified cardList if selected has values
	if (selected.length > 0) {
		modifiedCards = cardList.filter((card) => {
			// loop through selected values for each card
			let cardActive = selected.some((select) => {
				const valuesList = utils.setArray(card[select.field]);

				// further, we need to check all values in the cards current field
				// once a match is made, return true
				return valuesList.some((value) => {
					return String(value) == select.value;
				});
			});

			return cardActive;
		});
	}

	return (
		<div className="wrapper">
			<main className="layout">
				<div className="layout-row flex-nowrap">
					<aside className="layout-column layout-sidebar">
						<Filters cards={modifiedCards} params={params} utils={utils} />
					</aside>

					<section className="layout-column layout-content">
						<h2 className="cards-count">
							{modifiedCards.length} card{modifiedCards.length == 1 ? '' : 's'} found
						</h2>

						<Cards cards={modifiedCards} params={params} utils={utils} />
					</section>
				</div>
			</main>
		</div>
	);
};

export default App;
