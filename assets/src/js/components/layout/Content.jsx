/*local component imports */
import Sort from '../toolbar/Sort';
import Pagination from '../toolbar/Pagination';
import Cards from '../cards/Cards';

const Content = (props) => {
	let { utils, buildResponse, cards, sorts, filterList } = props;

	let pagesTotal = Math.ceil(cards.length / 3);
	let pages = {
		perPage : 3,
		total : pagesTotal,
		range : [...(new Array(pagesTotal))].map((_, i) => i + 1),
		current: 1
	};
	let paginatedCards = cards;
	//console.log(pages)

	// if 3 items per page
	// 1 : slice(0, 3),  goblin, fang, skeleton
	// 2 : slice(3, 6),  flan, saghnol, lizardman
	// 3 : slice(6, 9),  zombie, bomb, ironite
	// 4 : slice(9, 12), sahagin, yeti, memic
	// 3 - 1 = 2 * 3 = 6 + 3 = 9

	return (
		<section className="layout-column layout-content cards-found">
			<h2 className="cards-count">
				{cards.length} card{cards.length == 1 ? '' : 's'} found
			</h2>

			<Sort utils={utils} buildResponse={buildResponse} sorts={sorts} />

			<Pagination utils={utils} buildResponse={buildResponse} sorts={sorts} />

			<Cards utils={utils} cards={paginatedCards} filterList={filterList} />
		</section>
	);
};

export default Content;
