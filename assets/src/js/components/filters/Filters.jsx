/* react imports */
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Filters = (props) => {
	let { cards, params, utils, selected, buildSelected, filters } = props;
	//let [filters, setFilters] = useState([]);
	let [searchParams, setSearchParams] = useSearchParams();

	function updateValue(e, field, value) {
		e.preventDefault();

		if (value.active) {
			// set value as inactive and remove class
			value.active = false;

			// filter out inactive values from selected
			selected = selected.filter((select) => {
				let valueMatch = select.field == field && select.value == value.value;
				return !valueMatch;
			});

			// remove filter param from url
			let updatedSearchParams = new URLSearchParams(String(searchParams));
			const filterParams = updatedSearchParams.getAll(field).filter((paramValue) => paramValue !== value.value);
			updatedSearchParams.delete(field);
			filterParams.forEach((filterParam) => {
				updatedSearchParams.append(field, filterParam);
			});
			setSearchParams(String(updatedSearchParams));
		} else {
			// set value as active and add class
			value.active = true;

			// if value is not active, add to selected array
			const newSelected = {
				field: field,
				name: params[field].name,
				value: value.value,
			};
			selected.push(newSelected);

			// add filter params to url
			let updatedSearchParams = new URLSearchParams(String(searchParams));
			updatedSearchParams.append(field, value.value);
			setSearchParams(String(updatedSearchParams));
		}

		// run buildSelected function to refresh card list
		buildSelected();
		//buildFilters();
		//setFilters(filters);

		console.log('in click', filters);
	}

	// useEffect(() => {
	// 	buildFilters();
	// }, []); // eslint-disable-line react-hooks/exhaustive-deps

	// async function buildFilters() {
	// 	// start by looping through params to build filters
	// 	filters = Object.keys(params).map((param) => {
	// 		// set up filters config
	// 		let filtersConfig = {
	// 			field: param,
	// 			name: params[param].name,
	// 			values: [],
	// 		};

	// 		// storage object for values
	// 		let valuesStorage = {};

	// 		// loop through cards and add to valuesStorage
	// 		cards.forEach((card) => {
	// 			if (utils.checkValue(card[param])) {
	// 				const valuesList = utils.setArray(card[param]);

	// 				valuesList.forEach((value) => {
	// 					if (valuesStorage[value]) {
	// 						// if value is already in valuesStorage, add to count
	// 						valuesStorage[value].count++;
	// 					} else {
	// 						const valueLower = typeof value == 'string' ? value.toLowerCase() : value;

	// 						// otherwise add as new to storage
	// 						valuesStorage[value] = {
	// 							name: String(value),
	// 							value: value,
	// 							count: 1,
	// 							active: utils.searchParams.includes(`${param}=${valueLower}`), // check if active by looking at searchParams
	// 						};
	// 					}
	// 				});
	// 			}
	// 		});

	// 		// add value object to filtersConfig
	// 		filtersConfig.values = Object.keys(valuesStorage).map((value) => {
	// 			return valuesStorage[value];
	// 		});

	// 		return filtersConfig;
	// 	});

	// 	setFilters(filters);

	// 	//console.log('in build', filters);
	// }

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
