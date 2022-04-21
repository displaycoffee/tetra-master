/*local com ponent imports */
import Cards from '../cards/Cards';

const Content = (props) => {
	let { cards, params, utils } = props;

	return (
		<section className="layout-column layout-content cards-found">
			<h2 className="cards-count">
				{cards.length} card{cards.length == 1 ? '' : 's'} found
			</h2>

			<Cards cards={cards} params={params} utils={utils} />
		</section>
	);
};

export default Content;
