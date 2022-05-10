/* react imports */
import { useLocation } from 'react-router-dom';

const CardDetails = () => {
	const location = useLocation();
	const { card } = location.state;

	return (
		<div className="card">
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

			{card.dropped && (
				<p>{String(card.dropped)}</p>
			)}

			{card.won && (
				<p>{String(card.won)}</p>
			)}

			{card.found && (
				<p>{String(card.found)}</p>
			)}

			{card.missable && (
				<p>{String(card.missable)}</p>
			)}
		</div>
	);
};

export default CardDetails;
