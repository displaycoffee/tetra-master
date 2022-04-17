const Filters = (props) => {
	const { cards, params, utils } = props;
	let filters = [];

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
												<div key={value.name} className={`filter-list-option${value.active ? ' is-active' : ''}`}>
													<a className="filter-list-link pointer">
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
