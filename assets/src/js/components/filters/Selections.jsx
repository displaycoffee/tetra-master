/* react imports */
import { useSearchParams } from 'react-router-dom';

const Selections = (props) => {
	let { utils, buildResponse, selections } = props;
	let [selectionParams, setSelectionParams] = useSearchParams();

	function handleValue(e, field, value) {
		e.preventDefault();

		// page paramters should be removed when selections are removed
		selectionParams.delete(utils.params.url.page);

		// remove filter parameters from url
		utils.params.remove(selectionParams, field, value, setSelectionParams);

		// run buildResponse function to refresh card list
		buildResponse();
	}

	function handleClear(e) {
		e.preventDefault();

		// clear all parameters from url
		utils.params.clear(selectionParams, setSelectionParams);

		// run buildResponse function to refresh card list
		buildResponse();
	}

	return (
		selections.length !== 0 && (
			<div className="selections">
				<div className="selection-list">
					{selections.map((select) => {
						return (
							<div key={select.id} className="selection-list-option">
								<a
									className="selection-list-link pointer"
									onClick={(e) => {
										handleValue(e, select.field, select.value);
									}}
								>
									<strong>{select.label}:</strong> {select.value}
								</a>
							</div>
						);
					})}

					<div className="selection-list-option selection-list-clear">
						<a
							className="selection-list-link pointer"
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
