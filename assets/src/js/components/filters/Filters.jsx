/* react imports */
import { useState, useEffect } from 'react';

/* local script imports */
import { cardList } from '../../scripts/cardList';
import { filterList } from '../../scripts/filterList';
import { utils } from '../../scripts/utils';

const Filters = () => {
	let [filters, setFilters] = useState('');
	//let filters = filterList;
	useEffect(() => {
		buildFilters();

		//return null;
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function buildFilters() {
		let droppedValues = [];

		cardList.forEach((card) => {
			if (card.dropped) {
				if (!droppedValues.includes(card.dropped)) {
					droppedValues.push(card.dropped);
					filterList.dropped.values.push({
						value: card.dropped,
						count: 1,
					});
				}
			}
		});

		setFilters(filterList);
	}

	console.log('tjese filters', filters);

	return (
		filters.dropped && (
			<div>
				{filters.dropped.values.map((value) => {
					return <p>{value.value}</p>;
				})}
			</div>
		)
	);
};

export default Filters;
