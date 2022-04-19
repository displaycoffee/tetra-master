export let utils = {
	searchParams: () => {
		return decodeURIComponent(window.location.search.replace(/^\?/, '').replace(/\+/g, ' ')).toLowerCase();
	},
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
};
