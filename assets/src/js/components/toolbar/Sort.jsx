/* react imports */
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Sort = (props) => {
	const { utils, buildToolbar, sort } = props;

	// react variables
	let [sortParams, setSortParams] = useSearchParams();
	const sortRef = useRef(null);

	// custom variables
	let [sortState, setSortState] = useState(false);
	const sortActive = utils.values.active(sort).pop();

	// useEffect to add and remove handleOutsideClick toggle
	useEffect(() => {
		const eventType = 'click';
		document.addEventListener(eventType, handleOutsideClick, true);
		return () => {
			document.removeEventListener(eventType, handleOutsideClick, true);
		};
	}, []);

	const handleOutsideClick = (e) => {
		// if clicked outside sortRef, close sort menu
		const element = e.target;
		if (sortRef.current && !sortRef.current.contains(element)) {
			sortState = false;
			setSortState(sortState);
		}
	};

	function handleValue(e, value, active) {
		e.preventDefault();

		if (active) {
			// remove sort parameter from url
			utils.params.remove(sortParams, utils.params.url.sort, value, setSortParams);
		} else {
			// remove any sort parameter and add new parameter to url
			sortParams.delete(utils.params.url.sort);
			utils.params.add(sortParams, utils.params.url.sort, value, setSortParams);
		}

		// run buildToolbar function to refresh card list
		buildToolbar();
	}

	function handleToggle() {
		// expanded and collapse sort menu with state
		sortState = sortState ? false : true;
		setSortState(sortState);
	}

	return (
		sort.length !== 0 && (
			<div className={`sort ${sortState ? 'is-expanded' : 'is-collapsed'}`} ref={sortRef}>
				<div className="sort-label pointer" onClick={() => handleToggle()}>
					<strong>Sort By:</strong> {sortActive.label} 
				</div>
				
				<div className="sort-options">
					<div className="list">
						{sort.map((value) => {
							return (
								<div key={value.id} className={`list-item${value.active ? ' is-active' : ''}`}>
									<a
										className="list-link pointer"
										onClick={(e) => {
											handleValue(e, value.value, value.active);
											setSortState(false);
										}}
									>
										{value.label}
									</a>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		)
	);
};

export default Sort;
