/* react imports */
import { useSearchParams } from 'react-router-dom';

const Pagination = (props) => {
	let { utils, buildPages, pages } = props;
	let [pageParams, setPageParams] = useSearchParams();

	// variables for limiting the amount of pages
	const pagesSpan = 3; // will show this amount on left and right side if possible
	const pagesStart = pages.current <= pagesSpan ? 0 : ((pages.current - 1) - pagesSpan);
	const pagesEnd = pages.current + pagesSpan;

	function handleValue(e, value) {
		e.preventDefault();

		// remove any page parameter and add new parameter to url
		pageParams.delete(utils.params.url.page);
		utils.params.add(pageParams, utils.params.url.page, value, setPageParams);

		// run buildPages function to refresh list
		buildPages();
	}
	
	return (
		pages?.range && pages?.range?.length > 1 && (
			<div className="pages">
				<div className="page-list">
					{pages.current !== 1 && (
						<div className={`page-list-option page-list-previous`}>
							<a
								className="page-list-link pointer"
								onClick={(e) => {
									handleValue(e, pages.current - 1);
								}}
							>
								Previous
							</a>
						</div>
					)}

					{pages.range.map((page) => {
						const pageActive = (page == pages.current);

						return (
							<div key={page} className={`page-list-option${pageActive ? ' is-active' : ''}`}>
								<a
									className="page-list-link pointer"
									onClick={(e) => {
										handleValue(e, page);
									}}
								>
									{page}
								</a>
							</div>
						)
					}).slice(pagesStart, pagesEnd)}

					{pages.current !== pages.range.length && (
						<div className={`page-list-option page-list-next`}>
							<a
								className="page-list-link pointer"
								onClick={(e) => {
									handleValue(e, pages.current + 1);
								}}
							>
								Next
							</a>
						</div>
					)}
				</div>
			</div>
		)
	);
};

export default Pagination;
