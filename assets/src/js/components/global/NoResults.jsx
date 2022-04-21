const NoResults = () => {
	return (
		<section className="layout-column layout-content cards-not-found">
			<h2 className="cards-count">No cards we're found with your selections.</h2>

			<p>
				Please try <a className="pointer">clearing your selections</a>.
			</p>
		</section>
	);
};

export default NoResults;
