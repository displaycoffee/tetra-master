// note: for consistency, always define order, id, field, label
export const sortList = {
	labelAsc : {
		order: 1,
		id : 'label-1',
		field : 'label',
		label : 'Name: A to Z',
		direction : 'asc',
		type : 'string',
		value : 'label:asc',
		default: false,
	},
	labelDesc : {
		order: 2,
		id : 'label-2',
		field : 'label',
		label : 'Name: Z to A',
		direction : 'desc',
		type : 'string',
		value : 'label:desc',
		default: false,
	},
	orderAsc : {
		order: 3,
		id : 'order-3',
		field : 'order',
		label : 'Order: Low to High',
		direction : 'asc',
		type : 'integer',
		value : 'order:asc',
		default: true,
	},
	orderDesc : {
		order: 4,
		id : 'order-4',
		field : 'order',
		label : 'Order: High to Low',
		direction : 'desc',
		type : 'integer',
		value : 'order:desc',
		default: false,
	}
};
