/* local component imports */
import Filters from '../filters/Filters';
import Cards from '../cards/Cards';

/* local script imports */
import { cardList } from '../../scripts/cardList';
import { filterList } from '../../scripts/filterList';

const App = () => {
	// this will contain modified cards from filters
	let modifiedCards = cardList;

	return (
		<div className="wrapper">
			<main className="layout">
				<div className="layout-row flex-nowrap">
					<aside className="layout-column layout-sidebar">
						<Filters filters={filterList} cards={modifiedCards} />
					</aside>

					<section className="layout-column layout-content">
						<Cards cards={modifiedCards} />
					</section>
				</div>
			</main>
		</div>
	);
};

export default App;
