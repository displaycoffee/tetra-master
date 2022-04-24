export let utils = {
	checkValue: (value) => {
		// check if value is defined, even if value is boolean
		return String(value) && value != undefined;
	},
	compareValues: (value1, value2) => {
		// comparison function to check values as strings
		return String(value1).toLowerCase() == String(value2).toLowerCase();
	},
	setArray: (value) => {
		// set value as array
		return typeof value == 'object' ? value : [value];
	},
	handleize: (value) => {
		// format value for html classes
		return value
			.toLowerCase()
			.replace(/[^\w\s]/g, '')
			.replace(/\s/g, '-')
			.trim();
	},
	params: {
		// functions for maniuplating parameters
		get: () => {
			// get decoded parameters from window location
			return decodeURIComponent(window.location.search.replace(/^\?/, '').replace(/\+/g, ' ')).toLowerCase();
		},
		list: () => {
			// return array of parameters
			return utils.params.get() ? utils.params.get().split('&') : [];
		},
		config: (id, field, label, type) => {
			// base config properties for parameters
			return {
				id: id ? id : `no-field-${Date.now()}`,
				field: field ? field : false,
				label: label ? label : false,
				type: type ? type : false,
			};
		},
		add: (params, field, value, callback) => {
			let newParams = new URLSearchParams(String(params));

			// append new parameters to url
			newParams.append(field, value);

			// run callback if defined
			if (callback) {
				callback(String(newParams));
			}
		},
		remove: (params, field, value, callback) => {
			let newParams = new URLSearchParams(String(params));

			// filter out values which should be retained
			const keepParams = newParams.getAll(field).filter((keep) => {
				return !utils.compareValues(keep, value);
			});

			// delete field from parameters
			newParams.delete(field);

			// add parameters without deleted field
			keepParams.forEach((keep) => {
				newParams.append(field, keep);
			});

			// run callback if defined
			if (callback) {
				callback(String(newParams));
			}
		},
		clear: (params, callback) => {
			let newParams = new URLSearchParams(String(params));

			// get list of parameter values
			const removeParams = String(params)
				.split('&')
				.map((remove) => {
					return remove.split('=')[0];
				});

			// get unique parameters
			const getUnique = [...new Set(removeParams)];

			// delete field parameters
			getUnique.forEach((remove) => {
				newParams.delete(remove);
			});

			// run callback if defined
			if (callback) {
				callback(String(newParams));
			}
		},
	},
	sortValues: (list, type, field, direction) => {
		// sort values in a list based on type, field, and direction
		list.sort((a, b) => {
			let sortValueA = a[field];
			let sortValueB = b[field];

			if (type == 'string') {
				// make sure booleans are strings
				sortValueA = String(sortValueA);
				sortValueB = String(sortValueB);

				// sorting method for strings
				if (direction == 'asc') {
					return sortValueA.localeCompare(sortValueB);
				}
				if (direction == 'desc') {
					return sortValueB.localeCompare(sortValueA);
				}
			}
			if (type == 'integer') {
				// sorting method for numbers
				if (direction == 'asc') {
					return sortValueA - sortValueB;
				}
				if (direction == 'desc') {
					return sortValueB - sortValueA;
				}
			}
		});

		return list;
	},
};
