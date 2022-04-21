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
	getParams: () => {
		return decodeURIComponent(window.location.search.replace(/^\?/, '').replace(/\+/g, ' ')).toLowerCase();
	},
	addParam: (params, field, value, paramsCallback) => {
		let newParams = new URLSearchParams(String(params));

		// append new params to url
		newParams.append(field, value);

		// set new params to state
		paramsCallback(String(newParams));
	},
	removeParam: (params, field, value, paramsCallback) => {
		let newParams = new URLSearchParams(String(params));

		// filter out values which should be retained
		const keepParams = newParams.getAll(field).filter((keep) => {
			return !utils.compareValues(keep, value);
		});

		// delete field from params
		newParams.delete(field);

		// add back params with deleted field
		keepParams.forEach((keep) => {
			newParams.append(field, keep);
		});

		// set new params to state
		paramsCallback(String(newParams));
	},
	clearParams: (params, paramsCallback) => {
		let newParams = new URLSearchParams(String(params));

		// get list of param values
		const removeParams = String(params)
			.split('&')
			.map((remove) => {
				return remove.split('=')[0];
			});

		// get unique params
		const getUnique = [...new Set(removeParams)];

		// delete field params
		getUnique.forEach((remove) => {
			newParams.delete(remove);
		});

		// set new params to state
		paramsCallback(String(newParams));
	},
};
