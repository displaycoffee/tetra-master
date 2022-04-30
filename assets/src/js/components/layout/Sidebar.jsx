/*local component imports */
import Selections from '../filters/Selections';
import Filters from '../filters/Filters';

const Sidebar = (props) => {
	let { utils, buildResponse, selections, filters } = props;

	return (
		<aside className="layout-column layout-sidebar">
			<Selections utils={utils} buildResponse={buildResponse} selections={selections} />

			<Filters utils={utils} buildResponse={buildResponse} filters={filters} />
		</aside>
	);
};

export default Sidebar;
