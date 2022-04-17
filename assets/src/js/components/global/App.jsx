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
	let [selectedFilters, setSelected] = useState('');

	useEffect(() => {
		buildSelected();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function buildSelected() {
		// get search parameters from window location
		const searchParams = utils.searchParams
			? utils.searchParams.split('&')
			: [];

		// if there are parameters add them to selected
		if (searchParams.length > 0) {
			selectedFilters = searchParams.map((param) => {
				let currentParam = param.split('=');
				return {
					field: currentParam[0],
					value: currentParam[1],
				};
			});
		}

		// set selected filters to state
		setSelected(selectedFilters);
	}

	// build modified card list
	let modifiedCards =
		selectedFilters.length > 0
			? utils.checkSelected(cardList, selectedFilters)
			: cardList;

	return (
		<div className="wrapper">
			<main className="layout">
				<div className="layout-row flex-nowrap">
					<aside className="layout-column layout-sidebar">
						<Filters
							cards={modifiedCards}
							params={params}
							utils={utils}
						/>
					</aside>

					<section className="layout-column layout-content">
						<Cards
							cards={modifiedCards}
							params={params}
							utils={utils}
						/>
					</section>
				</div>
			</main>
		</div>
	);
};

export default App;
