/*local component imports */
import Sort from '../toolbar/Sort';
import Cards from '../cards/Cards';

const Content = (props) => {
	let { utils, cards, sorts, filterList } = props;

	return (
		<section className="layout-column layout-content cards-found">
			<h2 className="cards-count">
				{cards.length} card{cards.length == 1 ? '' : 's'} found
			</h2>

			<Sort utils={utils} sorts={sorts} />

			<Cards utils={utils} cards={cards} filterList={filterList} />
		</section>
	);
};

export default Content;
