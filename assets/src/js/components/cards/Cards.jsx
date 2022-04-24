const Cards = (props) => {
	const { cards, filterList, utils } = props;

	// set default and on error image
	const defaulImage = '/assets/dist/images/cactaur.png';
	const imageError = (e) => {
		e.target.src = defaulImage;
	};

	return (
		cards.length !== 0 && (
			<div className="cards-list flex-wrap">
				{cards.map((card) => {
					// Check for if image is set
					let displayImage = card.image ? card.image : defaultImage;

					return (
						<article key={card.id} id={`${utils.handleize(card.name)}-${card.id}`} className="card card-block flex-nowrap">
							<div className="card-image">
								<img src={displayImage} onError={imageError} loading="lazy" />
							</div>

							<div className="card-details">
								{card.name && (
									<p className="card-details-name">
										<strong>Name:</strong> {card.name}
									</p>
								)}

								{card.stats && (
									<p className="card-details-stats">
										<strong>Stats:</strong> {card.stats}
									</p>
								)}

								<p className="card-details-collected">
									<strong>Collected:</strong>
									<span className="icon-wrapper">
										<svg className="icon icon-heart">
											<use xlinkHref="#icon-heart"></use>
										</svg>
									</span>
								</p>

								{Object.keys(filterList).map((filter) => {
									// loop through the filterList to display the remaining details
									let name = filterList[filter].name;
									let value = card[filter];

									return (
										utils.checkValue(value) && (
											<p key={filter} className={`card-details-${filter}`}>
												<strong>{name}:</strong> {String(value)}
											</p>
										)
									);
								})}
							</div>
						</article>
					);
				})}
			</div>
		)
	);
};

export default Cards;
