/*local component imports */
import Sort from '../toolbar/Sort';
import Pagination from '../toolbar/Pagination';
import Cards from '../cards/Cards';

const Content = (props) => {
	let { utils, buildSelections, cards, sorts, filterList } = props;

	let pagesTotal = cards.length / 3;
	let pages = {
		total : pagesTotal,
		range : [...(new Array(pagesTotal))].map((_, i) => i + 1),
		current: 1
	};
	console.log(pages)

	return (
		<section className="layout-column layout-content cards-found">
			<h2 className="cards-count">
				{cards.length} card{cards.length == 1 ? '' : 's'} found
			</h2>

			<Sort utils={utils} buildSelections={buildSelections} sorts={sorts} />

			<Pagination utils={utils} buildSelections={buildSelections} sorts={sorts} />

			<Cards utils={utils} cards={cards} filterList={filterList} />
		</section>
	);
};

export default Content;
