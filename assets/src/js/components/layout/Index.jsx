/* react imports */
import { useState, useEffect } from 'react';

/* local script imports */
import { filterList } from '../../scripts/filterList';
import { cardList } from '../../scripts/cardList';
import { utils } from '../../scripts/utils';
import { builds } from '../../scripts/builds';

/*local component imports */
import Sidebar from './Sidebar';
import Content from './Content';
import NoResults from './NoResults';

const Index = () => {
	let [selections, setSelections] = useState([]);
	let [cards, setCards] = useState([]);
	let [filters, setFilters] = useState([]);

	useEffect(() => {
		buildSelections();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function buildSelections() {
		// set selections to state
		selections = builds.selections(utils, selections, filterList);
		setSelections(selections);

		// run buildCards after selections is done
		const cardsResponse = await buildCards();
		if (cardsResponse) {
			setCards(cardsResponse);
		}
	}

	async function buildCards() {
		// set cards filters to state
		cards = builds.cards(utils, selections, cardList);
		setCards(cards);

		// run buildFilters after selections is done
		const filtersResponse = await builds.filters(utils, cards, filterList);
		if (cards && filtersResponse) {
			setFilters(filtersResponse);
		}
	}

	return (
		<div className="wrapper">
			<main className="layout">
				<div className="layout-row flex-nowrap">
					{cards.length !== 0 ? (
						<>
							<Sidebar filters={filters} utils={utils} selections={selections} buildSelections={buildSelections} />

							<Content cards={cards} filterList={filterList} utils={utils} />
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
