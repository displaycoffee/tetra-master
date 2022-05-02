/* react imports */
import { useState, useEffect } from 'react';

/* local component imports */
import Collected from './Collected';
import QuickView from './QuickView';

const Cards = (props) => {
	let { utils, pageSize, cards, filterList } = props;

	// react variables
	let [quickViewCard, setQuickViewCard] = useState(false);

	function toggleQuickView(e, card, index) {
		e.preventDefault();

		// reset card-quick-view
		setQuickViewCard(false);

		setTimeout(() => {
			quickViewCard = card;
			quickViewCard.index = index;
			setQuickViewCard(quickViewCard);
		}, 1000);
	}

	// set default and on error image
	const defaulImage = '/assets/dist/images/cactaur.png';
	const imageError = (e) => {
		e.target.src = defaulImage;
	};

	return (
		cards.length !== 0 && (
			<div className="cards flex-wrap">
				{cards.map((card, index) => {
					// Check for if image is set
					let displayImage = card.image ? card.image : defaultImage;

					return (
						<article key={card.id} id={card.id} className="card card-block flex-nowrap">
							<div className="card-image">
								<img src={displayImage} onError={imageError} loading="lazy" />
							</div>

							<div className="card-details">
								{card.label && (
									<p className="card-details-name">
										<strong>Name:</strong> {card.label}
									</p>
								)}

								{card.stats && (
									<p className="card-details-stats">
										<strong>Stats:</strong> {card.stats}
									</p>
								)}

								<Collected card={card} />

								<button className="card-quick-view-button pointer" type="button" onClick={(e) => toggleQuickView(e, card, index)}>
									Toggle QuickView
								</button>

								{Object.keys(filterList).map((filter) => {
									// loop through the filterList to display the remaining details
									const filterDetail = filterList[filter];
									const cardValue = card[filter];

									return (
										utils.values.check(cardValue) && (
											<p key={filterDetail.id} className={`card-details-${filterDetail.field}`}>
												<strong>{filterDetail.label}:</strong> {String(cardValue)}
											</p>
										)
									);
								})}
							</div>
						</article>
					);
				})}

				<QuickView pageSize={pageSize} card={quickViewCard} />
			</div>
		)
	);
};

export default Cards;
