/* react imports */
import { useSearchParams } from 'react-router-dom';

const Selections = (props) => {
	let { utils, buildSelections, selections } = props;
	let [selectionParams, setSelectionParams] = useSearchParams();

	function handleValue(e, field, value) {
		e.preventDefault();

		// remove filter parameters from url
		utils.params.remove(selectionParams, field, value, setSelectionParams);

		// run buildSelections function to refresh card list
		buildSelections();
	}

	function handleClear(e) {
		e.preventDefault();

		// clear all parameters from url
		utils.params.clear(selectionParams, setSelectionParams);

		// run buildSelections function to refresh card list
		buildSelections();
	}

	return (
		selections.length !== 0 && (
			<div className="selections">
				<div className="selection-options">
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

						<div className="selection-list-option selection-list-option-clear">
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
			</div>
		)
	);
};

export default Selections;
