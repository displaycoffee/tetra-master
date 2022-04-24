const Sort = (props) => {
	const { sortList } = props;
	const sortOptions = Object.keys(sortList).map((option) => {
		return sortList[option];
	});

	console.log(sortOptions);

	return (
		sortOptions.length !== 0 && (
			<div className="sort-list">
				{sortOptions.map((option) => {
					return <a key={option.id}>{option.label}</a>;
				})}
			</div>
		)
	);
};

export default Sort;
