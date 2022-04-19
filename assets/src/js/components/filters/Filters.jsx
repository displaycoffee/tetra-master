/* react imports */
import { useSearchParams } from 'react-router-dom';

const Filters = (props) => {
	let { filters, utils, buildSelected } = props;
	let [searchParams, setSearchParams] = useSearchParams();

	function updateValue(e, field, value) {
		e.preventDefault();

		if (value.active) {
			// remove filter param from url
			let updatedSearchParams = new URLSearchParams(String(searchParams));
			const filterParams = updatedSearchParams.getAll(field).filter((paramValue) => {
				return !utils.compareValues(paramValue, value.value);
			});
			updatedSearchParams.delete(field);
			filterParams.forEach((filterParam) => {
				updatedSearchParams.append(field, filterParam);
			});
			setSearchParams(String(updatedSearchParams));
		} else {
			// add filter params to url
			let updatedSearchParams = new URLSearchParams(String(searchParams));
			updatedSearchParams.append(field, value.value);
			setSearchParams(String(updatedSearchParams));
		}

		// run buildSelected function to refresh card list
		buildSelected();
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
															updateValue(e, filter.field, value);
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
