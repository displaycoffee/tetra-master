/* react imports */
import { useSearchParams } from 'react-router-dom';

const Filters = (props) => {
	let { utils, buildResponse, filters } = props;
	let [filterParams, setFilterParams] = useSearchParams();

	function handleValue(e, value, active) {
		e.preventDefault();

		// page paramters should be removed when filters are set
		filterParams.delete(utils.params.url.page);

		if (active) {
			// remove filter parameters from url
			utils.params.remove(filterParams, utils.params.url.filter, value, setFilterParams);
		} else {
			// add filter parameters to url
			utils.params.add(filterParams, utils.params.url.filter, value, setFilterParams);
		}

		// run buildResponse function to refresh card list
		buildResponse();
	}

	return (
		filters.length !== 0 && (
			<div className="filters">
				{filters.map((filter) => {
					return (
						filter.values.length !== 0 && (
							<div key={filter.id} id={filter.id} className="filter">
								<div className="filter-header">
									<h4>{filter.label}</h4>
								</div>

								<div className="filter-options">
									<div className="list">
										{filter.values.map((value) => {
											return (
												<div key={value.id} className={`list-item${value.active ? ' is-active' : ''}`}>
													<a
														className="list-link pointer"
														onClick={(e) => {
															handleValue(e, value.value, value.active);
														}}
													>
														{value.label} <span className="value-count">({value.count})</span>
													</a>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						)
					);
				})}
			</div>
		)
	);
};

export default Filters;
