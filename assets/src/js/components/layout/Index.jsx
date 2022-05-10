/* react imports */
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

/* local script imports */
import { theme } from '../../scripts/theme';
import { utils } from '../../scripts/utils';
import { builds } from '../../scripts/builds';
import { cardList } from '../../scripts/cardList';
import { filterList } from '../../scripts/filterList';

/* local component imports */
import Sidebar from './Sidebar';
import Content from './Content';
import NoResults from './NoResults';
import CardDetails from '../cards/CardDetails';

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
		setLoading(loading);

		if (loading) {
			// step 01: run builds.selections and setSelections to state
			selections = await builds.selections(utils, filterList);
			if (selections) {
				setSelections(selections);
			}

			// step 02: run builds.cards and setCards to state
			cards = await builds.cards(utils, selections, cardList, cookies);
			if (cards) {
				setCards(cards);
			}

			// step 03: run builds.filters and setFilters to state
			filters = await builds.filters(utils, cards, filterList);
			if (filters) {
				setFilters(filters);
			}
			
			// set loading to false
			setTimeout(() => {
				loading = false;
				setLoading(loading);
			}, 1000);
		}
	}

	// layout for sidebar and content 
	let mainLayout = <div style={{color: '#ff00ff', fontSize: '30px'}}>Page is loading</div>;
	if (!loading) {
		mainLayout = cards.length !== 0 ? (
			<div className="layout-row flex-nowrap">
				<Sidebar utils={utils} buildResponse={buildResponse} selections={selections} filters={filters} />

				<Content utils={utils} builds={builds} theme={theme} loading={loading} cards={cards} filters={filters} />
			</div>
		) : (<NoResults />);
	}

	return (
			<div className="wrapper">
				<main className="layout">
					<Router>
						<Routes>
							<Route path="/details/:id" element={<CardDetails />} />
							<Route path="/" element={mainLayout} />
						</Routes>
					</Router>
				</main>
			</div>
		
	);
};

export default Index;
