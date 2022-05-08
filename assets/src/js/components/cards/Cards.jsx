/* react imports */
import { useState } from 'react';

/* local component imports */
import Collected from './Collected';
import QuickView from './QuickView';

const Cards = (props) => {
	let { utils, theme, cards } = props;

	// react variables
	let [quickViewCard, setQuickViewCard] = useState(false);

	function toggleQuickView(e, card, index) {
		e.preventDefault();
		
		if (quickViewCard?.id == card.id) {
			// if quickViewCard is set and matches incoming card id, close quick view
			setQuickViewCard(false);
		} else {
			// reset card quick view
			setQuickViewCard(false);

			setTimeout(() => {
				quickViewCard = card;
				quickViewCard.index = index;
				setQuickViewCard(quickViewCard);
			});
		}
	}

	// set default and on error image
	const defaulImage = '/assets/dist/images/cactaur.png';
	const imageError = (e) => {
		e.target.src = defaulImage;
	};

	return (
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

							<button className="quick-view-button pointer" type="button" onClick={(e) => toggleQuickView(e, card, index)}>
								Toggle QuickView
							</button>
						</div>
					</article>
				);
			})}

			<QuickView utils={utils} theme={theme} quickViewCard={quickViewCard} setQuickViewCard={setQuickViewCard} />
		</div>
	);
};

export default Cards;
