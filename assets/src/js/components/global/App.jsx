/* react imports */
import { useState, useEffect } from 'react';

/* local component imports */
import Filters from '../filters/Filters';
import Cards from '../cards/Cards';

const App = () => {
	let [selectedFilters, setSelected] = useState('');

	useEffect(() => {
		buildSelected();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function buildSelected() {
		// get search parameters from window location
		const searchParams = window.location.search
			.replace(/^\?/, '')
			.replace(/\%20/gi, ' ')
			.split('&');

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

	return (
		<div className="wrapper">
			<main className="layout">
				<div className="layout-row flex-nowrap">
					<aside className="layout-column layout-sidebar">
						<Filters selected={selectedFilters} />
					</aside>

					<section className="layout-column layout-content">
						<Cards selected={selectedFilters} />
					</section>
				</div>
			</main>
		</div>
	);
};

export default App;
