/* local script imports */
import { cardList } from '../../scripts/cardList';
import { utils } from '../../scripts/utils';

const Cards = () => {
	const defaulImage = 'https://placekitten.com/90/108';
	const imageError = (e) => {
		e.target.src = defaulImage;
	};

	return (
		<div className="card-list flex-wrap">
			{cardList.map((card) => {
				// Check for if image is set
				let displayImage = card.image ? card.image : defaultImage;

				return (
					<article
						key={card.id}
						id={`${utils.handleize(card.name)}-${card.id}`}
						className="card card-block flex-nowrap"
					>
						<div className="card-image">
							<img
								src={displayImage}
								onError={imageError}
								loading="lazy"
							/>
						</div>

						<div className="card-details">
							<p className="card-details-name">
								<strong>Name:</strong> {card.name}
							</p>

							<p className="card-details-value">
								<strong>Value:</strong> {card.value}
							</p>

							<p className="card-details-found">
								<strong>Found:</strong>
								<span className="icon-wrapper">
									<svg className="icon icon-heart">
										<use xlinkHref="#icon-heart"></use>
									</svg>
								</span>
							</p>

							<p className="card-details-dropped">
								<strong>Dropped By:</strong> {card.dropped}
							</p>

							<p className="card-details-won">
								<strong>Won From:</strong> {card.won}
							</p>

							<p className="card-details-missable">
								<strong>Missable:</strong> {card.missable}
							</p>
						</div>
					</article>
				);
			})}
		</div>
	);
};

export default Cards;
