export const utils = {
	searchParams: decodeURIComponent(window.location.search.replace(/^\?/, '').replace(/\+/g, ' ')).toLowerCase(),
	checkValue: (value) => {
		// check if value is defined, even if value is boolean
		return String(value) && value != undefined;
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
