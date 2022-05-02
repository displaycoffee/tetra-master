const QuickView = (props) => {
	let { pageSize, card } = props;

	// set card order class
	let rowClass = '';
	if (card?.index) {
		const rowPrefix = 'card-quick-view-row-';
		const rowMobile = `${rowPrefix}${Math.floor(card.index / 2) + 1}`;
		const rowTablet = `${rowPrefix}md-${Math.floor(card.index / 3) + 1}`;		
		const rowDesktop = `${rowPrefix}lg-${Math.floor(card.index / 4) + 1}`;
		rowClass = ` ${rowMobile} ${rowTablet} ${rowDesktop}`;
	}

	return (
		<div className={`card-quick-view${rowClass} ${card ? 'is-expanded' : 'is-collapsed'}`}>
			{card && (				
				<p>{card.label}</p>
			)}
		</div>
	);
};

export default QuickView;
