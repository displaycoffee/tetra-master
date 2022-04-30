/* react imports */
import { useSearchParams } from 'react-router-dom';

const Filters = (props) => {
	let { utils, buildResponse, filters } = props;
	let [filterParams, setFilterParams] = useSearchParams();

	function handleValue(e, field, value) {
		e.preventDefault();

		// page paramters should be removed when filters are set
		filterParams.delete(utils.params.url.page);

		if (value.active) {
			// remove filter parameters from url
			utils.params.remove(filterParams, field, value.value, setFilterParams);
		} else {
			// add filter parameters to url
			utils.params.add(filterParams, field, value.value, setFilterParams);
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
									<div className="filter-list">
										{filter.values.map((value) => {
											return (
												<div key={value.id} className={`filter-list-option${value.active ? ' is-active' : ''}`}>
													<a
														className="filter-list-link pointer"
														onClick={(e) => {
															handleValue(e, filter.field, value);
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
