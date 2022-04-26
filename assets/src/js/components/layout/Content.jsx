/* react imports */
import { useState, useEffect } from 'react';

/* local script imports */
import { sortList } from '../../scripts/sortList';

/*local component imports */
import Sort from '../toolbar/Sort';
import Cards from '../cards/Cards';

const Content = (props) => {
	let { cards, filterList, utils, builds } = props;
	let [sorts, setSorts] = useState([]);

	useEffect(() => {
		buildSorts();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function buildSorts() {
		// set sorts to state
		sorts = builds.sort(utils, sorts, sortList);
		setSorts(sorts);

		// sort after selections is done
		if (sorts && utils.params.get().includes('sort=')) {
			const sortActive = sorts.filter((sort) => {
				return sort.active;
			}).pop();
			
			if (sortActive) {
				cards = utils.values.sort(cards, sortActive.type, sortActive.field, sortActive.direction);
			}
		}
	}

	return (
		<section className="layout-column layout-content cards-found">
			<h2 className="cards-count">
				{cards.length} card{cards.length == 1 ? '' : 's'} found
			</h2>

			<Sort sortList={sortList} utils={utils} />

			<Cards cards={cards} filterList={filterList} utils={utils} />
		</section>
	);
};

export default Content;
