/* react imports */
import { useState, useEffect } from 'react';

/* local script imports */
import { utils } from '../../scripts/utils';
import { builds } from '../../scripts/builds';
import { cardList } from '../../scripts/cardList';
import { sortList } from '../../scripts/sortList';
import { filterList } from '../../scripts/filterList';

/*local component imports */
import Sidebar from './Sidebar';
import Content from './Content';
import NoResults from './NoResults';

const Index = () => {
	let [loading, setLoading] = useState(true);
	let [selections, setSelections] = useState([]);
	let [cards, setCards] = useState([]);
	let [sorts, setSorts] = useState([]);
	let [filters, setFilters] = useState([]);

	useEffect(() => {
		buildResponse();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function buildResponse() {
		// reset loading whenever buildResponse is called
		loading = true;
		setLoading(true);

		if (loading) {
			// step 01: run build.selections and setSelections to state
			selections = await builds.selections(utils, filterList);
			if (selections) {
				setSelections(selections);
			}

			// step 02: run build.sorts and setSorts to state
			sorts = await builds.sorts(utils, sortList);
			if (sorts) {
				setSorts(sorts);
			}

			// step 03: run build.cards and setCards to state
			cards = await builds.cards(utils, selections, sorts, cardList);
			if (cards) {
				setCards(cards);
			}

			// step 04: run build.filters and setFilters to state
			filters = await builds.filters(utils, cards, filterList);
			if (filters) {
				setFilters(filters);
			}
			
			// set loading to false
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	}

	return (
		loading ? (
			<div style={{color: '#ff00ff', fontSize: '30px'}}>Page is loading</div>
		) : (
			<div className="wrapper">
				<main className="layout">
					<div className="layout-row flex-nowrap">
						{cards.length !== 0 ? (
							<>
								<Sidebar utils={utils} buildResponse={buildResponse} selections={selections} filters={filters} />

								<Content utils={utils} buildResponse={buildResponse} cards={cards} sorts={sorts} filterList={filterList} />
							</>
						) : (
							<NoResults />
						)}
					</div>
				</main>
			</div>
		)
	);
};

export default Index;
