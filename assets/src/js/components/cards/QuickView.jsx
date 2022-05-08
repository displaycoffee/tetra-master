/* react imports */
import { useRef, useEffect } from 'react';

const QuickView = (props) => {
	let { utils, theme, quickViewCard, setQuickViewCard } = props;
	let { perRowSm, perRowMd, perRowLg } = theme.cards;
	let { quickViewSm, quickViewMd, quickViewLg } = theme.quickView;

	// react variables
	const quickViewRef = useRef(null);

	// useEffect to add and remove handleOutsideClick toggle
	useEffect(() => {
		const eventType = 'click';
		document.addEventListener(eventType, handleOutsideClick, true);
		return () => {
			document.removeEventListener(eventType, handleOutsideClick, true);
		};
	}, []);

	const handleOutsideClick = (e) => {
		// if clicked outside quickViewRef, close quick-view
		const element = e.target;
		if (quickViewRef.current && !quickViewRef.current.contains(element) && !element.classList.contains('quick-view-button')) {
			setQuickViewCard(false)
		}
	};	

	// set default quickViewClass
	let quickViewClass = '';
	if (quickViewCard?.index >= 0) {
		quickViewClass = ` ${generatePerRow(perRowSm, quickViewSm)} ${generatePerRow(perRowMd, quickViewMd)} ${generatePerRow(perRowLg, quickViewLg)}`;

		// function to generate responsive order class for quick view
		function generatePerRow(perRow, quickView) {
			return `${quickView.replace(/^\./, '')}-${Math.floor(quickViewCard.index / perRow) + 1}`;
		}
	}

	return (
		<div className={`quick-view${quickViewClass} ${quickViewCard ? 'is-expanded' : 'is-collapsed'}`} ref={quickViewRef}>
			{quickViewCard && (				
				<div className="quick-view-details">
					{utils.values.check(quickViewCard.dropped) && (
						<p>{String(quickViewCard.dropped)}</p>
					)}

					{utils.values.check(quickViewCard.won) && (
						<p>{String(quickViewCard.won)}</p>
					)}

					{utils.values.check(quickViewCard.found) && (
						<p>{String(quickViewCard.found)}</p>
					)}

					{utils.values.check(quickViewCard.missable) && (
						<p>{String(quickViewCard.missable)}</p>
					)}
				</div>
			)}
		</div>
	);
};

export default QuickView;
