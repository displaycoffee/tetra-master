const Sort = (props) => {
	const { utils, sorts } = props;

	return (
		sorts.length !== 0 && (
			<div className="sorts">
				{sorts.map((sort) => {
					return <a key={sort.id}>{sort.label}</a>;
				})}
			</div>
		)
	);
};

export default Sort;
