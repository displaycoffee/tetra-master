/* react imports */
import { useSearchParams } from 'react-router-dom';

const Sort = (props) => {
	const { utils, buildSelections, sorts } = props;
	let [sortParams, setSortParams] = useSearchParams();

	function handleValue(e, field, value) {
		e.preventDefault();

		if (value.active) {
			// remove sort parameter from url
			utils.params.remove(sortParams, field, value.value, setSortParams);
		} else {
			// remove any sort parameter and add new parameter to url
			sortParams.delete(field);
			utils.params.add(sortParams, field, value.value, setSortParams);
		}

		// run buildSelections function to refresh card list
		buildSelections();
	}

	return (
		sorts.length !== 0 && (
			<div className="sorts">
				<div className="sort-list">
					{sorts.map((sort) => {
						return (
							<div key={sort.id} className={`sort-list-option${sort.active ? ' is-active' : ''}`}>
								<a
									className="sort-list-link pointer"
									onClick={(e) => {
										handleValue(e, 'sort', sort);
									}}
								>
									{sort.label}
								</a>
							</div>
						)
					})}
				</div>
			</div>
		)
	);
};

export default Sort;
