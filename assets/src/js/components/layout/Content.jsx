/* react imports */
import { useState, useEffect } from 'react';

/* local script imports */
import { sortList } from '../../scripts/sortList';

/* local component imports */
import Toolbar from '../toolbar/Toolbar';
import Cards from '../cards/Cards';

const Content = (props) => {
	let { utils, builds, theme, cards, filters } = props;
	
	// custom variables
	let [loading, setLoading] = useState(true);
	let [sort, setSort] = useState([]);
	let [pages, setPages] = useState({});
	let [paginated, setPaginated] = useState([]);
	
	useEffect(() => {
		buildToolbar();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function buildToolbar() {
		// reset loading whenever buildToolbar is called
		loading = true;
		setLoading(loading);
		
		if (loading) {
			// step 01: run builds.sort and setSort to state
			sort = await builds.sort(utils, sortList);
			if (sort) {
				setSort(sort);

				// get active sort
				const sortActive = utils.values.active(sort).pop();

				// sort cards with active value
				cards = utils.values.sort(cards, sortActive.type, sortActive.field, sortActive.direction);
			}

			// step 02: run builds.pages and setPages to state
			pages = await builds.pages(utils, theme.cards.pageSize, cards);
			if (pages) {
				setPages(pages);

				// set display of paginated cards
				paginated = pages.build(cards);
				if (paginated) {
					setPaginated(paginated);
				}
			}

			// set loading to false
			setTimeout(() => {
				loading = false;
				setLoading(loading);
			});
		}
	}

	return (
		<section className="layout-column layout-content cards-found">
			<h2 className="cards-count">
				{cards.length} card{cards.length == 1 ? '' : 's'} found
			</h2>

			<Toolbar utils={utils} buildToolbar={buildToolbar} sort={sort} pages={pages} location={'top'} />			

			<Cards utils={utils} theme={theme} cards={paginated} filters={filters} />

			<Toolbar utils={utils} buildToolbar={buildToolbar} sort={sort} pages={pages} location={'bottom'} />
		</section>
	);
};

export default Content;
