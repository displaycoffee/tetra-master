/* react imports */
import { useState, useEffect } from 'react';

/*local component imports */
import Sort from '../toolbar/Sort';
import Pagination from '../toolbar/Pagination';
import Cards from '../cards/Cards';

const Content = (props) => {
	let { utils, buildResponse, sorts, cards, filterList } = props;
	let [pages, setPages] = useState({});
	let [paginated, setPaginated] = useState([]);
	let [loading, setLoading] = useState(true);

	// set staticPages config with properties that don't change
	const staticPages = {
		size : 3, // number of cards per row
		build : (list) => {
			// build paginated list
			const pageStart = ((pages.current - 1) * pages.size);
			const pageEnd = (pageStart + pages.size);			
			return list.slice(pageStart, pageEnd);
		}
	};

	useEffect(() => {
		buildPages();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function buildPages() {
		// reset loading whenever buildPages is called
		loading = true;
		setLoading(true);
		
		if (loading) {
			// set up search params for pagination
			let pageParams = utils.params.get();
			let newParams = new URLSearchParams(String(pageParams));

			// create pages config
			pages = staticPages;
			pages.total = Math.ceil(cards.length / pages.size); // total number of pages
			pages.range = [...(new Array(pages.total))].map((_, i) => i + 1); // array of numbers with all pages
			if (pageParams.includes(`${utils.params.url.page}=`) && newParams.get(utils.params.url.page)) {
				pages.current = Number(newParams.get(utils.params.url.page));
			} else {
				pages.current = 1;
			}
			setPages(pages);

			// set display of paginated cards
			paginated = await pages.build(cards);
			if (paginated) {
				setPaginated(paginated);
			}

			// set loading to false
			setTimeout(() => {
				setLoading(false);
			});
		}
	}

	return (
		<section className="layout-column layout-content cards-found">
			<h2 className="cards-count">
				{cards.length} card{cards.length == 1 ? '' : 's'} found
			</h2>

			<Sort utils={utils} buildResponse={buildResponse} sorts={sorts} />

			<Pagination utils={utils} buildPages={buildPages} pages={pages} />

			<Cards utils={utils} cards={paginated} filterList={filterList} />
		</section>
	);
};

export default Content;
