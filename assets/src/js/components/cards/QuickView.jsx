const QuickView = (props) => {
	let { pageSize, card } = props;

	// set card order class
	const orderClass = card?.index ? ` card-quick-view-order-${pageSize / (card.index + 1)}` : false;

	return (
		<div className={`card-quick-view${orderClass} ${card ? 'is-expanded' : 'is-collapsed'}`}>
			{card && (				
				<p>{card.label}</p>
			)}
		</div>
	);
};

export default QuickView;
