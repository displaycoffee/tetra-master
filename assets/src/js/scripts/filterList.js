// note: for consistency, always define order, id, field, label
export const filterList = {
	dropped : {
		order : 1,
		id : 'dropped-1',
		field : 'dropped',
		label : 'Dropped By',
		direction : 'asc',
		type : 'string',
		values : []
	},
	won : {
		order : 2,
		id : 'won-2',
		field : 'won',
		label : 'Won From',
		direction : 'asc',
		type : 'string',
		values : []
	},
	found : {
		order : 3,
		id : 'found-3',
		field : 'found',
		label : 'Found At',
		direction : 'asc',
		type : 'string',
		values : []
	},
	missable : {
		order : 4,
		id : 'missable-4',
		field : 'missable',
		label : 'Missable',
		direction : 'desc',
		type : 'boolean',
		values : []
	}
};
