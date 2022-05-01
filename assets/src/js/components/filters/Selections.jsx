/* react imports */
import { useSearchParams } from 'react-router-dom';

const Selections = (props) => {
	let { utils, buildResponse, selections } = props;

	// react variables
	let [selectionParams, setSelectionParams] = useSearchParams();

	function handleValue(e, value) {
		e.preventDefault();

		// page paramters should be removed when selections are removed
		selectionParams.delete(utils.params.url.page);

		// remove filter parameters from url
		utils.params.remove(selectionParams, utils.params.url.filter, value, setSelectionParams);

		// run buildResponse function to refresh card list
		buildResponse();
	}

	function handleClear(e) {
		e.preventDefault();

		// clear all parameters from url
		utils.params.clear(selectionParams, utils.params.url.filter, setSelectionParams);

		// run buildResponse function to refresh card list
		buildResponse();
	}

	return (
		selections.length !== 0 && (
			<div className="selections">
				<div className="list">
					{selections.map((select) => {
						return (
							<div key={select.id} className="list-item">
								<a
									className="list-link pointer"
									onClick={(e) => {
										handleValue(e, select.value);
									}}
								>
									<strong>{select.filterLabel}:</strong> {select.label}
								</a>
							</div>
						);
					})}

					<div className="list-item list-clear">
						<a
							className="list-link pointer"
							onClick={(e) => {
								handleClear(e);
							}}
						>
							Clear All
						</a>
					</div>
				</div>
			</div>
		)
	);
};

export default Selections;
