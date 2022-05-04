const QuickView = (props) => {
	let { utils, theme, card } = props;
	let { perRowSm, perRowMd, perRowLg } = theme.cards;
	let { quickViewSm, quickViewMd, quickViewLg } = theme.quickView;

	// set default quickViewClass
	let quickViewClass = '';
	if (card?.index >= 0) {
		quickViewClass = ` ${generatePerRow(perRowSm, quickViewSm)} ${generatePerRow(perRowMd, quickViewMd)} ${generatePerRow(perRowLg, quickViewLg)}`;

		// function to generate responsive order class for quick view
		function generatePerRow(perRow, quickView) {
			return `${quickView.replace(/^\./, '')}-${Math.floor(card.index / perRow) + 1}`;
		}
	}

	return (
		<div className={`quick-view${quickViewClass} ${card ? 'is-expanded' : 'is-collapsed'}`} onClick={(e) => e.stopPropagation()}>
			{card && (				
				<div className="quick-view-details">
					{utils.values.check(card.dropped) && (
						<p>{String(card.dropped)}</p>
					)}

					{utils.values.check(card.won) && (
						<p>{String(card.won)}</p>
					)}

					{utils.values.check(card.found) && (
						<p>{String(card.found)}</p>
					)}

					{utils.values.check(card.missable) && (
						<p>{String(card.missable)}</p>
					)}
				</div>
			)}
		</div>
	);
};

export default QuickView;
