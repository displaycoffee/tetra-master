const Filters = (props) => {
	const { cards, params, utils } = props;
	let filters = [];

	// start by looping through params to build filters
	filters = Object.keys(params).map((param) => {
		let field = params[param].field;
		let name = params[param].name;

		// set up filters config
		let filtersConfig = {
			field: field,
			name: name,
			values: [],
		};

		// storage object for values
		let valuesStorage = {};

		// loop through cards and add to valuesStorage
		cards.forEach((card) => {
			const cardField = card[field];

			if (String(cardField) && cardField != undefined) {
				const cardValueField =
					typeof cardField == 'object' ? cardField : [cardField];

				cardValueField.forEach((value) => {
					if (valuesStorage[value]) {
						// if value is already there, add to count
						valuesStorage[value].count++;
					} else {
						let valueString = String(value);
						let isActive = utils.searchParams.includes(
							`${field}=${valueString}`
						); // check if value is active by looking at searchParams

						// otherwise add as new to storage
						valuesStorage[value] = {
							name: valueString,
							value: value,
							count: 1,
							active: isActive,
						};
					}
				});
			}
		});

		// add values to filters config finally
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
							<div
								key={filter.field}
								id={`filter-${filter.field}`}
								className="filter"
							>
								<div className="filter-header">
									<h4>{filter.name}</h4>
								</div>

								<div className="filter-options">
									<div className="filter-list">
										{filter.values.map((value) => {
											return (
												<div
													key={value.name}
													className={`filter-list-option${
														value.active
															? ' is-active'
															: ''
													}`}
												>
													<a className="filter-list-link pointer">
														{value.name}{' '}
														<span className="value-count">
															({value.count})
														</span>
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
