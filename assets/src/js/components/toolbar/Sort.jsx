/* react imports */
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Sort = (props) => {
	const { utils, buildToolbar, sorts } = props;
	let [sortParams, setSortParams] = useSearchParams();
	let [sortState, setSortState] = useState(false);
	const sortActive = utils.values.active(sorts).pop();

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

	// if sort is expanded and elements are clicked outside sort menu, close sort
	if (sortState) {
		document.querySelector('body').onclick = () => handleToggle();
	}

	return (
		sorts.length !== 0 && (
			<div className="sorts" onClick={(e) => e.stopPropagation()}>
				<div className="sort-label pointer" onClick={() => handleToggle()}>
					<strong>Sort By:</strong> {sortActive.label} 
				</div>
				
				<div className={`sort-options${sortState ? ' is-expanded' : ' is-collapsed'}`}>
					<div className="list">
						{sorts.map((sort) => {
							return (
								<div key={sort.id} className={`list-item${sort.active ? ' is-active' : ''}`}>
									<a
										className="list-link pointer"
										onClick={(e) => {
											handleValue(e, sort.value, sort.active);
										}}
									>
										{sort.label}
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
