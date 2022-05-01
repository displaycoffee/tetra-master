/* react imports */
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

/* local script imports */
import { utils } from '../../scripts/utils';
import { builds } from '../../scripts/builds';
import { cardList } from '../../scripts/cardList';
import { filterList } from '../../scripts/filterList';

/* local component imports */
import Sidebar from './Sidebar';
import Content from './Content';
import NoResults from './NoResults';

const Index = () => {
	// react variables
	let [loading, setLoading] = useState(true);
	const [cookies] = useCookies(['collected']);

	// custom variables
	let [selections, setSelections] = useState([]);
	let [cards, setCards] = useState([]);
	let [filters, setFilters] = useState([]);

	useEffect(() => {
		buildResponse();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function buildResponse() {
		// reset loading whenever buildResponse is called
		loading = true;
		setLoading(true);

		if (loading) {
			// step 01: run builds.selections and setSelections to state
			selections = await builds.selections(utils, filterList);
			if (selections) {
				setSelections(selections);
			}

			// step 02: run builds.cards and setCards to state
			cards = await builds.cards(utils, selections, cardList);
			if (cards) {
				// additionally check if card is collected if cookies.collected is set
				let collectedCookie = cookies?.collected ? cookies.collected : false;
				if (collectedCookie) {
					cards = cards.filter((card) => {
						card.collected = collectedCookie.includes(card.id);
						return card;
					});
				}

				setCards(cards);
			}

			// step 03: run builds.filters and setFilters to state
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

								<Content utils={utils} builds={builds} cards={cards} filterList={filterList} />
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
