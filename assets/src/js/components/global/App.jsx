/* local component imports */
import List from '../cards/List';

const App = () => {
	return (
		<div className="wrapper">
			<main className="layout">
				<div className="layout-row flex-nowrap">
					<aside className="layout-column layout-sidebar">
						sidebar stufff
					</aside>

					<section className="layout-column layout-content">
						<List />
					</section>
				</div>
			</main>
		</div>
	);
};

export default App;
