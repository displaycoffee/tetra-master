/* local component imports */
import Sort from '../toolbar/Sort';
import Pagination from '../toolbar/Pagination';

const Toolbar = (props) => {
	let { utils, buildToolbar, sort, pages, location } = props;

	return (
		<div className={`toolbar toolbar-${location}`}>
			<div className={`toolbar-row flex-wrap flex-align-center${location == 'bottom' ? ' flex-justify-center' : ''}`}>
				{location == 'top' && (
					<div className="toolbar-sort toolbar-column">
						<Sort utils={utils} buildToolbar={buildToolbar} sort={sort} />
					</div>
				)}

				<div className="toolbar-pages toolbar-column">
					<Pagination utils={utils} buildToolbar={buildToolbar} pages={pages} />
				</div>
			</div>
		</div>
	);
};

export default Toolbar;
