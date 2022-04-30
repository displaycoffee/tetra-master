/* react imports */
import { useSearchParams } from 'react-router-dom';

const Sort = (props) => {
	const { utils, buildResponse, sorts } = props;
	let [sortParams, setSortParams] = useSearchParams();

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

		// run buildResponse function to refresh card list
		buildResponse();
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
		)
	);
};

export default Sort;
