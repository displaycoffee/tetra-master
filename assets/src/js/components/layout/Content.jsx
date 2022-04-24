/* local script imports */
import { sortList } from '../../scripts/sortList';

/*local component imports */
import Sort from '../toolbar/Sort';
import Cards from '../cards/Cards';

const Content = (props) => {
	let { cards, filterList, utils } = props;

	function sortCards() {
		const paramsList = utils.params.list();

		if (paramsList.length > 0) {
			const sortIdentifier = 'sort=';
			let sortSelected = false;

			// configure sort parameters
			sortSelected = paramsList.map((param) => {
				if (param.includes(sortIdentifier)) {			
					let paramValues = param.replace(sortIdentifier, '').split(':');
					let sortDetail = false;

					// parameter pairs should contain two items, be in sortList config, and have asc or desc direction
					if (paramValues.length > 1) {					
						const paramValue = paramValues[1];
						const paramField = paramValues[0] + paramValue.charAt(0).toUpperCase() + paramValue.slice(1);
						const paramDetail = sortList[paramField] ? sortList[paramField] : false;

						if (paramDetail && (paramValue == 'asc' || paramValue == 'desc')) {
							sortDetail = paramDetail;
						}
					}
					
					return sortDetail;
				}
			});

			// filter invalid sort elements (will take last valid applied parameter)
			sortSelected = sortSelected.filter((sort) => {
				return sort;
			}).pop();
			
			if (sortSelected) {
				// apply sort to card list
				cards = utils.values.sort(cards, sortSelected.type, sortSelected.field, sortSelected.direction);
			}
		}		
	}

	// run sorting for card list
	sortCards();

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
