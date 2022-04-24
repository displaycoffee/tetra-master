/* local script imports */
import { sortList } from '../../scripts/sortList';

/*local component imports */
import Sort from '../toolbar/Sort';
import Cards from '../cards/Cards';

const Content = (props) => {
	let { cards, filterList, utils } = props;

	function runSort() {
		const paramsList = utils.getParams() ? utils.getParams().split('&') : [];
		const sortIdentifier = 'sort=';
		let sortParam = false;

		if (paramsList.length > 0) {
			// configure sortParam
			sortParam = paramsList.map((param) => {
				let paramValues = param.replace(sortIdentifier, '').split(':');
				let sortConfig = false;

				// param pairs should contain two items, be in sortList config, and have asc or desc direction
				if (paramValues.length > 1) {
					const paramField = paramValues[0];
					const paramDirection = paramValues[1];

					if (sortList[paramField] && (paramDirection == 'asc' || paramDirection == 'desc')) {
						sortConfig = {
							field: paramField,
							direction: paramDirection,
							type: sortList[paramField].type,
						};
					}
				}

				return sortConfig;
			});

			// filter invalid sort elements (will take last valid applied parameter)
			sortParam = sortParam
				.filter((sort) => {
					return sort;
				})
				.pop();
		} else {
			sortParam = false;
		}

		if (sortParam) {
			// apply sort to card list
			cards = utils.sortValues(cards, sortParam.type, sortParam.field, sortParam.direction);
		}
	}

	// run sorting for card list
	runSort();

	return (
		<section className="layout-column layout-content cards-found">
			<h2 className="cards-count">
				{cards.length} card{cards.length == 1 ? '' : 's'} found
			</h2>

			<Sort sortList={sortList} />

			<Cards cards={cards} filterList={filterList} utils={utils} />
		</section>
	);
};

export default Content;
