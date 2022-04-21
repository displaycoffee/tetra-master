/*local com ponent imports */
import Selected from '../filters/Selected';
import Filters from '../filters/Filters';

const Sidebar = (props) => {
	let { filters, utils, selected, buildSelected } = props;

	return (
		<aside className="layout-column layout-sidebar">
			<Selected selected={selected} utils={utils} buildSelected={buildSelected} />

			<Filters filters={filters} utils={utils} buildSelected={buildSelected} />
		</aside>
	);
};

export default Sidebar;
