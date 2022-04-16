/* react imports */
import { useState, useEffect } from 'react';

/* local script imports */
import { cardList } from '../../scripts/cardList';
import { filterList } from '../../scripts/filterList';

const Filters = (props) => {
	const { selected } = props;
	let [filtersState, setFilters] = useState('');

	useEffect(() => {
		buildFilters();
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

	return (
		filtersState.dropped && (
			<div>
				{filtersState.dropped.values.map((value) => {
					return <p key={value.value}>{value.value}</p>;
				})}
			</div>
		)
	);
};

export default Filters;
