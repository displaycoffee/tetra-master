/*local component imports */
import Selections from '../filters/Selections';
import Filters from '../filters/Filters';

const Sidebar = (props) => {
	let { filters, utils, selections, buildSelections } = props;

	return (
		<aside className="layout-column layout-sidebar">
			<Selections selections={selections} utils={utils} buildSelections={buildSelections} />

			<Filters filters={filters} utils={utils} buildSelections={buildSelections} />
		</aside>
	);
};

export default Sidebar;
