/* react imports */
import { useSearchParams } from 'react-router-dom';

const Filters = (props) => {
	const activeClass = 'is-active';
	let { cards, params, utils, selected, buildSelected } = props;
	let [searchParams, setSearchParams] = useSearchParams();
	let filters = [];

	function handleSubmit(e, field, value) {
		e.preventDefault();

		if (value.active) {
			// set value as inactive and remove class
			value.active = false;
			e.target.parentNode.classList.remove(activeClass);

			// filter out inactive values from selected
			selected = selected.filter((select) => {
				let valueMatch = select.field == field && select.value == value.value;
				return !valueMatch;
			});

			// remove filter param from url
			// https://stackoverflow.com/questions/65241446/how-to-remove-only-one-of-multiple-key-value-pairs-with-the-same-key-using-urlse
			// let updatedSearchParams = new URLSearchParams(String(searchParams));
			// updatedSearchParams.delete(field, value.value);
			// setSearchParams(String(updatedSearchParams));
		} else {
			// set value as active and add class
			value.active = true;
			e.target.parentNode.classList.add(activeClass);

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

			// run buildSelected function to refresh card list
			buildSelected();
		}
	}

	// start by looping through params to build filters
	filters = Object.keys(params).map((param) => {
		// set up filters config
		let filtersConfig = {
			field: param,
			name: params[param].name,
			values: [],
		};

		// storage object for values
		let valuesStorage = {};

		// loop through cards and add to valuesStorage
		cards.forEach((card) => {
			if (utils.checkValue(card[param])) {
				const valuesList = utils.setArray(card[param]);

				valuesList.forEach((value) => {
					if (valuesStorage[value]) {
						// if value is already in valuesStorage, add to count
						valuesStorage[value].count++;
					} else {
						const valueLower = typeof value == 'string' ? value.toLowerCase() : value;

						// otherwise add as new to storage
						valuesStorage[value] = {
							name: String(value),
							value: value,
							count: 1,
							active: utils.searchParams.includes(`${param}=${valueLower}`), // check if active by looking at searchParams
						};
					}
				});
			}
		});

		// add value object to filtersConfig
		filtersConfig.values = Object.keys(valuesStorage).map((value) => {
			return valuesStorage[value];
		});

		return filtersConfig;
	});

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
												<div key={value.name} className={`filter-list-option${value.active ? ` ${activeClass}` : ''}`}>
													<a
														className="filter-list-link pointer"
														onClick={(e) => {
															handleSubmit(e, filter.field, value);
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
