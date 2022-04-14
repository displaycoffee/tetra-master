/* local component imports */
import Filters from '../filters/Filters';
import Cards from '../cards/Cards';

const App = () => {
	return (
		<div className="wrapper">
			<main className="layout">
				<div className="layout-row flex-nowrap">
					<aside className="layout-column layout-sidebar">
						<Filters />
					</aside>

					<section className="layout-column layout-content">
						<Cards />
					</section>
				</div>
			</main>
		</div>
	);
};

export default App;
