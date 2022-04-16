/* react imports */
import { useState, useEffect } from 'react';

const Filters = (props) => {
	const { filters, cards } = props;
	let [filtersState, setFilters] = useState('');

	useEffect(() => {
		buildFilters();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	async function buildFilters() {
		let droppedValues = [];

		cards.forEach((card) => {
			if (card.dropped) {
				if (!droppedValues.includes(card.dropped)) {
					droppedValues.push(card.dropped);
					filters.dropped.values.push({
						value: card.dropped,
						count: 1,
					});
				}
			}
		});

		setFilters(filters);
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
