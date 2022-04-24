/* react imports */
import { useSearchParams } from 'react-router-dom';

const Filters = (props) => {
	let { filters, utils, buildSelected } = props;
	let [filterParams, setFilterParams] = useSearchParams();

	function handleValue(e, field, value) {
		e.preventDefault();

		if (value.active) {
			// remove filter parameters from url
			utils.params.remove(filterParams, field, value.value, setFilterParams);
		} else {
			// add filter parameters to url
			utils.params.add(filterParams, field, value.value, setFilterParams);
		}

		// run buildSelected function to refresh card list
		buildSelected(true);
	}

	return (
		filters.length !== 0 && (
			<div className="filters">
				{filters.map((filter) => {
					return (
						filter.values.length !== 0 && (
							<div key={filter.field} id={`filter-${filter.field}`} className="filter">
								<div className="filter-header">
									<h4>{filter.name}</h4>
								</div>

								<div className="filter-options">
									<div className="filter-list">
										{filter.values.map((value) => {
											return (
												<div key={value.name} className={`filter-list-option${value.active ? ' is-active' : ''}`}>
													<a
														className="filter-list-link pointer"
														onClick={(e) => {
															handleValue(e, filter.field, value);
														}}
													>
														{value.name} <span className="value-count">({value.count})</span>
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
