const Sort = (props) => {
	const { sortList, utils } = props;
	const sortValues = utils.flatten(sortList);

	return (
		sortValues.length !== 0 && (
			<div className="sort-list">
				{sortValues.map((value) => {
					return <a key={value.id}>{value.label}</a>;
				})}
			</div>
		)
	);
};

export default Sort;
