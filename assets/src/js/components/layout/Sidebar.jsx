/*local component imports */
import Selections from '../filters/Selections';
import Filters from '../filters/Filters';

const Sidebar = (props) => {
	let { utils, buildSelections, selections, filters } = props;

	return (
		<aside className="layout-column layout-sidebar">
			<Selections utils={utils} buildSelections={buildSelections} selections={selections} />

			<Filters utils={utils} buildSelections={buildSelections} filters={filters} />
		</aside>
	);
};

export default Sidebar;
