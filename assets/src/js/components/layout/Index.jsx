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
	let [selections, setSelections] = useState([]);
	let [cards, setCards] = useState([]);
	let [sorts, setSorts] = useState([]);
	let [filters, setFilters] = useState([]);

	useEffect(() => {
		buildSelections();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function buildSelections() {
		// set selections to state
		selections = builds.selections(utils, selections, filterList);
		setSelections(selections);

		// run buildCards after selections are done
		const cardsResponse = await buildCards();
		if (cardsResponse) {
			setCards(cardsResponse);
		}
	}

	async function buildCards() {
		// set cards filters to state
		cards = builds.cards(utils, selections, cardList);
		setCards(cards);

		// set sorts to state
		sorts = builds.sorts(utils, sortList);
		setSorts(sorts);

		// sort cards after cards amd sort is set
		if (sorts && utils.params.get().includes('sort=')) {
			const sortActive = sorts.filter((sort) => {
				return sort.active;
			}).pop();
			
			if (sortActive) {
				cards = utils.values.sort(cards, sortActive.type, sortActive.field, sortActive.direction);
			}
		}		

		// run builds.filters after cards are done
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
							<Sidebar utils={utils} buildSelections={buildSelections} selections={selections} filters={filters} />

							<Content utils={utils}  buildSelections={buildSelections} cards={cards} sorts={sorts} filterList={filterList} />
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
