/* react imports */
import { useState } from 'react';
import { useCookies } from 'react-cookie';

const Collected = (props) => {	
	const { card } = props;

	// react variables
	let [collected, setCollected] = useState(card.collected);
	const [cookies, setCookie] = useCookies(['collected']);

	function handleCollected(e, id) {
		e.preventDefault();

		// variables for cookie functionality below
		let collectedCookie = cookies?.collected ? cookies.collected : '';
		const collectedSetting = { path : '/' };
		const cardSeparator = `${id},`;

		if (collected) {
			// if card is already collected, remove from cookies.collected and setCollected state
			collectedCookie = collectedCookie.replace(cardSeparator, '');
			setCookie('collected', collectedCookie, collectedSetting);
			setCollected(false);
		} else {
			// if card is not collected, add to cookies.collected and setCollected state
			collectedCookie = `${cardSeparator}${collectedCookie}`;
			setCookie('collected', collectedCookie, collectedSetting);
			setCollected(true);
		}
	}

	return (
		<p className="card-details-collected">
			<strong>Collected:</strong>
			<span onClick={(e) => handleCollected(e, card.id)} className={`icon-wrapper${collected ? ' is-collected' : ''} pointer`}>
				<svg className="icon icon-heart">
					<use xlinkHref="#icon-heart"></use>
				</svg>
			</span>
		</p>
	);
};

export default Collected;
